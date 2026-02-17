import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/554835000975?text=Ol%C3%A1%2C%20gostaria%20de%20planejar%20minha%20pr%C3%B3xima%20viagem%20com%20a%20Vortex%20Viagens.";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,45%)] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-subtle"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppButton;
