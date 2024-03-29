import _ from "lodash";
import { z } from "zod";

export const timestampSchema = z.string().transform((timestamp) => {
  // Convert taskwarrior timestamp to JS date
  const isoFormat = timestamp.replace(
    /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
    "$1-$2-$3T$4:$5:$6Z",
  );
  return new Date(isoFormat);
});

export const annotationSchema = z.object({
  entry: timestampSchema,
  description: z.string(),
});
export type Annotation = z.infer<typeof annotationSchema>;

export const taskSchema = z
  .object({
    id: z.number(),
    uuid: z.string(),
    entry: timestampSchema,
    modified: timestampSchema,
    due: timestampSchema.optional(),
    wait: timestampSchema.optional(),
    until: timestampSchema.optional(),
    start: timestampSchema.optional(),
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
  })
  .transform((task) => ({
    ...task,
    status:
      !["deleted", "completed"].includes(task.status) && task.start
        ? ("active" as const)
        : task.wait && task.wait > new Date()
          ? ("waiting" as const)
          : task.status,
  }));

export type Task = z.infer<typeof taskSchema>;
