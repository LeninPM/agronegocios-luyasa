/**
 * Datos de la empresa en un solo lugar.
 * Si cambia el teléfono, el correo o una red social, se edita AQUÍ y nada más.
 */

/** Teléfono en formato internacional sin "+" ni espacios (el que exige wa.me). */
export const WHATSAPP_NUMERO = '51941234592';

/** El mismo teléfono, formateado para mostrarlo en pantalla. */
export const TELEFONO_VISIBLE = '+51 941 234 592';

export const EMAIL = 'agronegociosluyasaperu.sac@gmail.com';

export const EMPRESA = {
  nombre: 'Agronegocios Luyasa Perú SAC',
  nombreCorto: 'Agronegocios Luyasa',
  fundacion: 2016,
  representante: 'Samy López Carbajal',
};

export const DIRECCION = {
  calle: 'Av. La Capitana',
  distrito: 'Huachipa',
  ciudad: 'Lima',
  pais: 'Perú',
  /** Cómo se muestra en la web. */
  completa: 'Av. La Capitana, Huachipa, Lima - Perú',
  horario: 'Lunes a Sábado: 8am - 6pm',
};

/**
 * Embed de Google Maps sin API key.
 * Si algún día quieren el pin exacto (número de puerta), se reemplaza esta URL
 * por la que genera "Compartir > Insertar un mapa" en Google Maps.
 */
export const MAPA_EMBED_URL =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent('Av. La Capitana, Huachipa, Lima, Perú') +
  '&z=15&output=embed';

export const REDES = {
  facebook: 'https://www.facebook.com/share/17qDhfq5jm/',
  tiktok: 'https://www.tiktok.com/@agronegocios.luya',
  instagram: 'https://www.instagram.com/agronegocios_luyasa',
};

/** Descripción por defecto para SEO / previews de WhatsApp y Facebook. */
export const DESCRIPCION_DEFECTO =
  'Agronegocios Luyasa | Expertos en Guano de Isla y abonos orgánicos de alta ' +
  'concentración para el agro peruano. Envíos a todo el Perú y Bolivia.';

/**
 * Arma un link de WhatsApp con mensaje precargado.
 * Codifica el texto siempre, así un "&" o un "#" del usuario no rompe la URL.
 */
export function linkWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
