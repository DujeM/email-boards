import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Video } from "@/components/video";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const includedFeatures = [
    'Gmail authentication',
    'Add email connections',
    'Manage specific connection boards',
    'Seamless ticket management',
  ];

  return (
    <>
    <Navbar />
    <div className="hero my-20">
      <div className="hero-content">
        <div>
          <h1 className="text-5xl font-bold">Turn your emails into manageable tickets</h1>
          <p className="py-6">Simplify your workflow, boost productivity, and ensure no customer query goes unanswered</p>
          <a href="#cta" className="btn btn-outline !text-black">Get started</a>
        </div>
        <Image src={'/svg/inbox.svg'} alt="Online payments" width={640} height={530} className="hidden md:block"/>
      </div>
    </div>
    <div className="bg-slate-100 border-t-4 border-b-4 border-black my-20 py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center">Bloat free software, focused on getting things done</h2>
      <p className="py-6 text-center text-lg">Streamline your email communication, transform your emails into organized, actionable tasks.</p>
    </div>
    <div className="flex p-5 gap-5 justify-center md:justify-between flex-wrap max-w-7xl mx-auto my-20">
      <div className="card w-96 h-96 shadow-xl border-4 border-black">
        <figure className="bg-white p-5 h-60">
          <Image src={'/svg/connection.svg'} alt="Connections" width={384} height={226} className="p-5 h-64" />
        </figure>
        <div className="card-body p-2 gap-0 rounded-es-2xl rounded-ee-2xl h-36 sm:p-5 sm:gap-2 border-t-4 border-black">
          <h2 className="card-title">Add connections</h2>
          <p>You are in control, add connections based on emails that you want to focus on</p>
        </div>
      </div>
      <div className="card w-96 h-96 shadow-xl border-4 border-black">
        <figure className="bg-white p-5 h-60">
          <Image src={'/svg/boards.svg'} alt="Boards" width={384} height={226} className="p-5 h-64" />
        </figure>
        <div className="card-body p-2 gap-0 rounded-es-2xl rounded-ee-2xl h-36 sm:p-5 sm:gap-2 border-t-4 border-black">
          <h2 className="card-title">Manage your boards</h2>
          <p>Each connection has it's own board, simple overview of unread emails and tickets in progress</p>
        </div>
      </div>
      <div className="card w-96 h-96 shadow-xl border-4 border-black">
        <figure className="bg-white p-5 h-60">
          <Image src={'/svg/tickets.svg'} alt="Tickets" width={384} height={226} className="p-5 h-64" />
        </figure>
        <div className="card-body p-2 gap-0 rounded-es-2xl rounded-ee-2xl h-36 sm:p-5 sm:gap-2 border-t-4 border-black">
          <h2 className="card-title">Easy ticket management</h2>
          <p>Simple ticket creation, quick note taking</p>
        </div>
      </div>
    </div>
    <Video/>
    <div id="cta" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-5xl font-bold sm:text-4xl">Simple no-tricks pricing</h2>
          <p className="mt-6 text-lg leading-8">
            Start growing your business today, no hidden costs, pay once own it forever
          </p>
        </div>
        <div className="border-4 border-black mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight">Lifetime membership</h3>
            <p className="mt-6 text-base leading-7">
              
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-orng">What’s included</h4>
              <div className="h-px flex-auto bg-orng" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">€49.99</span>
                </p>
                <Link href={'/login'} className="btn btn-outline text-black mt-3">Get access</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer footer-center bg-base-300 text-base-content p-4 flex justify-between">
      <aside>
        <p>EmailBoards © {new Date().getFullYear()} - All right reserved by Excode.hr</p>
      </aside>
      <Link href={'/privacy'}>Privacy</Link>
    </footer>
    </>
  );
}
