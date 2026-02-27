import type { SvgComponent } from "astro/types";

export type ListItemContact = {
  icono: SvgComponent | ImageMetadata;
  title: string;
  text: string;
  url?: string;
};
