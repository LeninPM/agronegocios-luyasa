import { defineCollection, z } from 'astro:content';

const productos = defineCollection({
	type: 'content',
	schema: z.object({
		nombre: z.string(),
		peso: z.string(),
		categoria: z.string(),
		imagen: z.string(),
		pdfUrl: z.string().optional(),
		cultivos: z.array(z.string()),
		resumen: z.string(),
		// Datos técnicos específicos del rubro agrícola
		npk: z.object({
			n: z.string(),
			p: z.string(),
			k: z.string(),
		}).optional(),
		materiaOrganica: z.string().optional(),
	}),
});

export const collections = { productos };