"use client";
import SubmitButton from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyFilter } from "./actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function Filter() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "");

  useEffect(() => {
    setFilter(searchParams.get("filter") || "");
  }, [searchParams]);

  return (
    <form className="flex gap-4 items-end" action={applyFilter}>
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="filter">Filter</Label>
        <Input
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:min-w-80"
          placeholder="task <FILTER> export"
          type="text"
          name="filter"
        />
      </fieldset>
      <SubmitButton className="flex gap-1.5">
        <Search />
        Show
      </SubmitButton>
    </form>
  );
}
