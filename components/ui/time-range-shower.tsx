"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TimeRangeShower({
  startTime,
  endTime,
}: {
  startTime?: string;
  endTime?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-1">
        <Label htmlFor="start-time">Start Time</Label>
        <Input
          id="start-time"
          type="time"
          value={startTime || ""}
          disabled={true}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="end-time">End Time</Label>
        <Input
          id="end-time"
          type="time"
          value={endTime || ""}
          disabled={true}
        />
      </div>
    </div>
  );
}
