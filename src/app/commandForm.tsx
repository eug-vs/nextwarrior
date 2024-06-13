"use client";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CodeBlock from "@/lib/codeblock";
import { Play, TerminalSquare } from "lucide-react";
import { useFormState } from "react-dom";
import { runTaskSubcommand } from "./actions";

export default function CommandForm() {
  const [formState, action] = useFormState(runTaskSubcommand, {
    stdout: "",
    stderr: "",
    cmd: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1 flex flex-1">
          <TerminalSquare />
          Execute command
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-2xl">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Execute command</DialogTitle>
            <DialogDescription>
              Use this for commands that modify data
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <fieldset className="flex flex-col gap-1.5">
              <Label htmlFor="cmd">Command</Label>
              <Input
                id="cmd"
                placeholder="task <COMMAND>"
                type="text"
                name="cmd"
              />
            </fieldset>
            {formState.stdout && <CodeBlock>{formState.stdout}</CodeBlock>}
            {formState.stderr && (
              <CodeBlock variant="destructive">{formState.stderr}</CodeBlock>
            )}
          </div>
          <DialogFooter>
            <SubmitButton className="flex gap-1">
              <Play />
              Execute
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
