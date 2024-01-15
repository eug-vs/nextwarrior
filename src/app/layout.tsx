import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CommandForm from "./commandForm";
import { TooltipProvider } from "@/components/ui/tooltip";
import Filter from "./filter";

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
        <header className="border-b">
          <div className="container p-8 flex justify-between items-end">
            <Filter />
            <CommandForm />
          </div>
        </header>
        <div className="container py-16">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </body>
    </html>
  );
}
