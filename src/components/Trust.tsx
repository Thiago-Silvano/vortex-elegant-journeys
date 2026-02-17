import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const guarantees = [
  "Companhias aéreas consolidadas",
  "Operadoras reconhecidas",
  "Hotéis selecionados",
  "Transparência total nos valores",
  "Atendimento presencial e digital",
];

const Trust = () => {
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
    <section className="py-24 md:py-32 bg-card">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-12 max-w-4xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-accent mb-4">
              Segurança & Confiança
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-foreground mb-6 leading-tight">
              Segurança para investir na sua viagem.
            </h2>
            <p className="font-montserrat text-muted-foreground leading-relaxed mb-8">
              Sabemos que uma viagem é um investimento importante. Por isso,
              trabalhamos com os melhores parceiros do mercado.
            </p>
            <ul className="space-y-4">
              {guarantees.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 font-montserrat text-sm text-muted-foreground"
                >
                  <Check size={14} className="text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-right">
            <div className="w-16 h-px bg-accent mx-auto md:ml-auto md:mr-0 mb-8" />
            <p className="font-playfair text-2xl md:text-3xl italic text-foreground leading-snug">
              Você não compra apenas uma passagem.
              <br />
              <span className="text-accent">Você compra tranquilidade.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
