import { useState, useRef, useEffect } from "react";
import { Plane, Hotel, Car, Shield, X, Send, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";

const WHATSAPP_NUMBER = "554835000975";

type ServiceType = "flights" | "hotel" | "car" | "insurance";

const services: { id: ServiceType; label: string; icon: React.ReactNode }[] = [
  { id: "flights", label: "Passagens Aéreas", icon: <Plane size={18} /> },
  { id: "hotel", label: "Hospedagem", icon: <Hotel size={18} /> },
  { id: "car", label: "Aluguel de Carros", icon: <Car size={18} /> },
  { id: "insurance", label: "Seguro Viagem", icon: <Shield size={18} /> },
];

const clientSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  email: z.string().trim().email("Email inválido").max(255),
  consent: z.literal(true, { errorMap: () => ({ message: "Você precisa concordar para continuar" }) }),
});

interface TravelPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectField = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="space-y-1.5">
    <Label className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground">{label}</Label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-montserrat"
      >
        <option value="">Selecione</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

const FormField = ({ label, ...props }: { label: string } & React.ComponentProps<"input">) => (
  <div className="space-y-1.5">
    <Label className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground">{label}</Label>
    <Input className="rounded-lg font-montserrat" {...props} />
  </div>
);

const ObsField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="space-y-1.5 col-span-full">
    <Label className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground">Observações</Label>
    <Textarea className="rounded-lg font-montserrat min-h-[70px]" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Preferências, necessidades especiais..." maxLength={500} />
  </div>
);

const FlightsForm = ({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) => (
  <>
    <FormField label="Cidade de origem" value={data.origin || ""} onChange={(e) => set("origin", e.target.value)} placeholder="Ex: Florianópolis" maxLength={100} />
    <FormField label="Cidade de destino" value={data.destination || ""} onChange={(e) => set("destination", e.target.value)} placeholder="Ex: Lisboa" maxLength={100} />
    <FormField label="Data de ida" type="date" value={data.departure || ""} onChange={(e) => set("departure", e.target.value)} />
    <FormField label="Data de volta" type="date" value={data.returnDate || ""} onChange={(e) => set("returnDate", e.target.value)} />
    <FormField label="Adultos" type="number" min="1" max="20" value={data.adults || "1"} onChange={(e) => set("adults", e.target.value)} />
    <FormField label="Crianças" type="number" min="0" max="20" value={data.children || "0"} onChange={(e) => set("children", e.target.value)} />
    <SelectField label="Classe" options={["Econômica", "Premium Economy", "Executiva", "Primeira Classe"]} value={data.flightClass || ""} onChange={(v) => set("flightClass", v)} />
    <ObsField value={data.obs || ""} onChange={(v) => set("obs", v)} />
  </>
);

const HotelForm = ({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) => (
  <>
    <FormField label="Destino" value={data.destination || ""} onChange={(e) => set("destination", e.target.value)} placeholder="Ex: Paris" maxLength={100} />
    <FormField label="Check-in" type="date" value={data.checkin || ""} onChange={(e) => set("checkin", e.target.value)} />
    <FormField label="Check-out" type="date" value={data.checkout || ""} onChange={(e) => set("checkout", e.target.value)} />
    <FormField label="Nº de hóspedes" type="number" min="1" max="20" value={data.guests || "1"} onChange={(e) => set("guests", e.target.value)} />
    <SelectField label="Tipo de acomodação" options={["Hotel", "Resort", "Pousada", "Apartamento", "Hostel"]} value={data.accommodationType || ""} onChange={(v) => set("accommodationType", v)} />
    <ObsField value={data.obs || ""} onChange={(v) => set("obs", v)} />
  </>
);

const CarForm = ({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) => (
  <>
    <FormField label="Local de retirada" value={data.pickupLocation || ""} onChange={(e) => set("pickupLocation", e.target.value)} placeholder="Ex: Aeroporto de Guarulhos" maxLength={100} />
    <FormField label="Data retirada" type="date" value={data.pickupDate || ""} onChange={(e) => set("pickupDate", e.target.value)} />
    <FormField label="Data devolução" type="date" value={data.returnDate || ""} onChange={(e) => set("returnDate", e.target.value)} />
    <SelectField label="Categoria" options={["Econômico", "Compacto", "Intermediário", "SUV", "Luxo"]} value={data.category || ""} onChange={(v) => set("category", v)} />
    <ObsField value={data.obs || ""} onChange={(v) => set("obs", v)} />
  </>
);

const InsuranceForm = ({ data, set }: { data: Record<string, string>; set: (k: string, v: string) => void }) => (
  <>
    <FormField label="Destino" value={data.destination || ""} onChange={(e) => set("destination", e.target.value)} placeholder="Ex: Europa" maxLength={100} />
    <FormField label="Data início" type="date" value={data.startDate || ""} onChange={(e) => set("startDate", e.target.value)} />
    <FormField label="Data término" type="date" value={data.endDate || ""} onChange={(e) => set("endDate", e.target.value)} />
    <FormField label="Nº de viajantes" type="number" min="1" max="20" value={data.travelers || "1"} onChange={(e) => set("travelers", e.target.value)} />
    <FormField label="Idade dos viajantes" value={data.ages || ""} onChange={(e) => set("ages", e.target.value)} placeholder="Ex: 35, 32, 8" maxLength={100} />
    <ObsField value={data.obs || ""} onChange={(v) => set("obs", v)} />
  </>
);

const serviceLabels: Record<ServiceType, string> = {
  flights: "✈ Passagens Aéreas",
  hotel: "🏨 Hospedagem",
  car: "🚗 Aluguel de Carros",
  insurance: "🛡 Seguro Viagem",
};

function buildMessage(
  selected: ServiceType[],
  formData: Record<ServiceType, Record<string, string>>,
  client: { name: string; phone: string; email: string }
) {
  let msg = `*Nova Solicitação — Vortex Viagens*\n\n`;
  msg += `*Cliente:* ${client.name}\n*Telefone:* ${client.phone}\n*Email:* ${client.email}\n\n`;

  for (const s of selected) {
    msg += `--- ${serviceLabels[s]} ---\n`;
    const d = formData[s];
    for (const [k, v] of Object.entries(d)) {
      if (v) msg += `${k}: ${v}\n`;
    }
    msg += `\n`;
  }

  return msg;
}

const TravelPlanner = ({ isOpen, onClose }: TravelPlannerProps) => {
  const [selected, setSelected] = useState<ServiceType[]>(["flights"]);
  const [formData, setFormData] = useState<Record<ServiceType, Record<string, string>>>({
    flights: { adults: "1", children: "0" },
    hotel: { guests: "1" },
    car: {},
    insurance: { travelers: "1" },
  });
  const [client, setClient] = useState({ name: "", phone: "", email: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<ServiceType>("flights");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSuccess(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggleService = (id: ServiceType) => {
    setSelected((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      if (next.length === 0) return prev;
      if (!next.includes(activeTab)) setActiveTab(next[0]);
      return next;
    });
  };

  const setField = (service: ServiceType) => (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [service]: { ...prev[service], [key]: value } }));
  };

  const handleSubmit = () => {
    setErrors({});
    const result = clientSchema.safeParse({ ...client, consent });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }

    const msg = buildMessage(selected, formData, client);
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
    setSuccess(true);
  };

  if (!isOpen) return null;

  const renderForm = () => {
    switch (activeTab) {
      case "flights": return <FlightsForm data={formData.flights} set={setField("flights")} />;
      case "hotel": return <HotelForm data={formData.hotel} set={setField("hotel")} />;
      case "car": return <CarForm data={formData.car} set={setField("car")} />;
      case "insurance": return <InsuranceForm data={formData.insurance} set={setField("insurance")} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        ref={containerRef}
        className="relative w-full max-w-3xl mx-4 my-8 bg-background rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl font-medium text-foreground">
              Planejamento sob medida.
            </h2>
            <p className="font-montserrat text-sm text-muted-foreground mt-1 max-w-lg">
              Preencha as informações abaixo e nossa equipe fará uma cotação estratégica, buscando as melhores opções para sua viagem.
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Fechar">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="w-12 h-px bg-accent mx-6 my-4" />

        {success ? (
          <div className="px-6 pb-10 pt-4 text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <Send size={28} className="text-accent" />
            </div>
            <h3 className="font-playfair text-xl font-medium text-foreground">Recebemos sua solicitação!</h3>
            <p className="font-montserrat text-muted-foreground text-sm max-w-md mx-auto">
              Um especialista Vortex entrará em contato em breve para apresentar as melhores opções para sua viagem.
            </p>
            <button
              onClick={onClose}
              className="mt-4 inline-flex items-center gap-2 bg-foreground text-primary-foreground font-montserrat text-sm tracking-wider uppercase px-8 py-3 rounded-lg hover:opacity-90 transition-all"
            >
              Voltar ao site
            </button>
          </div>
        ) : (
          <div className="px-6 pb-6 space-y-6">
            {/* Service selection */}
            <div>
              <p className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground mb-3">Selecione os serviços desejados</p>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => {
                  const isActive = selected.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-montserrat text-sm transition-all duration-200 border ${
                        isActive
                          ? "bg-foreground text-primary-foreground border-foreground"
                          : "bg-background text-muted-foreground border-border hover:border-foreground/30"
                      }`}
                    >
                      {s.icon}
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tabs for selected services */}
            {selected.length > 1 && (
              <div className="flex gap-1 border-b border-border">
                {selected.map((s) => {
                  const svc = services.find((sv) => sv.id === s)!;
                  return (
                    <button
                      key={s}
                      onClick={() => setActiveTab(s)}
                      className={`px-4 py-2 font-montserrat text-sm transition-all border-b-2 -mb-px ${
                        activeTab === s
                          ? "border-foreground text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {svc.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Dynamic form fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderForm()}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border" />

            {/* Client data */}
            <div>
              <p className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground mb-3">Seus dados</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="font-montserrat text-xs tracking-wider uppercase text-muted-foreground">Email *</Label>
                  <Input className="rounded-lg font-montserrat" type="email" value={client.email} onChange={(e) => setClient((p) => ({ ...p, email: e.target.value }))} maxLength={255} />
                  {errors.email && <p className="text-xs text-destructive font-montserrat">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(v) => setConsent(v === true)}
                className="mt-0.5"
              />
              <label htmlFor="consent" className="font-montserrat text-sm text-muted-foreground cursor-pointer leading-snug">
                Concordo em ser contatado pela Vortex Viagens para receber a cotação solicitada.
              </label>
            </div>
            {errors.consent && <p className="text-xs text-destructive font-montserrat -mt-4">{errors.consent}</p>}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full inline-flex items-center justify-center gap-3 bg-foreground text-primary-foreground font-montserrat text-sm tracking-wider uppercase px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300"
            >
              <Send size={16} />
              Solicitar Cotação
            </button>

            <p className="font-montserrat text-[11px] text-muted-foreground text-center">
              Planejamento personalizado com curadoria humana. Sem buscas automáticas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPlanner;
