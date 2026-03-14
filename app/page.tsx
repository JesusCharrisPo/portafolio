import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ComoPoedoAyudarte } from "@/components/ComoPoedoAyudarte"
import { GalleryDesarrolloWeb } from "@/components/gallery-desarrollo-web"
import { GalleryAudiovisual } from "@/components/gallery-audiovisual"
import { AIVideoShowcase } from "@/components/ai-video-showcase"
import { GalleryCatalogoRopa } from "@/components/gallery-catalogo-ropa"
import { Blog } from "@/components/blog"
import ContactForm from "@/components/ContactForm"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <ComoPoedoAyudarte />
      <GalleryDesarrolloWeb />
      <GalleryAudiovisual />
      {/* Nueva sección IA */}
      <AIVideoShowcase />
      <GalleryCatalogoRopa />
      {/* PORTFOLIO OCULTO */}
      <Blog />
      {/* FORMULARIO */}
      <ContactForm />
      <Contact />
      <Footer />
    </main>
  )
}