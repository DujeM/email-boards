"use client"

import { createTicket } from "../app/(main)/connections/actions";

interface TicketProps {
    connectionId: number;
    emailId: string;
    userId: string;
}

export default function CreateTicket({ connectionId, emailId, userId }: TicketProps) {
    const onSubmit = async (formData: FormData) => {
        const newTicket = await createTicket(formData);

        if (newTicket) {
            (document.getElementById('createTicketModal') as HTMLDialogElement).close();
        }
    }

    return (
        <>
            <button className="btn btn-outline text-black" onClick={()=>(document.getElementById('createTicketModal') as HTMLDialogElement).showModal()}>
                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"/>
                </svg>
                Create a ticket
            </button>
            <dialog id="createTicketModal" className="modal">
                <div className="modal-box bg-slate-100 border border-4 border-black max-w-md">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-xl mb-4">New ticket</h3>
                    <form action={onSubmit}>
                        <input type="text" name="connectionId" defaultValue={connectionId} hidden />
                        <input type="text" name="emailId" defaultValue={emailId} hidden />
                        <input type="text" name="userId" defaultValue={userId} hidden />
                        <input type="text" name="description" placeholder="What needs to be done?" className="input input-bordered bg-slate-100 border-2 border-black w-full max-w-sm mb-4 focus:border-black focus:outline-none" />
                        <textarea name="notes" id="notes" placeholder="Any additional notes?" cols={20} rows={5} className="textarea textarea-bordered text-base bg-slate-100 border-2 border-black w-full max-w-sm	mb-4 focus:border-black focus:outline-none"></textarea>
                        <div>
                            <button className="btn w-full">Let's go</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}