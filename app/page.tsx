import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { GalleryDesarrolloWeb } from "@/components/gallery-desarrollo-web"
import { GalleryAudiovisual } from "@/components/gallery-audiovisual"
import { AIVideoShowcase } from "@/components/ai-video-showcase"
import { GalleryCatalogoRopa } from "@/components/gallery-catalogo-ropa"
import { Portfolio } from "@/components/portfolio"
import { Blog } from "@/components/blog"
import { ContactForm } from "@/components/ContactForm"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <GalleryDesarrolloWeb />
      <GalleryAudiovisual />

      {/* Nueva sección IA */}
      <AIVideoShowcase />

      <GalleryCatalogoRopa />
      <Portfolio />
      <Blog />

      {/* FORMULARIO */}
      <ContactForm />

      <Contact />
      <Footer />
    </main>
  )
}