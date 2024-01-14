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
      <MaybeLink text={annotation.description} />
      <span className="text-muted-foreground">
        {annotation.entry.toLocaleString()}
      </span>
    </li>
  );
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader>
        <Link href={`/${task.uuid}`}>
          <CardTitle className="flex justify-between">
            <span className="flex gap-5">
              {task.description}
              <span className="flex gap-2 flex-wrap">
                {task.tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}
              </span>
            </span>
            <span>
              {task.status === "pending"
                ? task.urgency.toFixed(2)
                : task.status}
            </span>
          </CardTitle>
        </Link>
        <CardDescription>
          {task.project}
          <p>
            Created {task.entry.toLocaleString()}
            <br />
            {task.due && <span>Due {task.due?.toLocaleString()}</span>}
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
