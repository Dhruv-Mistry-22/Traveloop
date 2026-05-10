import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden">
      {/* LEFT COLUMN — hero image */}
      <div className="relative hidden md:flex w-1/2 h-full flex-col">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80&auto=format&fit=crop"
          alt="Dark mountain landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.60)" }}
          aria-hidden="true"
        />
        <div className="absolute bottom-10 left-10 right-10">
          <p className="font-sans italic text-white leading-relaxed" style={{ fontSize: "15px" }}>
            &ldquo;Not all those who wander are lost.&rdquo;
          </p>
          <p className="font-sans mt-1" style={{ fontSize: "13px", color: "#8fab8c" }}>
            — J.R.R. Tolkien
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN — form */}
      <div
        className="flex w-full md:w-1/2 h-full items-center justify-center px-8"
        style={{ backgroundColor: "#0f0f0f" }}
      >
        <LoginForm />
      </div>
    </main>
  )
}
