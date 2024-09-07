import Image from "next/image";
import CreateConnection from "./createConnection";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';
import Stripe from "stripe";

export default async function Sidebar() {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const connections = await supabase.from('Connection').select().eq('userId', user.data.user?.id)
    const headersList = headers();
    const profile = await supabase.from('Profile').select().eq('userId', user.data.user?.id).single();

    headersList.get('host'); // to get domain

    const signOut = async (formData: FormData) => {
        "use server"
        const supabase = createClient();
        const { error } = await supabase.auth.signOut()

        if (!error) {
            redirect('/login');
        }
    }

    const redirectTostripe = async (formData: FormData) => {
        "use server"
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

        const checkout = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: 'price_1Pud0GRrNnLvy6TVidFLqalY',
                quantity: 1
              }
            ],
            mode: 'payment',
            customer_email: user.data.user?.email,
            success_url: 'https://www.emailboards.com/success?sessionId={CHECKOUT_SESSION_ID}',
            automatic_tax: {enabled: true},
          });

          redirect(checkout.url ?? '');
    }

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu min-h-full w-60 p-4 bg-slate-100 border-r border-r-4 border-black text-black gap-3">
            {/* Sidebar content here */}
            <a className="flex items-center gap-1.5 text-xl">
                <Image src={'/email-boards-logo.svg'} alt="EmailBoards logo" width={30} height={30} />
                EmailBoards
            </a>
            <CreateConnection isDisabled={!profile.data.paymentCompleted && connections.data?.length === 1}/>
            {connections.data?.map(connection => (
                <li key={connection.id}><Link href={`/connections/${connection.id}`}>{connection.fullName}</Link></li>
            ))}
            <div className="mt-auto">
                {!profile.data.completed && <form action={redirectTostripe} className="mb-4">
                    <button className="btn btn-outline text-black w-full" type="submit">
                        <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                        </svg>
                        Get full access
                    </button>
                </form>}
                <form action={signOut}>
                    <button type="submit" className="btn btn-outline text-black w-full">
                        <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
                        </svg>
                        Sign out
                    </button>
                </form>
            </div>
            </ul>
        </div>
    )
}