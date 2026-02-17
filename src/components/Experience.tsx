import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const differentials = [
  "Planejamento estratégico personalizado",
  "Curadoria de hotéis e voos com melhor custo-benefício",
  "Organização documental",
  "Suporte antes, durante e após a viagem",
  "Atendimento humano e consultivo",
];

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experiencia" className="py-24 md:py-32 bg-card">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-12 max-w-4xl text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-accent mb-4">
          Experiência Vortex
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4 leading-tight">
          Não vendemos viagens.
          <br />
          Entregamos experiências.
        </h2>

        <div className="w-16 h-px bg-accent mx-auto my-10" />

        <ul className="space-y-5 max-w-md mx-auto text-left">
          {differentials.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 font-montserrat text-muted-foreground"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                <Check size={12} className="text-accent" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="w-16 h-px bg-accent mx-auto my-10" />

        <p className="font-playfair text-xl md:text-2xl italic text-foreground">
          Viajar deve ser leve.
          <br />
          E nós cuidamos de tudo para que seja.
        </p>
      </div>
    </section>
  );
};

export default Experience;
