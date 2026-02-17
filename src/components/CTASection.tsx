import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20planejar%20minha%20pr%C3%B3xima%20viagem%20com%20a%20Vortex%20Viagens.";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contato" className="py-24 md:py-32 bg-card">
      <div
        ref={ref}
        className={`container mx-auto px-6 lg:px-12 max-w-3xl text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="w-16 h-px bg-accent mx-auto mb-8" />
        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
          Pronto para viver sua
          <br />
          próxima experiência?
        </h2>
        <p className="font-montserrat text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
          Permita que a Vortex Viagens planeje cada detalhe. Fale com um de
          nossos especialistas agora mesmo.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-foreground text-primary-foreground font-montserrat text-sm tracking-wider uppercase px-10 py-4 rounded-sm hover:opacity-90 transition-all duration-300"
        >
          <MessageCircle size={18} />
          Falar com um especialista agora
        </a>
      </div>
    </section>
  );
};

export default CTASection;
