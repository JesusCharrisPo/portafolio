import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"

// 🔥 CAMBIO CLAVE 1: Sin llaves
import GalleryDesarrolloWeb from "@/components/gallery-desarrollo-web"

import { GalleryAudiovisual } from "@/components/gallery-audiovisual"

// 🔥 CAMBIO CLAVE 2: Sin llaves
import GalleryCatalogoRopa from "@/components/gallery-catalogo-ropa"

import { Portfolio } from "@/components/portfolio"
import { Blog } from "@/components/blog"
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
      <GalleryCatalogoRopa />
      <Portfolio />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}