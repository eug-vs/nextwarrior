import util from "util";
import { exec as execRaw } from "child_process";
import { z } from "zod";
import Link from "next/link";
import _ from "lodash";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const exec = util.promisify(execRaw);

interface Props {
  searchParams: {
    cmd?: string;
  };
}

const timestampSchema = z.string().transform((timestamp) => {
  // Convert taskwarrior timestamp to JS date
  const isoFormat = timestamp.replace(
    /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
    "$1-$2-$3T$4:$5:$6Z",
  );
  return new Date(isoFormat);
});

const annotationSchema = z.object({
  entry: timestampSchema,
  description: z.string(),
});
export type Annotation = z.infer<typeof annotationSchema>;

const taskSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  entry: timestampSchema,
  modified: timestampSchema,
  due: timestampSchema.optional(),
  end: timestampSchema.optional(),
  description: z.string(),
  status: z.enum(["pending", "completed", "deleted", "recurring"]),
  project: z.string().optional(),
  tags: z.string().array().optional(),
  annotations: annotationSchema
    .array()
    .transform((t) => _.orderBy(t, "entry", "asc"))
    .optional(),
  urgency: z.number(),
});

export type Task = z.infer<typeof taskSchema>;

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

function TaskRow({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>
            {task.id} {task.description}
          </span>
          <span>
            {task.status === "completed"
              ? "Completed"
              : task.urgency.toFixed(2)}
          </span>
        </CardTitle>
        <CardDescription className="flex gap-2 flex-wrap">
          {task.project}

          {task.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-blue-300 text-background rounded-md px-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {task.due && (
          <span className="bg-red-300 text-background rounded-md py-0.5 px-1 text-sm">
            {task.due?.toLocaleString()}
          </span>
        )}
        {task.annotations && (
          <ul className="text-">
            {task.annotations.map((anno) => (
              <Annotation key={anno.description} annotation={anno} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

async function CmdOutput({ cmd }: { cmd: string }) {
  const { stdout, stderr } = await exec(cmd);

  try {
    const json = JSON.parse(stdout);
    console.log({ json });
    const parsed = taskSchema.array().parse(json);
    console.log(_.uniqBy(parsed, "status"));
    return (
      <ul className="flex gap-4 flex-col">
        {_.orderBy(parsed, "urgency", "desc").map((task) => (
          <TaskRow key={task.uuid} task={task} />
        ))}
      </ul>
    );
  } catch (e) {
    return (
      <section className="border max-w-[70vw] mx-auto overflow-x-scroll">
        <pre>{stdout}</pre>
        <pre className="bg-red-500 text-white">{stderr}</pre>
      </section>
    );
  }
}

export default async function Home({ searchParams }: Props) {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="font-mono">{searchParams.cmd}</h1>
      {searchParams.cmd && <CmdOutput cmd={searchParams.cmd} />}
    </main>
  );
}
