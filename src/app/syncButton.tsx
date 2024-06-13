"use client";

import SubmitButton from "@/components/submit-button";
import { RefreshCw } from "lucide-react";
import { useFormState } from "react-dom";
import { runTaskSubcommand } from "./actions";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SyncButton() {
  const [formState, action] = useFormState(runTaskSubcommand, {
    stdout: "",
    stderr: "",
    cmd: "",
  });

  useEffect(() => {
    if (formState.stdout) toast.info(formState.stdout);
    if (formState.stderr) toast.success(formState.stderr); // Result is written to STDERR for some reason
  }, [formState]);

  return (
    <form action={action}>
      <input type="hidden" name="cmd" value="sync" />
      <SubmitButton size="icon" title="Sync">
        <RefreshCw />
      </SubmitButton>
    </form>
  );
}
