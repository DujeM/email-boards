import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

export default async function SuccessPage({
    searchParams,
  }: {
    searchParams?: {
      sessionId?: string;
    };
  }) {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    if (searchParams?.sessionId) {
        const checkout = await stripe.checkout.sessions.retrieve(searchParams?.sessionId);

        if (checkout.payment_status === 'paid') {
            await supabase.from('Profile').update({ paymentCompleted: true }).eq('userId', user.data.user?.id);
        }
    }
    
    return (
        <div className="hero">
            <div className="hero-content">
            <div>
                <h2 className="text-3xl font-bold">Thank you for your purchase</h2>
                <Link href={'/connections'} className="btn btn-outline !text-black mt-4">Get started</Link>
            </div>
            <Image src={'/svg/success.svg'} alt="Start" width={640} height={530} className="hidden md:block"/>
            </div>
        </div>
    )
}