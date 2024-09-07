import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function ConnectionsPage() {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const profile = await supabase.from('Profile').select().eq('userId', user.data.user?.id).single();

    // if (!profile.data.paymentCompleted) {
    //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    //     const checkout = await stripe.checkout.sessions.create({
    //         line_items: [
    //           {
    //             price: 'price_1Pud0GRrNnLvy6TVidFLqalY',
    //             quantity: 1
    //           }
    //         ],
    //         mode: 'payment',
    //         customer_email: user.data.user?.email,
    //         success_url: 'https://www.emailboards.com/success?sessionId={CHECKOUT_SESSION_ID}',
    //         automatic_tax: {enabled: true},
    //       });

    //       redirect(checkout.url ?? '');
    // }

    const connections = await supabase.from('Connection').select().eq('userId', user.data.user?.id)

    if (connections.data?.length) {
        redirect(`/connections/${connections.data[0].id}`)
    }

    return (
    <>
    <div className="hero my-20">
      <div className="hero-content">
        <div>
          <h2 className="text-5xl font-bold">Welcome to EmailBoards</h2>
          <p className="text-lg py-6">Create your first connection for free after that to create multiple connections and get all upcoming features consider buying the full version of EmailBoards.</p>
        </div>
        <Image src={'/svg/start.svg'} alt="Start" width={640} height={530} className="hidden md:block"/>
      </div>
    </div>
    </>)
}