"use client";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

export default function SubmitButton({
  disabled,
  ...props
}: Omit<ButtonProps, "type">) {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending || disabled} {...props} />;
}
