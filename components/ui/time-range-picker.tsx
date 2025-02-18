"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TimeRangePicker({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: {
  startTime?: string;
  endTime?: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-1">
        <Label htmlFor="start-time">Start Time</Label>
        <Input
          id="start-time"
          type="time"
          value={startTime || ""}
          onChange={(e) => onStartTimeChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="end-time">End Time</Label>
        <Input
          id="end-time"
          type="time"
          value={endTime || ""}
          onChange={(e) => onEndTimeChange(e.target.value)}
        />
      </div>
    </div>
  );
}