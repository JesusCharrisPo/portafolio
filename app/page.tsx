import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { GalleryDesarrolloWeb } from "@/components/gallery-desarrollo-web"
import { GalleryAudiovisual } from "@/components/gallery-audiovisual"
import { AIVideoShowcase } from "@/components/ai-video-showcase"
import { GalleryCatalogoRopa } from "@/components/gallery-catalogo-ropa"
import { Blog } from "@/components/blog"
import ContactForm from "@/components/ContactForm"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ShowreelHero } from "@/components/ShowreelHero"
import { StatsSection } from "@/components/StatsSection"
import { ProcesoCreativo } from "@/components/ProcesoCreativo"

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <ShowreelHero />
      <StatsSection />
      <Services />
      <GalleryDesarrolloWeb />
      <GalleryAudiovisual />
      <AIVideoShowcase />
      <GalleryCatalogoRopa />
      <ProcesoCreativo />
      <Blog />
      <ContactForm />
      <Contact />
      <Footer />
    </main>
  )
}