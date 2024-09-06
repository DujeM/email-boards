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
      <div className="hero-content flex-col">
        <div>
          <h2 className="text-2xl font-bold">Start using EmailBoards by creating a new connection in the sidebar</h2>
        </div>
        <Image src={'/svg/start.svg'} alt="Start" width={640} height={530} className="hidden md:block"/>
      </div>
    </div>
    </>)
}