import { useState, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";

import imgFlights from "@/assets/service-flights.jpg";
import imgInternational from "@/assets/service-international.jpg";
import imgCruise from "@/assets/service-cruise.jpg";
import imgDisney from "@/assets/service-disney.jpg";
import imgSouthAmerica from "@/assets/service-southamerica.jpg";
import imgInsurance from "@/assets/service-insurance.jpg";

const WHATSAPP_NUMBER = "554835000975";

export interface ServiceModalData {
  key: string;
  title: string;
  description: string;
  cta: string;
}

const serviceImages: Record<string, string> = {
  "Passagens Aéreas": imgFlights,
  "Pacotes Internacionais": imgInternational,
  "Cruzeiros": imgCruise,
  "Disney & Orlando": imgDisney,
  "América do Sul": imgSouthAmerica,
  "Seguro Viagem": imgInsurance,
};

const serviceDescriptions: Record<string, { description: string; cta: string }> = {
  "Passagens Aéreas": {
    description: "Emissão estratégica nacional e internacional com análise inteligente de rotas e tarifas.",
    cta: "Encontre as melhores conexões com segurança e planejamento especializado.",
  },
  "Pacotes Internacionais": {
    description: "Planejamento completo para destinos internacionais com curadoria de hotéis, voos e experiências.",
    cta: "Viaje com organização e tranquilidade do início ao fim.",
  },
  "Cruzeiros": {
    description: "Experiências marítimas exclusivas com suporte completo e escolha estratégica de cabines.",
    cta: "Descubra o mundo navegando com conforto e elegância.",
  },
  "Disney & Orlando": {
    description: "Organização inteligente para viagens em família com planejamento estratégico e economia otimizada.",
    cta: "Transforme sonhos em experiências memoráveis.",
  },
  "América do Sul": {
    description: "Destinos incríveis a poucas horas do Brasil com planejamento personalizado.",
    cta: "Descubra experiências únicas perto de você.",
  },
  "Seguro Viagem": {
    description: "Proteção completa para sua tranquilidade em qualquer destino.",
    cta: "Viaje com segurança e assistência especializada.",
  },
};

const clientSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  email: z.string().trim().email("Email inválido").max(255),
  consent: z.literal(true, { errorMap: () => ({ message: "Você precisa concordar para continuar" }) }),
});

interface ServiceModalProps {
  service: string | null;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  const [client, setClient] = useState({ name: "", phone: "", email: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
      setSuccess(false);
      setClient({ name: "", phone: "", email: "" });
      setConsent(false);
      setErrors({});
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [service]);

  if (!service) return null;

  const info = serviceDescriptions[service] || { description: "", cta: "" };
  const image = serviceImages[service];

  const handleSubmit = () => {
    setErrors({});
    const result = clientSchema.safeParse({ ...client, consent });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }

    const msg = `Olá, meu nome é ${client.name}.\nTenho interesse em ${service}.\n\nEmail: ${client.email}\nTelefone: ${client.phone}\n\nGostaria de solicitar uma cotação personalizada.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden my-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors"
          aria-label="Fechar"
        >
          <X size={18} className="text-muted-foreground" />
        </button>

        {/* Image */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img src={image} alt={service} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        )}

        {success ? (
          <div className="px-6 pb-8 pt-6 text-center space-y-4 animate-fade-in-up">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <Send size={24} className="text-accent" />
            </div>
            <h3 className="font-playfair text-xl font-medium text-foreground">Recebemos sua solicitação!</h3>
            <p className="font-montserrat text-sm text-muted-foreground">
              Um especialista Vortex entrará em contato em breve.
            </p>
            <button
              onClick={onClose}
              className="mt-2 inline-flex items-center gap-2 bg-foreground text-primary-foreground font-montserrat text-sm tracking-wider uppercase px-8 py-3 rounded-lg hover:opacity-90 transition-all"
            >
              Voltar ao site
            </button>
          </div>
        ) : (
          <div className="px-6 pb-6 pt-5 space-y-5">
            {/* Title & description */}
            <div>
              <h3 className="font-playfair text-2xl font-medium text-foreground mb-2">{service}</h3>
              <p className="font-montserrat text-sm text-muted-foreground leading-relaxed">{info.description}</p>
              <p className="font-montserrat text-sm text-accent mt-2 italic">{info.cta}</p>
            </div>

            <div className="w-10 h-px bg-accent" />

            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground">Nome completo *</Label>
                <Input className="rounded-lg font-montserrat" value={client.name} onChange={(e) => setClient((p) => ({ ...p, name: e.target.value }))} maxLength={100} />
                {errors.name && <p className="text-xs text-destructive font-montserrat">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground">Telefone (WhatsApp) *</Label>
                <Input className="rounded-lg font-montserrat" value={client.phone} onChange={(e) => setClient((p) => ({ ...p, phone: e.target.value }))} maxLength={20} placeholder="(48) 99999-0000" />
                {errors.phone && <p className="text-xs text-destructive font-montserrat">{errors.phone}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground">Email *</Label>
                <Input className="rounded-lg font-montserrat" type="email" value={client.email} onChange={(e) => setClient((p) => ({ ...p, email: e.target.value }))} maxLength={255} />
                {errors.email && <p className="text-xs text-destructive font-montserrat">{errors.email}</p>}
              </div>

              <div className="flex items-start gap-3">
                <Checkbox id="service-consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                <label htmlFor="service-consent" className="font-montserrat text-sm text-muted-foreground cursor-pointer leading-snug">
                  Concordo em ser contatado pela Vortex Viagens.
                </label>
              </div>
              {errors.consent && <p className="text-xs text-destructive font-montserrat">{errors.consent}</p>}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full inline-flex items-center justify-center gap-3 bg-foreground text-primary-foreground font-montserrat text-sm tracking-wider uppercase px-8 py-4 rounded-lg hover:opacity-90 hover:scale-[1.01] transition-all duration-300"
            >
              <MessageCircle size={16} />
              Solicitar Cotação
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceModal;
