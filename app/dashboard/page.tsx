"use client";

import { getAllDatapoints } from "@/pages/api-handler";
import { useState, useEffect } from "react";
import * as React from "react";
import { columns, Datapoint } from "./columns-setters";
import { columns as columns_timers } from "./columns-timers";
import { DataTable } from "./data-table-setters";

/* export function updateDatapointTimers() {
    getDatapointTimers();
} */

export default function Dashboard() {
  const [datapoints, setDatapoints] = useState<Datapoint[]>([]);
  const [datapoint_timers, setDatapointTimers] = useState<Datapoint[]>([]);

  async function getDatapoints() {
    try {
      let data = await getAllDatapoints();
      //remove all non datapoints that aren't NUMERIC

      data = data.filter(
        (datapoint: Datapoint) => datapoint.dataType !== "NUMERIC"
      );

      setDatapoints(data); // Update state with fetched data
      getDatapointTimers();
    } catch (error) {
      console.error("Error fetching datapoints:", error);
    }
  }

  async function getDatapointTimers() {
    try {
      const response = await fetch("/api/get_datapoint_timers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        data[i].name = datapoints.find((xid) => xid.xid === data[i].xid)?.name;
      }
      setDatapointTimers(data);
    } catch (error) {
      console.error("Error fetching datapoint timers:", error);
    }
  }

  useEffect(() => {
    getDatapoints();
  }, []);
    
  useEffect(() => {
    getDatapointTimers();
  }, []);
  return (
    <div
      className={`flex items-center justify-around min-h-screen dark:bg-gray-900 bg-gray-100`}
    >
      <div className="flex items-center justify-center flex-col">
        <h1>Setters</h1>
        <DataTable columns={columns} data={datapoints} />
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1>Upcoming</h1>
        <DataTable columns={columns_timers} data={datapoint_timers} />
      </div>
    </div>
  );
}
