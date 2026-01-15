import { defineCollection, z } from 'astro:content';

const productos = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    titulo: z.string().optional(),
    nombre: z.string(),
    descripcion: z.string().optional(),
    resumen: z.string(),
    imagen: z.string(),
    destacado: z.boolean(),
    orden: z.number().optional(),
    
    // AGREGA ESTA LÍNEA PARA EL PDF
    pdf: z.string().optional(),

    // Estructura nueva (NPK, etc)
    fichaTecnica: z.object({
      presentacion: z.string().optional(),
      composicion: z.array(z.object({ ingrediente: z.string() })).optional(),
      analisisGarantizado: z.record(z.string()).optional(),
      beneficios: z.array(z.string()).optional(),
      aplicacion: z.string().optional(),
      cultivos: z.array(z.string()).optional(),
      certificaciones: z.array(z.string()).optional(),
    }).optional(),

    // Compatibilidad antigua
    ficha_tecnica: z.string().optional(), 
    composicion: z.array(z.string()).optional(),
    aplicacion: z.string().optional(),
    beneficios: z.array(z.string()).optional(),
  }),
});

export const collections = { productos };