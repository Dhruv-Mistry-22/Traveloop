import Navbar from "@/components/landing/navbar"
import Hero from "@/components/landing/hero"
import Destinations from "@/components/landing/destinations"
import WhyUs from "@/components/landing/why-us"
import PerfectVacation from "@/components/landing/perfect-vacation"
import Explore from "@/components/landing/explore"
import Footer from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Destinations />
      <WhyUs />
      <PerfectVacation />
      <Explore />
      <Footer />
    </main>
  )
}
