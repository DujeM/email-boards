import CreateTicket from "@/components/createTicket";
import UpdateNotes from "@/components/updateNotes";
import { gmail_v1, google } from "googleapis";
import { cookies } from "next/headers";
import { markAsRead, completeTicket } from "../actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SingleConnection({ params }: { params: { id: string } }) {
    const supabase = createClient();
    const { data: { user }, } = await supabase.auth.getUser();
    const auth = new google.auth.OAuth2({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET });
    auth.setCredentials({ access_token: cookies().get('access_token')?.value });
    const gmail = google.gmail({ version: "v1", auth });
    let unreadEmails: (gmail_v1.Schema$Message | undefined)[] = [];
    const tickets = (await supabase.from('Ticket').select().eq('connectionId', params.id)).data;
    const connection = await supabase.from('Connection').select().eq('id', params.id).single();

    try {
        const response = await gmail.users.messages.list({
            userId: "me",
            q: `is:unread from:${connection.data.email}`, // Replace @example.com with your domain
            });
        
        const messages = response.data.messages || [];
    
        unreadEmails = await Promise.all(
            messages.map(async (message) => {
                if (message.id) {
                    const msg = await gmail.users.messages.get({
                        userId: 'me',
                        id: message.id,
                        format: 'full'
                        });
                        return msg.data;
                }
            })
        );  
    } catch (err) {
        const { error } = await supabase.auth.signOut()

        if (!error) {
            redirect('/login');
        }
    }    

    return (
        <>
        <div role="tablist" className="tabs tabs-lifted w-full">
            <input type="radio" name="my_tabs_2" role="tab" className="tab lg:!w-40 !z-0 text-lg whitespace-nowrap" aria-label="Unread emails" defaultChecked />
            {!!unreadEmails.length && <div role="tabpanel" className="tab-content bg-slate-100 border-4 border-black rounded-box p-6">
                {unreadEmails.map(email => {
                        if (email && user) {
                            return (
                                (
                                <div key={email.id} className="collapse collapse-arrow bg-white text-black border-2 border-black mb-5">
                                    <input type="radio" name="my-accordion-2" />
                                    <div className="collapse-title text-xl font-medium">{email.payload?.headers?.find(h => h.name === 'Subject')?.value}</div>
                                    <div className="collapse-content">
                                      <p dangerouslySetInnerHTML={ {__html: atob((email.payload?.body?.data as string).replace(/-/g, '+').replace(/_/g, '/'))}}></p>
                                      <div className="mt-5 flex flex-wrap gap-5">
                                        <CreateTicket connectionId={connection.data.id} emailId={email.id as string} userId={user.id} />
                                        <form action={markAsRead}>
                                            <input type="text" name="emailId" defaultValue={email.id as string} hidden />
                                            <button type="submit" className="btn btn-outline text-black">
                                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"/>
                                                </svg>
                                                Mark as read
                                            </button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                )
                            )
                        }
                    })}
            </div>}
            {!unreadEmails.length && 
                <div role="tabpanel" className="tab-content bg-slate-100 border-4 border-black rounded-box p-6">
                    <p>You are up to date, no unread emails from this connection.</p>
                </div>
            }
            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab lg:!w-40 !z-0 text-lg whitespace-nowrap"
                aria-label="Tickets"
                />
            <div role="tabpanel" className="tab-content bg-slate-100 border-4 border-black rounded-box p-6">
                <div key={"in-progress"} className="collapse collapse-arrow bg-white text-black border-2 border-black mb-5">
                    <input type="radio" name="my-accordion-4" defaultChecked/>
                    <div className="collapse-title text-xl font-medium">In progress</div>
                    {!!tickets?.filter(t => !t.isCompleted).length && <div className="collapse-content flex gap-8 flex-wrap">
                        {tickets.filter(t => !t.isCompleted).map(ticket => {
                            return (
                                <div key={ticket.id} className="card bg-base-100 w-full shadow-xl max-w-sm bg-white text-black border-2 border-black">
                                    <div className="card-body gap-4">
                                        <h3 className="card-title">{ticket.description}</h3>
                                        <UpdateNotes currentNote={ticket.notes} ticketId={ticket.id} />
                                        <div className="card-actions">
                                            <form action={completeTicket} className="w-full">
                                                <input type="text" name="ticketId" defaultValue={ticket.id} hidden />
                                                <button type="submit" className="btn btn-outline text-black w-full">
                                                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                    </svg>
                                                    Complete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                    {!tickets?.filter(t => !t.isCompleted).length && 
                    <div className="collapse-content flex gap-8 flex-wrap">
                        <p>There are currently no tickets in progress</p>
                    </div>
                    }
                </div>
                <div key={"completed"} className="collapse collapse-arrow bg-white text-black border-2 border-black mb-5">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">Completed</div>
                    {!!tickets?.filter(t => t.isCompleted) && <div className="collapse-content flex gap-8 flex-wrap">
                        {tickets.filter(t => t.isCompleted).map(ticket => {
                            return (
                                <div key={ticket.id} className="card bg-base-100 w-full shadow-xl max-w-sm bg-white text-black border-2 border-black">
                                    <div className="card-body gap-4">
                                        <h3 className="card-title">{ticket.description}</h3>
                                        <UpdateNotes currentNote={ticket.notes} ticketId={ticket.id} />
                                        <div className="card-actions">
                                            <form action={completeTicket} className="w-full">
                                                <input type="text" name="ticketId" defaultValue={ticket.id} hidden />
                                                <button type="submit" className="btn btn-outline text-black w-full">
                                                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                    </svg>
                                                    Complete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                    {!tickets?.filter(t => t.isCompleted).length && 
                    <div className="collapse-content flex gap-8 flex-wrap">
                        <p>Nothing completed yet, start by creating a ticket from your inbox.</p>
                    </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}