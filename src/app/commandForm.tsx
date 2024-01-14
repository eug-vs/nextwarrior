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
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const formStatus = useFormStatus();
  return <Button disabled={formStatus.pending}>Execute</Button>;
}

export default function CommandForm() {
  const [formState, action] = useFormState(runTaskSubcommand, {
    stdout: "",
    error: "",
    cmd: "",
  });

  return (
    <Dialog>
      <DialogTrigger>
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
            {formState.stdout && (
              <pre className="font-mono rounded-md p-2 max-w-min overflow-x-scroll border">
                {formState.stdout}
              </pre>
            )}
            {formState.error && (
              <pre className="font-mono bg-destructive text-destructive-foreground rounded-md p-2 border overflow-x-scroll">
                {formState.error}
              </pre>
            )}
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
