import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextWarrior",
  description: "Feature tracker app built on top of taskwarrior",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <header className="p-8 border-b flex justify-center">
          <form
            className="flex gap-4 items-end"
            action={async (formData) => {
              "use server";
              const filter = formData.get("filter")?.toString();
              if (!filter) return redirect("/");
              return redirect(
                `/?${new URLSearchParams({ filter }).toString()}`,
              );
            }}
          >
            <fieldset className="flex flex-col gap-1.5">
              <Label htmlFor="filter">Filter</Label>
              <Input
                id="filter"
                placeholder="task <FILTER> export"
                type="text"
                name="filter"
              />
            </fieldset>
            <Button type="submit">Apply</Button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
