import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina M.",
    text: "A Vortex organizou cada detalhe da nossa viagem. Foi impecável.",
  },
  {
    name: "Ricardo S.",
    text: "Atendimento diferenciado, seguro e extremamente profissional.",
  },
  {
    name: "Juliana & Pedro",
    text: "Viajamos tranquilos porque sabíamos que tínhamos suporte o tempo todo.",
  },
];

const Testimonials = () => {
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
    <section id="depoimentos" className="py-24 md:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-12 max-w-5xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Depoimentos
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight">
            A experiência de quem
            <br />
            já viajou conosco.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 border border-border rounded-sm bg-background text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-accent fill-accent"
                  />
                ))}
              </div>
              <p className="font-montserrat text-sm text-muted-foreground leading-relaxed italic mb-6">
                "{t.text}"
              </p>
              <div className="w-10 h-10 rounded-full bg-card mx-auto mb-3 flex items-center justify-center">
                <span className="font-playfair text-sm text-foreground">
                  {t.name.charAt(0)}
                </span>
              </div>
              <p className="font-montserrat text-xs tracking-wider uppercase text-foreground">
                {t.name}
              </p>
              <p className="font-montserrat text-[10px] tracking-wider uppercase text-muted-foreground mt-1">
                Cliente Vortex
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
