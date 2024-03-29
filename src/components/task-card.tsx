import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task, Annotation } from "@/lib/schema";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cva } from "class-variance-authority";
import Markdown from "react-markdown";
import {
  ArrowUpIcon,
  CalendarDaysIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { ClockIcon } from "lucide-react";

function MaybeLink({ text: textOrUrl }: { text: string }) {
  try {
    new URL(textOrUrl); // Will throw for invalid URLs
    return (
      <Link className="text-blue-500 underline" href={textOrUrl}>
        {textOrUrl}
      </Link>
    );
  } catch {
    return <Markdown>{textOrUrl}</Markdown>;
  }
}

function Annotation({ annotation }: { annotation: Annotation }) {
  return (
    <li className="flex justify-between gap-4">
      •
      <span className="grow">
        <MaybeLink text={annotation.description} />
      </span>
      <span className="text-muted-foreground hidden md:block">
        {annotation.entry.toLocaleString()}
      </span>
    </li>
  );
}

const taskVariants = cva("", {
  variants: {
    status: {
      recurring: "hidden",
      pending: "",
      waiting: "text-muted-foreground",
      deleted: "text-muted-foreground",
      active: "border-yellow-500",
      completed: "text-muted-foreground border-green-500",
    },
  },
});

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card
      className={taskVariants({
        status: task.status,
      })}
    >
      <CardHeader>
        <CardTitle className="flex justify-between gap-2">
          <div className="grid">
            <span className="flex gap-5 items-start flex-col md:flex-row">
              <Tooltip>
                <TooltipTrigger className="text-left">
                  <Link
                    href={`/?${new URLSearchParams({ filter: task.uuid })}`}
                  >
                    {task.description}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>ID: {task.id}</TooltipContent>
              </Tooltip>
              <span className="flex gap-2 flex-wrap items-start">
                {task.tags?.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?${new URLSearchParams({
                      filter: `+${tag}`,
                    }).toString()}`}
                  >
                    <Badge key={tag}>{tag}</Badge>
                  </Link>
                ))}
              </span>
            </span>
            <Link
              href={`/?${new URLSearchParams({
                filter: `project:${task.project}`,
              })}`}
              className="text-base font-semibold flex gap-1"
            >
              <DocumentDuplicateIcon className="w-4" /> {task.project}
            </Link>
          </div>
          <span className="flex gap-1 items-start">
            {["pending", "active"].includes(task.status)
              ? task.urgency.toFixed(2)
              : task.status}
          </span>
        </CardTitle>
        <CardDescription>
          <span className="flex gap-1">
            <CalendarIcon className="w-4" /> Created{" "}
            {task.entry.toLocaleString()}
          </span>
          {task.due && (
            <span
              className={`flex gap-1 ${
                task.due < new Date() &&
                !["completed", "deleted"].includes(task.status) &&
                "text-red-500"
              }`}
            >
              <CalendarDaysIcon className="w-4" /> Due{" "}
              {task.due?.toLocaleString()}
              <br />
            </span>
          )}
          {task.start && (
            <span className="text-yellow-500 flex gap-1">
              <CalendarIcon className="w-4" /> Started{" "}
              {task.start.toLocaleString()} <br />
            </span>
          )}
          {task.status === "waiting" && task.wait && (
            <span className="flex gap-1">
              <ClockIcon className="w-4" /> Waiting {task.wait.toLocaleString()}{" "}
              <br />
            </span>
          )}
          {task.end && (
            <span className="text-green-500 flex gap-1">
              <CalendarIcon className="w-4" /> Ended {task.end.toLocaleString()}{" "}
              <br />
            </span>
          )}
        </CardDescription>
      </CardHeader>
      {task.annotations && (
        <CardContent className="text-">
          {task.annotations.map((anno) => (
            <Annotation key={anno.description} annotation={anno} />
          ))}
        </CardContent>
      )}
    </Card>
  );
}
