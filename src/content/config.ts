import { defineCollection, z } from 'astro:content';

const productos = defineCollection({
  schema: z.object({
    nombre: z.string(),
    resumen: z.string(),
    imagen: z.string(),
    destacado: z.boolean().default(false),
    
    // Agregamos esto para solucionar el error "Property categoria does not exist"
    categoria: z.string().optional(),
    
    // Tus nuevos campos técnicos
    ficha_tecnica: z.string().optional(),
    composicion: z.array(z.string()).optional(),
    aplicacion: z.string().optional(),
    beneficios: z.array(z.string()).optional(),
  }),
});

export const collections = { productos };