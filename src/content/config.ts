import { defineCollection, z } from 'astro:content';

const productos = defineCollection({
  // `image()` valida que el archivo exista y deja que Astro lo optimice.
  // Si alguien escribe una ruta mal, el build falla con un mensaje claro
  // en vez de publicar una imagen rota.
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      nombre: z.string(),
      descripcion: z.string(),
      resumen: z.string(),
      /** Ruta relativa a este archivo .md, p. ej. ../../assets/images/isla-max.webp */
      imagen: image(),
      pdf: z.string().optional(),
      destacado: z.boolean().default(false),
      orden: z.number().default(99),

      fichaTecnica: z
        .object({
          presentacion: z.string().optional(),
          composicion: z.array(z.object({ ingrediente: z.string() })).optional(),
          analisisGarantizado: z.record(z.string()).optional(),
          beneficios: z.array(z.string()).optional(),
          aplicacion: z.string().optional(),
          cultivos: z.array(z.string()).optional(),
          certificaciones: z.array(z.string()).optional(),
        })
        .optional(),
    }),
});

export const collections = { productos };
