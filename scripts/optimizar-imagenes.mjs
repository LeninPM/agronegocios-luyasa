import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const DIR = 'public/images';
const kb = (n) => (n / 1024).toFixed(0).padStart(6) + ' KB';

let antes = 0;
let despues = 0;
const filas = [];

// Recorre DIR y todas sus subcarpetas (p. ej. public/images/clientes/).
async function listarImagenes(dir) {
  const entradas = await fs.readdir(dir, { withFileTypes: true });
  const archivos = [];
  for (const e of entradas.sort((a, b) => a.name.localeCompare(b.name))) {
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) archivos.push(...(await listarImagenes(ruta)));
    else if (['.png', '.jpg', '.jpeg'].includes(path.extname(e.name).toLowerCase())) {
      archivos.push(ruta);
    }
  }
  return archivos;
}

for (const ruta of await listarImagenes(DIR)) {
  const nombre = path.basename(ruta);
  const ext = path.extname(nombre).toLowerCase();

  const original = (await fs.stat(ruta)).size;
  const buf = await fs.readFile(ruta);
  const meta = await sharp(buf).metadata();

  // Los logos de certificación se muestran a 48px de alto: 600px sobra.
  // El resto son fondos a ancho completo: 1920px es más que suficiente.
  const ladoMax = nombre.startsWith('certificado') ? 600 : 1920;

  // `fit: inside` limita el lado MÁS LARGO. Sin esto, una foto vertical de
  // 3072x4080 se quedaba en 1920x2550, que sigue siendo enorme.
  let pipe = sharp(buf).rotate();
  if (Math.max(meta.width, meta.height) > ladoMax) {
    pipe = pipe.resize({
      width: ladoMax,
      height: ladoMax,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  pipe =
    ext === '.png'
      ? pipe.png({ compressionLevel: 9, palette: true, quality: 85 })
      : pipe.jpeg({ quality: 80, mozjpeg: true, progressive: true });

  const salida = await pipe.toBuffer();

  antes += original;
  // Solo reescribe si el ahorro es real (>3%). Así, correr el script varias
  // veces no vuelve a re-comprimir imágenes ya optimizadas (cada re-encode
  // JPEG degrada un poco la calidad).
  if (salida.length < original * 0.97) {
    await fs.writeFile(ruta, salida);
    despues += salida.length;
    filas.push(
      `${nombre.padEnd(30)} ${kb(original)} -> ${kb(salida.length)}  ` +
        `(-${(100 - (salida.length / original) * 100).toFixed(0)}%)  ` +
        `${meta.width}x${meta.height}`
    );
  } else {
    despues += original;
    filas.push(`${nombre.padEnd(30)} ${kb(original)}  (ya estaba optimizada)`);
  }
}

console.log(filas.join('\n'));
console.log('\n' + '-'.repeat(70));
console.log(`TOTAL  ${kb(antes)}  ->  ${kb(despues)}   ` +
  `(-${(100 - (despues / antes) * 100).toFixed(0)}%)`);
