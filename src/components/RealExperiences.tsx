import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Globe, Plane, Shield } from "lucide-react";

import expParis from "@/assets/exp-paris.jpeg";
import expComo from "@/assets/exp-como.jpeg";
import expColiseu from "@/assets/exp-coliseu.jpeg";
import expChile from "@/assets/exp-chile.jpeg";
import expAlemanha from "@/assets/exp-alemanha.jpeg";
import expCroacia from "@/assets/exp-croacia.jpeg";
import expDisney from "@/assets/exp-disney.jpeg";
import expLiechtenstein from "@/assets/exp-liechtenstein.jpeg";

const WHATSAPP_URL =
  "https://wa.me/554835000975?text=Ol%C3%A1%2C%20gostaria%20de%20planejar%20minha%20pr%C3%B3xima%20viagem%20com%20a%20Vortex%20Viagens.";

const photos = [
  {
    src: expParis,
    location: "Paris, França",
    caption: "Gustavo & Natalia",
    quote: "Vivendo na prática o que planejamos para você.",
  },
  {
    src: expComo,
    location: "Lago di Como, Itália",
    caption: "Thiago & Sabrina",
    quote: "Cada destino visitado é mais segurança para sua viagem.",
  },
  {
    src: expColiseu,
    location: "Roma, Itália",
    caption: "Gustavo",
    quote: "Experiência real que evita erros na sua viagem.",
  },
  {
    src: expChile,
    location: "Farellones, Chile",
    caption: "Thiago & Sabrina",
    quote: "Aventura vivida, roteiro aperfeiçoado.",
  },
  {
    src: expAlemanha,
    location: "Dortmund, Alemanha",
    caption: "Gustavo & Natalia",
    quote: "Do estádio ao seu roteiro — experiências que fazem a diferença.",
  },
  {
    src: expCroacia,
    location: "Dubrovnik, Croácia",
    caption: "Thiago",
    quote: "Mais de 15 anos vivendo o mundo.",
  },
  {
    src: expDisney,
    location: "Orlando, EUA",
    caption: "Thiago & Sabrina",
    quote: "A magia começa no planejamento perfeito.",
  },
  {
    src: expLiechtenstein,
    location: "Vaduz, Liechtenstein",
    caption: "Gustavo & Natalia",
    quote: "Destinos exclusivos que só quem viveu pode recomendar.",
  },
];

const pillars = [
  {
    icon: Globe,
    title: "Vivência Internacional",
    text: "Mais de 15 anos morando fora do Brasil.",
  },
  {
    icon: Plane,
    title: "Experiência Real de Viagem",
    text: "Já passamos por imprevistos que hoje evitamos para você.",
  },
  {
    icon: Shield,
    title: "Planejamento Inteligente",
    text: "Cada detalhe pensado para que sua viagem seja perfeita.",
  },
];

const RealExperiences = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experiencias" className="py-24 md:py-32 bg-background">
      <div
        ref={sectionRef}
        className={`container mx-auto px-6 lg:px-12 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-px bg-accent mx-auto mb-8" />
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
            Quem Vive o Mundo, Planeja
            <br />
            Melhor Sua Viagem
          </h2>
          <p className="font-montserrat text-muted-foreground leading-relaxed">
            Já moramos fora do Brasil por mais de 15 anos. Conhecemos
            aeroportos, imigrações, conexões perdidas, hotéis problemáticos e
            experiências incríveis.
          </p>
          <p className="font-montserrat text-muted-foreground leading-relaxed mt-4">
            Hoje, usamos tudo isso para garantir que sua viagem seja segura,
            tranquila e inesquecível.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden mb-20" ref={emblaRef}>
          <div className="flex -ml-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="min-w-0 shrink-0 grow-0 pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <div className="group relative overflow-hidden rounded-xl shadow-md aspect-[3/4] cursor-pointer">
                  <img
                    src={photo.src}
                    alt={`${photo.caption} — ${photo.location}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-500 flex flex-col justify-end p-5">
                    {/* Always-visible location tag */}
                    <span className="font-montserrat text-xs tracking-widest uppercase text-white/90 drop-shadow-lg">
                      {photo.location}
                    </span>
                    {/* Hover content */}
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 mt-2">
                      <p className="font-playfair text-white text-sm italic leading-snug">
                        "{photo.quote}"
                      </p>
                      <p className="font-montserrat text-white/80 text-xs mt-2">
                        — {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {pillars.map((pillar, i) => (
            <div key={i} className="text-center">
              <pillar.icon
                size={32}
                className="mx-auto mb-4"
                style={{ color: "hsl(213 100% 13%)" }}
                strokeWidth={1.5}
              />
              <h3 className="font-playfair text-lg font-medium text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-montserrat text-sm tracking-wider uppercase px-10 py-4 rounded-sm text-white transition-all duration-300"
            style={{ backgroundColor: "hsl(213 100% 13%)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "hsl(350 62% 40%)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "hsl(213 100% 13%)")
            }
          >
            Quero Planejar Minha Viagem com Especialistas
          </a>
        </div>
      </div>
    </section>
  );
};

export default RealExperiences;
