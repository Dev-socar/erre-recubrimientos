import { type ListItemContact } from "@/types/ListItemContact";
import FacebokIcon from "@/assets/icons/facebook.svg";
import LocationIcon from "@/assets/icons/location.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import EmailIcon from "@/assets/icons/email.svg";
export const ItemsContact: ListItemContact[] = [
  {
    icono: PhoneIcon,
    title: "Teléfono",
    text: "+52 999 649 8926",
    url: "tel:+529996498926",
  },
  {
    icono: EmailIcon,
    title: "Correo Electrónico",
    text: "errerecubrimientos@gmail.com",
    url: "mailto:errerecubrimientos@gmail.com",
  },
  {
    icono: LocationIcon,
    title: "Dirección",
    text: "C. 12, Morelos Oriente, 97174 Mérida, Yuc.",
    url: "https://maps.app.goo.gl/JuWxSXeAmHwWQNb98",
  },
  {
    icono: FacebokIcon,
    title: "Facebook",
    text: "ERRE Recubrimientos",
    url: "https://www.facebook.com/errerecubrimientos",
  },
];
