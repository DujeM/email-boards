"use client"

import { createConnection } from "../app/(main)/connections/actions";

export default function CreateConnection() {
    const onSubmit = async (formData: FormData) => {
        const newConnection = await createConnection(formData);
        if (newConnection) {
            (document.getElementById('createConnectionModal') as HTMLDialogElement).close();
        }
    }

    return (
        <>
            <button className="btn btn-outline text-black" onClick={()=>(document.getElementById('createConnectionModal') as HTMLDialogElement).showModal()}>
                <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                Add a connection
            </button>
            <dialog id="createConnectionModal" className="modal">
                <div className="modal-box bg-slate-100 border border-4 border-black max-w-sm">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-xl mb-4">New connection</h3>
                    <form action={onSubmit}>
                        <input type="text" name="fullName" placeholder="Full name" className="input input-bordered bg-slate-100 border-2 border-black w-full max-w-sm mb-4 focus:border-black focus:outline-none" />
                        <input type="email" name="email" placeholder="Email" className="input input-bordered bg-slate-100 border-2 border-black w-full max-w-sm	mb-4 focus:border-black focus:outline-none" />
                        <div>
                            <button className="btn w-full">Let's go</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}