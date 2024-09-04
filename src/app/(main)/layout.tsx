import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast"
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

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
        <main className="flex flex-col min-h-screen items-center bg-slate-100">
        <div className="drawer lg:drawer-open flex-1">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center bg-slate-300 lg:p-10 pt-16 pr-2.5 pl-2.5">
                {children}
                <label htmlFor="my-drawer-2" className="drawer-button absolute top-1 left-1 lg:hidden">
                  <svg className="w-12 h-12 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                  </svg>
                </label>
            </div>
            <Sidebar/>
        </div>
            <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
