import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation"

export default async function LoginPage() {

    const login = async (formData: FormData) => {
        "use server"
        const supabase = createClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: 'https://emailboards.com/callback',
              scopes: "https://www.googleapis.com/auth/gmail.modify",
            },
          })

          if (data.url) {
            redirect(data.url) // use the redirect API for your server framework
          }
    }

    return (
        <section className="w-full bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-slate-100 border-4 border-black rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-slate-900">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-black">
                            Sign into your Gmail account
                        </h1>
                        <form className="w-full" action={login}>
                            <button className="btn btn-outline w-full text-black" type="submit">Go to Gmail</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}