import { useEffect, useRef, useState } from "react";
import { Plane, Globe, Ship, Sparkles, MapPin, Shield } from "lucide-react";
import ServiceModal from "./ServiceModal";

const services = [
  { icon: Plane, title: "Passagens Aéreas", desc: "Emissão nacional e internacional com análise estratégica de tarifas." },
  { icon: Globe, title: "Pacotes Internacionais", desc: "Europa, Estados Unidos, Caribe, Ásia e destinos exclusivos." },
  { icon: Ship, title: "Cruzeiros", desc: "Experiências marítimas premium com suporte completo." },
  { icon: Sparkles, title: "Disney & Orlando", desc: "Planejamento inteligente para viagens em família." },
  { icon: MapPin, title: "América do Sul", desc: "Chile, Argentina, Peru e destinos incríveis a poucas horas do Brasil." },
  { icon: Shield, title: "Seguro Viagem", desc: "Proteção completa para sua tranquilidade." },
];

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicos" className="py-24 md:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-12 max-w-6xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Nossos Serviços
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight">
            Soluções completas para
            <br />
            qualquer destino.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <button
              key={i}
              onClick={() => setActiveService(service.title)}
              className="group p-8 rounded-sm border border-border bg-background hover:bg-card transition-all duration-500 hover:shadow-lg text-left cursor-pointer"
            >
              <service.icon
                size={28}
                className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.5}
              />
              <h3 className="font-playfair text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="font-montserrat text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </section>
  );
};

export default Services;
