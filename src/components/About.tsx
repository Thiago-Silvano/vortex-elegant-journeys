import { useEffect, useRef, useState } from "react";

const About = () => {
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
    <section id="sobre" className="py-24 md:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-12 max-w-5xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-accent mb-4">
          Sobre nós
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-8 leading-tight">
          Excelência em cada detalhe
          <br />
          do seu destino.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              A Vortex Viagens nasceu com um propósito claro: elevar o padrão de
              atendimento no mercado de turismo.
            </p>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Mais do que vender passagens ou pacotes, oferecemos planejamento
              estratégico, organização completa e acompanhamento personalizado.
            </p>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Localizada na Rua Jorge Elias De Lucca, 677 - Nações Shopping, em Criciúma, a Vortex
              consolidou sua reputação pela seriedade, transparência e
              compromisso com cada cliente.
            </p>
            <p className="font-playfair text-lg italic text-foreground mt-4">
              Aqui, cada viagem é pensada como uma experiência única.
            </p>
          </div>

          <div className="bg-card rounded-sm aspect-[4/3] flex items-center justify-center border border-border">
            <div className="text-center px-8">
              <div className="w-16 h-px bg-accent mx-auto mb-4" />
              <p className="font-playfair text-xl text-foreground mb-2">Vortex Viagens</p>
              <p className="font-montserrat text-xs tracking-widest uppercase text-muted-foreground">
                Fachada da agência
              </p>
              <div className="w-16 h-px bg-accent mx-auto mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
