"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DatePicker } from "@/components/ui/date-picker"; // Import the DatePicker
import { TimeRangePicker } from "@/components/ui/time-range-picker"; // Import the TimeRangePicker
import { Button } from "@/components/ui/button"; // Import the Button component
import { Check } from "lucide-react"; // Import a trash icon from Lucide
import { useState } from "react"; // Import useState for local state management

export type Datapoint = {
    id: number;
    xid: string;
    name: string;
    extendName: string;
    dataType: "NUMERIC" | "STRING";
    enabled: boolean;
    description: string;
    type: number;
    typeId: number;
    dataSourceName: string;
    // MES Settings, not from the SCADA
    date?: Date; 
    startTime?: string; 
    endTime?: string; 
    active: boolean;
};

export async function addDatapointSetters(xid: string, on: boolean, date: Date, startTime: string, endTime: string) {
    fetch("/api/add_datapoint_timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xid, on, date, startTime, endTime }),
    });
    console.log(JSON.stringify({ xid, on, date, startTime, endTime }),)
}

export const columns: ColumnDef<Datapoint>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "enableDisable",
        header: "Enable/Disable",
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    <Checkbox
                        className="h-4 w-4"
                        checked={row.original.active}
                        onCheckedChange={(value) => {
                            row.original.active = !!value;
                        }}
                        aria-label="Enable/Disable row"
                    />
                </div>
            );
        },
    },
    {
        id: "datePicker",
        header: "Date",
        cell: ({ row }) => (
            <DatePicker
                selected={row.original.date}
                onSelect={(date) => {
                    row.original.date = date;
                }}
            />
        ),
    },
    {
        id: "timeRangePicker",
        header: "Time Range",
        cell: ({ row }) => {
            const [startTime, setStartTime] = useState(row.original.startTime || "");
            const [endTime, setEndTime] = useState(row.original.endTime || "");

            return (
                <TimeRangePicker
                    startTime={startTime}
                    endTime={endTime}
                    onStartTimeChange={(time) => {
                        if (endTime != "" && time > endTime) {
                            console.error("Start time cannot be greater than end time");
                            return;
                        }
                        setStartTime(time); // Update local state
                        row.original.startTime = time; // Update the row data
                    }}
                    onEndTimeChange={(time) => {
                        if (time < startTime) {
                            console.error("Start time cannot be greater than end time");
                            return;
                        }
                        setEndTime(time); // Update local state
                        row.original.endTime = time; // Update the row data
                    }}
                />
            );
        },
    },
    {
        id: "confirm",
        header: "Confirm",
        cell: ({ row }) => (
            <Button variant="default" size="sm" onClick={() => {
                if (!row.original.date || !row.original.startTime || !row.original.endTime) {
                    console.error("Please fill in all fields");
                    return;
                }
                if (!row.original.active) {
                    row.original.active = false;
                }
                addDatapointSetters(row.original.xid, row.original.active, row.original.date, row.original.startTime, row.original.endTime);
            }}>
                <Check className="h-4 w-4" /> {}
            </Button>
        ),
    },
];
