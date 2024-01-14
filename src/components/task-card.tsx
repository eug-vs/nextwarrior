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

function MaybeLink({ text: textOrUrl }: { text: string }) {
  try {
    new URL(textOrUrl); // Will throw for invalid URLs
    return (
      <Link className="text-blue-500 underline" href={textOrUrl}>
        {textOrUrl}
      </Link>
    );
  } catch {
    return <>{textOrUrl}</>;
  }
}

function Annotation({ annotation }: { annotation: Annotation }) {
  return (
    <li className="flex justify-between gap-4">
      <span>
        • <MaybeLink text={annotation.description} />
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
      default: "text-muted-foreground",
      pending: "",
    },
    active: {
      default: "",
      active: "border-yellow-500",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card
      className={taskVariants({
        status: task.status === "pending" ? task.status : "default",
        active: task.start ? "active" : "default",
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
              className="text-base font-semibold"
            >
              {task.project}
            </Link>
          </div>
          <span>
            {task.status === "pending" ? task.urgency.toFixed(2) : task.status}
          </span>
        </CardTitle>
        <CardDescription>
          <p>
            Created {task.entry.toLocaleString()}
            <br />
            {task.due && (
              <span>
                Due {task.due?.toLocaleString()}
                <br />
              </span>
            )}
            {task.start && (
              <span className="text-yellow-500">
                Started {task.start.toLocaleString()} <br />
              </span>
            )}
            {task.wait && (
              <span>
                Waiting {task.wait.toLocaleString()} <br />
              </span>
            )}
            {task.end && (
              <span>
                Completed {task.end.toLocaleString()} <br />
              </span>
            )}
          </p>
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
