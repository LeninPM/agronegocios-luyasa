# Agronegocios Luyasa Perú SAC — Sitio web

Sitio institucional y catálogo de productos, hecho con [Astro](https://astro.build).
Es un sitio **100% estático**: no hay servidor, ni base de datos, ni login.
Astro genera archivos HTML durante el build y Netlify los sirve tal cual.

- **Producción:** https://agronegociosluyasa.pe
- **Hosting:** Netlify (plan gratuito, deploy automático al hacer push a `main`)

---

## Comandos

| Comando           | Qué hace                                                   |
| :---------------- | :--------------------------------------------------------- |
| `npm install`     | Instala las dependencias (solo la primera vez)              |
| `npm run dev`     | Levanta el sitio en http://localhost:4321 para desarrollar  |
| `npm run build`   | Genera el sitio final en `./dist/`                          |
| `npm run preview` | Muestra el resultado del build antes de publicarlo          |
| `npm run check`   | Revisa errores de tipos y de plantillas                     |
| `npm run img`     | Comprime las fotos de `public/images/` (ver abajo)          |

---

## Cómo cambiar cosas

### Teléfono, correo, dirección o redes sociales

Todo está en **[`src/consts.ts`](src/consts.ts)**. Se edita ahí y cambia en
todo el sitio de una sola vez. No hay que buscar el número en cada archivo.

### Agregar o editar un producto

Cada producto es un archivo `.md` en **`src/content/productos/`**.
Para agregar uno nuevo, se copia un `.md` existente y se cambian los datos.

```yaml
---
titulo: "Nombre corto"                              # el que se ve en las tarjetas
nombre: "Nombre completo - Para qué sirve"          # el título de la ficha
descripcion: "Una línea que resume el producto."    # se ve en la home
resumen: "El texto destacado de la ficha técnica."
imagen: "../../assets/images/mi-producto.webp"      # ruta relativa a este .md
pdf: "/docs/FICHA_TECNICA_MI_PRODUCTO.pdf"          # opcional
destacado: true                                     # muestra la etiqueta "Top Ventas"
orden: 4                                            # posición en el catálogo
---
```

Dos cosas importantes:

1. **La imagen va en `src/assets/images/`**, no en `public/images/`. Ahí Astro
   la optimiza sola (la comprime y genera versiones para móvil).
2. Si la ruta de la imagen está mal escrita, **el build falla con un mensaje
   claro** en vez de publicar una imagen rota. Eso es a propósito.

La página del producto (`/productos/mi-producto`) se crea sola a partir del
nombre del archivo. No hay que tocar ningún otro archivo.

### Cambiar una foto de fondo o del "Nosotros"

Esas viven en `public/images/`. Después de reemplazar una foto, conviene correr:

```bash
npm run img
```

Comprime todo lo que esté en `public/images/` sin cambiar los nombres de archivo
(reduce el lado más largo a 1920px y baja el peso). Es seguro correrlo varias
veces: si una imagen ya está optimizada, la deja como está.

---

## Formulario de contacto

El formulario de `/contacto` hace dos cosas al enviarse:

1. **Abre WhatsApp** con el mensaje ya armado (es el canal principal).
2. **Guarda el envío en Netlify Forms**, como respaldo por si el WhatsApp no
   se llega a enviar o nadie lo ve.

Los envíos se leen en el panel de Netlify → **Forms** → `cotizaciones`.
Para que lleguen por correo hay que activarlo una vez en
*Forms → Settings → Form notifications*.

El plan gratuito de Netlify incluye un tope mensual de envíos; si algún mes se
llena, el formulario sigue abriendo WhatsApp igual — solo se deja de guardar la
copia de respaldo.

---

## Seguridad

Las cabeceras de seguridad (CSP, anti-clickjacking, `nosniff`, HSTS) están en
**[`public/_headers`](public/_headers)**. Netlify lee ese archivo solo.

> ⚠️ Si se agrega un servicio externo nuevo (un chat, un píxel de Facebook, otro
> proveedor de video), hay que añadir su dominio a la CSP de ese archivo o el
> navegador lo va a bloquear en silencio.

---

## Al comprar el dominio propio

Hay que cambiar **una sola línea**: el campo `site` en
[`astro.config.mjs`](astro.config.mjs). De eso dependen las previews al
compartir el link por WhatsApp/Facebook, la URL canónica y el `sitemap.xml`.

También conviene actualizar la URL del `Sitemap:` en
[`public/robots.txt`](public/robots.txt).
