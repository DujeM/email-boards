export function Video() {
    return (
        <div className="flex justify-center">
            <video className="p-5 border-4 border-black rounded-3xl" width="808" height="472" controls autoPlay muted preload="none">
                {/* <source src="https://siyyddppcfstypgcrrmv.supabase.co/storage/v1/object/sign/assets/emailboards.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvZW1haWxib2FyZHMubXA0IiwiaWF0IjoxNzI1NDYwNTY5LCJleHAiOjE3NTY5OTY1Njl9.h5G_RUCjfk7IetWUYjm5pW4A4YdwONtYIwNtFrLa230&t=2024-09-04T14%3A36%3A09.872Z" type="video/mp4" /> */}
                Your browser does not support the video tag.
            </video>
        </div>
    )
  }