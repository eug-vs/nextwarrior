"use server";
import { exec } from "@/lib/exec";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function runTaskSubcommand(
  _previousState: any,
  formData: FormData,
) {
  const subCommand = formData.get("cmd");
  if (!subCommand || !_.isString(subCommand))
    return { error: "Please provide a command" };

  const cmd = `task ${subCommand}`;

  try {
    const { stdout, stderr } = await exec(cmd);
    revalidatePath("/");
    return { stdout, cmd, error: stderr };
  } catch (e: any) {
    return { cmd, error: e.message };
  }
}

export async function applyFilter(formData: FormData) {
  "use server";
  const filter = formData.get("filter")?.toString();
  if (!filter) return redirect("/");
  return redirect(`/?${new URLSearchParams({ filter }).toString()}`);
}
