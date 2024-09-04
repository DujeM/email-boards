import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Navbar() {
    return (
        <div className="navbar bg-slate-100 border-b border-b-4 border-black text-black">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">
                    <Image src={'/email-boards-logo.svg'} alt="EmailBoards logo" width={30} height={30} />
                    EmailBoards
                </a>
            </div>
            <div className="navbar-end">
                <Link href={'/login'} className="btn btn-outline text-black">
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                    </svg>
                    Sign in
                </Link>
            </div>
        </div>
    );
}
