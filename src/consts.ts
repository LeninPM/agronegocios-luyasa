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
  /** Razón social exacta según SUNAT. */
  razonSocial: 'Agro Negocios Luyasa Perú S.A.C.',
  ruc: '20612719005',
  fundacion: 2016,
  representante: 'Samy López Carbajal',
};

export const DIRECCION = {
  /** La planta está en Huachipa, dentro del distrito de Lurigancho-Chosica. */
  zona: 'Huachipa',
  distrito: 'Lurigancho-Chosica',
  ciudad: 'Lima',
  pais: 'Perú',
  /** Versión corta (footer). */
  corta: 'Huachipa, Lurigancho-Chosica',
  /** Cómo se muestra en la web (página de contacto). */
  completa: 'Huachipa, Lurigancho-Chosica, Lima - Perú',
  horario: 'Lunes a Sábado: 8am - 6pm',
};

/**
 * Embed de Google Maps sin API key. Apunta a la ficha del negocio en Google
 * Maps (Agronegocios Luyasa Perú SAC), por lo que muestra el pin real de la planta.
 */
export const MAPA_EMBED_URL =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent('Agronegocios Luyasa Perú SAC, Lurigancho-Chosica, Lima') +
  '&z=16&output=embed';

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
