"use client";

import { Calendar } from "@/components/ui/calendar";
import { getAllDatapoints, loginScada } from "@/pages/api-handler";
import { useState, useEffect } from "react";
import * as React from "react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

export default function Dashboard() {
    const [datapoints, setDatapoints] = useState<any[]>([]);
    async function handleLogin() {
        try {
            const data = await getAllDatapoints();
            setDatapoints(data); // Update state with fetched data
            console.log(data)
        } catch (error) {
            console.error("Error fetching datapoints:", error);
        }
    }
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20),
    })
    

    useEffect(() => {
        handleLogin();
    }, []);

    return (
        <div className={`flex items-center justify-center min-h-screen dark:bg-gray-900 bg-gray-100`}>
        <div className="flex items-center justify-center flex-col">
            <h1>DASHBOARD</h1>
            {datapoints.length > 0 ? (
                datapoints.map((item, index) => (
                    <div>
                        <li key={index}>{item.name}</li>
                        <Calendar
      mode="range"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
                    </div>
                ))
            ) : (
                <p>No data points found</p>
            )}
            </div>
        </div>
    );
}
