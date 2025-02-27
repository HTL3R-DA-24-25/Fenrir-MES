"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react"; 
import { TimeRangeShower } from "@/components/ui/time-range-shower";

export type Datapoint_Timer = {
  mes_id: number;
  xid: string;
  name: string;
  // MES Settings, not from the SCADA
  date?: Date;
  startTime?: string;
  endTime?: string;
  active: boolean;
};

export async function addDatapointSetters(
  xid: string,
  active: boolean,
  date: Date,
  startTime: string,
  endTime: string
) {
  fetch("/api/add_datapoint_timer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ xid, active, date, startTime, endTime }),
  });
}

export async function deleteDatapointTimer(mes_id: number) {
  fetch("/api/delete_datapoint_timer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mes_id }),
  });
}

export const columns: ColumnDef<Datapoint_Timer>[] = [
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
            disabled={true}
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
      <Button
        variant={"outline"}
        className={
          "w-[240px] justify-start text-left font-normal text-muted-foreground"
        }
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {row.original.date ? format(row.original.date, "PPP") : ""}
      </Button>
    ),
  },
  {
    id: "timeRangePicker",
    header: "Time Range",
    cell: ({ row }) => {
      return (
        <TimeRangeShower
          startTime={row.original.startTime}
          endTime={row.original.endTime}
        />
      );
    },
  },
  {
    id: "confirm",
    header: "Confirm",
    cell: ({ row }) => (
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          deleteDatapointTimer(row.original.mes_id);
        }}
      >
        <Trash2 className="h-4 w-4" /> {}
      </Button>
    ),
  },
];
