import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";

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
            <fieldset className="flex flex-col">
              <label htmlFor="cmd">Command</label>
              <input id="cmd" className="ring-2 p-2" type="text" name="cmd" />
            </fieldset>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
