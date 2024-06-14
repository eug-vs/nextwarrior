"use client";
import SubmitButton from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyFilter } from "./actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleX, Search } from "lucide-react";

export default function Filter() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "");

  useEffect(() => {
    setFilter(searchParams.get("filter") || "");
  }, [searchParams]);

  return (
    <form className="flex flex-col gap-4" action={applyFilter}>
      <div className="flex gap-4 items-end">
        <fieldset className="flex flex-col gap-1.5 flex-1">
          <Label htmlFor="filter">Filter</Label>
          <Input
            id="filter"
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="md:min-w-80"
            placeholder="task <FILTER> export"
            type="text"
            autoCapitalize="off"
          />
        </fieldset>
        {filter === searchParams.get("filter") ? (
          <SubmitButton
            variant="outline"
            className="flex gap-1.5"
            onClick={() => setFilter("")}
          >
            <CircleX /> Clear
          </SubmitButton>
        ) : (
          <SubmitButton className="flex gap-1.5">
            <Search /> Show
          </SubmitButton>
        )}
      </div>
      <div>
        {["+READY", "+PENDING due.any:"].map((preset) => (
          <SubmitButton
            variant="link"
            key={preset}
            onClick={() => setFilter(preset)}
          >
            {preset}
          </SubmitButton>
        ))}
      </div>
    </form>
  );
}
