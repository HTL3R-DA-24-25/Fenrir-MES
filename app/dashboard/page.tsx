"use client";

import { Calendar } from "@/components/ui/calendar";
import { getAllDatapoints, getValueOfDatapoint } from "@/pages/api-handler";
import { useState, useEffect } from "react";
import * as React from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { columns, Datapoint } from "./columns-setters";
import { DataTable } from "./data-table-setters";

export default function Dashboard() {
    const [datapoints, setDatapoints] = useState<Datapoint[]>([]);
    async function handleLogin() {
        try {
            let data = await getAllDatapoints();
            //remove all non datapoints that aren't NUMERIC
            data = data.filter((datapoint: Datapoint) => datapoint.dataType !== "NUMERIC");
            setDatapoints(data); // Update state with fetched data

            console.log(data);
            /* for (const point of data) {
        const value = await getValueOfDatapoint(point.idx);
        console.log(value);
      } */
        } catch (error) {
            console.error("Error fetching datapoints:", error);
        }
    }
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    });

    useEffect(() => {
        handleLogin();
    }, []);

    return (
        <div className={`flex items-center justify-around min-h-screen dark:bg-gray-900 bg-gray-100`}>
            <div className="flex items-center justify-center flex-col">
                <h1>Setters</h1>
                <DataTable columns={columns} data={datapoints} />
            </div>
            <div className="flex items-center justify-center flex-col">
                <h1>Upcoming</h1>
            </div>
        </div>
    );
}
