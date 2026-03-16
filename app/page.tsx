import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { GalleryDesarrolloWeb } from "@/components/gallery-desarrollo-web"
import { GalleryAudiovisual } from "@/components/gallery-audiovisual"
import { AIVideoShowcase } from "@/components/ai-video-showcase"
import { GalleryCatalogoRopa } from "@/components/gallery-catalogo-ropa"
import { ProcesoCreativo } from "@/components/ProcesoCreativo"
import { Blog } from "@/components/blog"
import ContactForm from "@/components/ContactForm"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ShowreelHero } from "@/components/ShowreelHero"

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <GalleryDesarrolloWeb />
      <ShowreelHero />
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