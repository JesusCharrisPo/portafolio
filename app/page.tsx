import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { GalleryDesarrolloWeb } from "@/components/gallery-desarrollo-web"
import { GalleryAudiovisual } from "@/components/gallery-audiovisual"
import { AIVideoShowcase } from "@/components/ai-video-showcase"
import { GalleryCatalogoRopa } from "@/components/gallery-catalogo-ropa"
import { Blog } from "@/components/blog"
import ContactForm from "@/components/ContactForm"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ShowreelHero }   from "@/components/ShowreelHero"
import { StatsSection }   from "@/components/StatsSection"
import { ProcesoCreativo } from "@/components/ProcesoCreativo"

export default function Page() {
  return (
    <main>
      <Header />
      <ShowreelHero />   {/* ← justo después del Header, reemplaza o complementa el Hero actual */}
      <Hero />
      <About />
      <StatsSection />   {/* ← después del About, genera confianza */}
      <Services />
      <GalleryAudiovisual />
      <BeforeAfterIA />
      <ProcesoCreativo /> {/* ← antes del contacto, cierra el funnel */}
      <Blog />
      <ContactForm />
      <Contact />
      <Footer />
    </main>
  )
}