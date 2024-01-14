import { HTMLAttributes } from "react";
import { cn } from "./utils";
import { VariantProps, cva } from "class-variance-authority";

const variants = cva("rounded-md border font-mono p-2 overflow-x-scroll", {
  variants: {
    variant: {
      default: "",
      destructive: "bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props = HTMLAttributes<HTMLPreElement> & VariantProps<typeof variants>;

export default function CodeBlock({ className, variant, ...props }: Props) {
  return <pre className={cn(variants({ variant }), className)} {...props} />;
}
