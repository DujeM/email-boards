"use server";
import { createClient } from "@/lib/supabase/server";
import { gmail_v1, google } from "googleapis";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createConnection(formData: FormData) {
  "use server";
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  const newConnection = await supabase
    .from("Connection")
    .insert([{ fullName, email, userId: user.data.user?.id }]);

  revalidatePath("/connections");

  return newConnection;
}

export async function markAsRead(formData: FormData) {
  "use server";
  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });
  auth.setCredentials({ access_token: cookies().get("access_token")?.value });
  const gmail = google.gmail({ version: "v1", auth });
  const emailId = formData.get("emailId") as string;
  const res = await gmail.users.messages.modify({
    userId: "me",
    id: emailId,
    requestBody: {
      addLabelIds: [],
      removeLabelIds: ["UNREAD"],
    },
  });
  revalidatePath("/connections");
}

export async function createTicket(formData: FormData) {
  "use server";
  const description = formData.get("description") as string;
  const notes = formData.get("notes") as string;
  const connectionId = formData.get("connectionId") as string;
  const emailId = formData.get("emailId") as string;
  const userId = formData.get("userId") as string;
  const supabase = createClient();

  const newTicket = await supabase
    .from("Ticket")
    .insert([
      { description, notes, connectionId, emailId, userId, isCompleted: false },
    ]);

  revalidatePath("/connections");

  return newTicket;
}

export async function completeTicket(formData: FormData) {
  "use server";
  const ticketId = formData.get("ticketId") as string;
  const supabase = createClient();

  const updatedTicket = await supabase
    .from("Ticket")
    .update({ isCompleted: true })
    .eq("id", ticketId);

  revalidatePath("/connections");
}

export async function updateTicketNote(formData: FormData) {
  "use server";
  const ticketId = formData.get("ticketId") as string;
  const notes = formData.get("notes") as string;
  const supabase = createClient();

  const updatedTicket = await supabase
    .from("Ticket")
    .update({ notes })
    .eq("id", ticketId);

  revalidatePath("/connections");
}
