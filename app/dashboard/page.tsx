"use client";

import { getAllDatapoints } from "@/pages/api-handler";
import { useState, useEffect } from "react";
import * as React from "react";
import { getColumns, Datapoint } from "./columns-setters";
import { Datapoint_Timer, columns as columns_timers } from "./columns-timers";
import { DataTable } from "./data-table-setters";

export default function Dashboard() {
  const [datapoints, setDatapoints] = useState<Datapoint[]>([]);
  const [datapoint_timers, setDatapointTimers] = useState<Datapoint_Timer[]>([]);
  
  const handleCheckboxChange = (xid: string, isChecked: boolean) => {
    setDatapoints(prevDatapoints => 
      prevDatapoints.map(datapoint => 
        datapoint.xid === xid 
          ? { ...datapoint, active: isChecked } 
          : datapoint
      )
    );
  };

  async function fetchDatapoints() {
    try {
      let data = await getAllDatapoints();
      data = data.filter(
        (datapoint: Datapoint) => datapoint.dataType !== "NUMERIC"
      );
  
      setDatapoints(prevDatapoints => {
        const updatedData = data.map((datapoint: Datapoint) => {
          const existingDatapoint = prevDatapoints.find(xid => xid.xid === datapoint.xid);
          return {
            ...datapoint,
            // Preserve the active state from existing datapoint
            date: existingDatapoint?.date,
            startTime: existingDatapoint?.startTime,
            endTime: existingDatapoint?.endTime,
            active: existingDatapoint?.active ?? datapoint.active ?? false
          };
        });
        
        getDatapointTimers(updatedData);
        
        return updatedData;
      });
    } catch (error) {
      console.error("Error fetching datapoints:", error);
    }
  }

  async function getDatapointTimers(currentDatapoints: Datapoint[]) {
    try {
      const response = await fetch("/api/get_datapoint_timers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      
      const updatedData = data.map((timerItem: { xid: string; }) => ({
        ...timerItem,
        name: currentDatapoints.find(item => item.xid === timerItem.xid)?.name
      }));
      setDatapointTimers(updatedData);
    } catch (error) {
      console.error("Error fetching datapoint timers:", error);
    }
  }

  useEffect(() => {
    fetchDatapoints();
    const refreshInterval = setInterval(() => {
      fetchDatapoints();  
    }, 5000);
    
    return () => clearInterval(refreshInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  const columnsWithHandler = getColumns(handleCheckboxChange);
  
  return (
    <div
      className={`flex items-center justify-around min-h-screen dark:bg-gray-900 bg-gray-100`}
    >
      <div className="flex items-center justify-center flex-col">
        <h1>Setters</h1>
        <DataTable 
          columns={columnsWithHandler} 
          data={datapoints} 
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1>Upcoming</h1>
        <DataTable columns={columns_timers} data={datapoint_timers} />
      </div>
    </div>
  );
}