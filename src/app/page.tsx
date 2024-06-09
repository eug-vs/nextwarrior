import _ from "lodash";
import { Suspense } from "react";
import { exec } from "@/lib/exec";
import { taskSchema } from "@/lib/schema";
import CodeBlock from "@/lib/codeblock";
import TaskCard from "@/components/task-card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  searchParams: {
    filter?: string;
  };
}

const statusSortorder = [
  "active",
  "pending",
  "waiting",
  "recurring",
  "completed",
  "deleted",
] as const;

async function CmdOutput({ cmd }: { cmd: string }) {
  try {
    const { stdout, stderr } = await exec(cmd);

    try {
      const json = JSON.parse(stdout);
      const parsed = taskSchema.array().parse(json);
      return (
        <section className="grid gap-4">
          {_.orderBy(
            parsed,
            [
              (item) => statusSortorder.findIndex((s) => s === item.status),
              "urgency",
            ],
            ["asc", "desc"],
          ).map((task) => (
            <TaskCard key={task.uuid} task={task} />
          ))}
        </section>
      );
    } catch (e) {
      return (
        <section>
          <CodeBlock>{stdout}</CodeBlock>
          <CodeBlock variant="destructive">{stderr}</CodeBlock>
        </section>
      );
    }
  } catch (e: any) {
    return (
      <section className="bg-destructive text-white p-4 rounded-md">
        <CodeBlock variant="destructive">{e.message}</CodeBlock>
      </section>
    );
  }
}

export default async function Home({ searchParams }: Props) {
  const cmd = `task ${process.env.FILTER_SCOPE || ""} ${
    searchParams.filter || ""
  } export`;
  return (
    <main className="grid gap-4">
      <h1 className="font-mono text-center">{cmd}</h1>
      <Suspense
        key={searchParams.filter}
        fallback={
          <section className="grid gap-4">
            {_.times(5).map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </section>
        }
      >
        <CmdOutput cmd={cmd} />
      </Suspense>
    </main>
  );
}
