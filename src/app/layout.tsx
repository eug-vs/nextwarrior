import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <header className="p-8 border-b">
          <form
            action={async (formData) => {
              "use server";
              const cmd = formData.get("cmd")?.toString();
              if (!cmd) throw new Error("Wtf");
              return redirect(`?${new URLSearchParams({ cmd }).toString()}`);
            }}
          >
            <fieldset className="flex flex-col gap-1.5">
              <Label htmlFor="cmd">Command</Label>
              <Input
                id="cmd"
                placeholder="task <FILTER> export"
                type="text"
                name="cmd"
              />
            </fieldset>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
