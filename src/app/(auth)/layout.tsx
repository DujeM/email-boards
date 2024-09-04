import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmailBoards - Seamless Ticket Management for Gmail",
  description: "EmailBoards streamlines your email communication by turning Gmail emails into manageable tickets all in one place. Our intuitive platform aggregates emails from your Gmail account, transforming them into organized, actionable tasks. Simplify your workflow, boost productivity, and ensure no customer query goes unanswered with EmailBoards. Perfect for small businesses and teams, EmailBoards helps you stay on top of your inbox by converting emails into an efficient ticket management system.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-slate-100">{children}<Toaster position="top-right" /></main>
      </body>
    </html>
  );
}
