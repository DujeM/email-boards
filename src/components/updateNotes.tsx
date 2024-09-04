"use client"

import { updateTicketNote } from "@/app/(main)/connections/actions";
import { useEffect, useRef, useState } from "react"

export default function UpdateNotes({ currentNote, ticketId }: { currentNote: string, ticketId: number }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [note, setNote] = useState(currentNote);

    useEffect(() => {
        if (note === currentNote) {
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        }, 1500)
    
        return () => clearTimeout(delayDebounceFn)
      }, [note])

    return (
        <form ref={formRef} action={updateTicketNote}>
            <input type="text" name="ticketId" defaultValue={ticketId} hidden />
            <textarea className="textarea textarea-ghost w-full focus:bg-opacity-5 !text-black" name="notes" defaultValue={currentNote} onChange={(e) => setNote(e.target.value)}></textarea>
        </form>
    )
}