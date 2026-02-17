import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { MessageCircle, ArrowRight } from "lucide-react";
import TravelPlanner from "./TravelPlanner";

const WHATSAPP_URL =
  "https://wa.me/554835000975?text=Ol%C3%A1%2C%20gostaria%20de%20planejar%20minha%20pr%C3%B3xima%20viagem%20com%20a%20Vortex%20Viagens.";

const Hero = () => {
  const [plannerOpen, setPlannerOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <h1
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Sua próxima experiência
          <br />
          começa aqui.
        </h1>

        <p
          className="font-montserrat text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-light opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          Planejamento completo, segurança e curadoria exclusiva para
          transformar sua viagem em algo verdadeiramente memorável.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <button
            className="inline-flex items-center gap-2 bg-primary-foreground text-foreground font-montserrat text-sm tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-primary-foreground/90 transition-all duration-300"
            onClick={() => setPlannerOpen(true)}
          >
            Planejar minha viagem
            <ArrowRight size={16} />
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-primary-foreground/50 text-primary-foreground font-montserrat text-sm tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-primary-foreground/10 transition-all duration-300"
          >
            <MessageCircle size={16} />
            Falar com um especialista
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="w-px h-12 bg-primary-foreground/40 mx-auto" />
      </div>

      <TravelPlanner isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
    </section>
  );
};

export default Hero;
