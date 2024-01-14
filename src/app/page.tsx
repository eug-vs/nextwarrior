import _ from "lodash";
import { Suspense } from "react";
import { exec } from "@/lib/exec";
import { taskSchema } from "@/lib/schema";
import CodeBlock from "@/lib/codeblock";
import TaskCard from "@/components/task-card";

interface Props {
  searchParams: {
    filter?: string;
  };
}

async function CmdOutput({ cmd }: { cmd: string }) {
  try {
    const { stdout, stderr } = await exec(cmd);

    try {
      const json = JSON.parse(stdout);
      const parsed = taskSchema.array().parse(json);
      console.log(parsed);
      return (
        <section className="grid gap-4">
          {_.orderBy(parsed, ["status", "urgency"], ["desc", "desc"]).map(
            (task) => (
              <TaskCard key={task.uuid} task={task} />
            ),
          )}
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
      <section className="bg-red-500 text-white p-4 rounded-md">
        <CodeBlock variant="destructive">{e.message}</CodeBlock>
      </section>
    );
  }
}

export default async function Home({ searchParams }: Props) {
  const cmd = `task ${searchParams.filter || ""} export`;
  return (
    <main className="grid gap-4">
      <h1 className="font-mono text-center">{cmd}</h1>
      <Suspense key={searchParams.filter} fallback="Loading...">
        <CmdOutput cmd={cmd} />
      </Suspense>
    </main>
  );
}
