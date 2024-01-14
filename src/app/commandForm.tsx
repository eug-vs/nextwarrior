"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { runTaskSubcommand } from "./actions";
import { useFormState } from "react-dom";
import CodeBlock from "@/lib/codeblock";
import SubmitButton from "@/components/submit-button";

export default function CommandForm() {
  const [formState, action] = useFormState(runTaskSubcommand, {
    stdout: "",
    error: "",
    cmd: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Execute command</Button>
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
            {formState.error && (
              <CodeBlock variant="destructive">{formState.error}</CodeBlock>
            )}
          </div>
          <DialogFooter>
            <SubmitButton>Execute</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
