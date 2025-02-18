"use client";

import * as React from "react";
import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export function DatePicker({
  selected,
  onSelect,
  className,
}: {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
}) {
  const [date, setDate] = React.useState<Date | undefined>(selected);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            if (onSelect) {
              onSelect(newDate);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}