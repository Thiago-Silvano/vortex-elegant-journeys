import { MapPin, Phone, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">
              VORTEX <span className="font-light">VIAGENS</span>
            </h3>
            <p className="font-montserrat text-sm text-primary-foreground/60 leading-relaxed">
              Excelência em cada detalhe do seu destino. Planejamento completo,
              segurança e curadoria exclusiva.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat text-xs tracking-[0.2em] uppercase mb-4 text-primary-foreground/80">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 font-montserrat text-sm text-primary-foreground/60">
                <MapPin size={14} className="flex-shrink-0" />
                Em frente à Polícia Federal
              </li>
              <li className="flex items-center gap-3 font-montserrat text-sm text-primary-foreground/60">
                <Phone size={14} className="flex-shrink-0" />
                (48) 3500-0975
              </li>
              <li className="flex items-center gap-3 font-montserrat text-sm text-primary-foreground/60">
                <Mail size={14} className="flex-shrink-0" />
                contato@vortexviagens.com.br
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat text-xs tracking-[0.2em] uppercase mb-4 text-primary-foreground/80">
              Redes Sociais
            </h4>
            <a
              href="https://instagram.com/vortexviagens"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-montserrat text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <Instagram size={16} />
              @vortexviagens
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <p className="font-montserrat text-xs text-primary-foreground/40 text-center">
            © {new Date().getFullYear()} Vortex Viagens. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
