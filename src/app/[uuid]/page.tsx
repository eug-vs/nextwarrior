import TaskCard from "@/components/task-card";
import CodeBlock from "@/lib/codeblock";
import { exec } from "@/lib/exec";
import { taskSchema } from "@/lib/schema";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function TaskPage({ params }: Props) {
  const cmd = `task ${params.uuid} export`;
  try {
    const { stdout, stderr } = await exec(cmd);
    const json = JSON.parse(stdout);
    const [task] = taskSchema.array().parse(json);
    if (!task) throw new Error("Task was not found");
    return (
      <div className="grid gap-8">
        <TaskCard task={task} />
        {stderr && <CodeBlock variant="destructive">{stderr}</CodeBlock>}
      </div>
    );
  } catch (e: any) {
    return <CodeBlock variant="destructive">{e.message}</CodeBlock>;
  }
}
