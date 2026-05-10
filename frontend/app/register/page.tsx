import RegisterForm from "@/components/register-form"

export default function RegisterPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden">
      {/* LEFT COLUMN — hero image */}
      <div className="relative hidden md:flex w-[45%] h-full flex-col flex-shrink-0">
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80&auto=format&fit=crop"
          alt="Forest with light filtering through tall trees"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          aria-hidden="true"
        />
        {/* Quote */}
        <div className="absolute bottom-10 left-10 right-10">
          <p
            className="font-sans italic text-white leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            &ldquo;The world is a book, and those who do not travel read only one page.&rdquo;
          </p>
          <p
            className="font-sans mt-1"
            style={{ fontSize: "13px", color: "#8fab8c" }}
          >
            — Saint Augustine
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN — scrollable form */}
      <div
        className="flex w-full md:w-[55%] h-full overflow-y-auto items-start justify-center px-8"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <RegisterForm />
      </div>
    </main>
  )
}
