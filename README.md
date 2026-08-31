# Daiserna

Portafolio de Daniel Serna, 3D artist. Sitio estatico servido por GitHub Pages en https://www.daiserna.com

## Estructura

```
index.html          Home: hero, statement, work, process, about + como trabajo, contacto
404.html            Pagina de error con la marca
style.css           Estilos de todo el sitio (home, proyecto y 404)
script.js           Reveal al scroll, carrusel del hero, carga de video bajo demanda
work/*.html         Una pagina por proyecto (7)
img/                Imagenes a resolucion completa
img/800/            Variantes de 800px para movil (srcset)
video/              Clips MP4
favicon.svg         Monograma DS
robots.txt          
sitemap.xml         Actualizar la fecha lastmod al publicar cambios grandes
CNAME               Dominio personalizado
```

## Notas de mantenimiento

- **Videos**: todos van con `preload="none"` y `data-src` en vez de `src`. `script.js` les asigna el src y les da play cuando entran en pantalla. Si agregas un video nuevo, usa `data-src`, no `src`, o se descargara siempre.
- **Imagenes**: cada imagen del home lleva `srcset` con la variante de `img/800/`. Al agregar una nueva, genera tambien la version de 800px.
- **Reveal**: el contenido es visible por defecto. `script.js` agrega la clase `js-reveal` al `<html>` y esa clase es la que activa la animacion. No pongas `opacity:0` directo en el CSS.
- **Anio del footer**: se escribe solo con `<span data-year>`. No lo escribas a mano.
- **Proceso en About**: son solo los 4 pasos, sin tiempos ni condiciones. Rondas, entregables, duracion y que se necesita para arrancar cambian segun el tipo de proyecto (archviz, producto, cine), asi que van en la cotizacion y no en la web.
- **Agregar videos de proceso**: el grid `.reel-grid` es de 2 columnas con 760px de ancho maximo, asi que 4 videos verticales quedan en 2x2 sin tocar nada. Copia un bloque `.reel-slot` completo, usa `data-src` (no `src`) y genera un poster nuevo. Saca el poster de un frame del render final, no del frame 0, o se ve la interfaz de Blender vacia:
  `ffmpeg -ss 14 -i video/TU-VIDEO.mp4 -frames:v 1 poster.png`
- **Cadena de proyectos**: las paginas de `work/` estan encadenadas en anillo. Si agregas o quitas una, actualiza los enlaces prev/next de las vecinas y el `sitemap.xml`.
- **Enlaces sociales**: hay bloques comentados para ArtStation, Behance y LinkedIn en `index.html`. Al descomentarlos, agrega tambien la URL al array `sameAs` del JSON-LD.

## Estructura de una pagina de proyecto

Cada `work/*.html` puede llevar, despues de `.p-meta`:

```html
<div class="p-case reveal">
  <div>
    <div class="k">The problem</div>
    <p>La restriccion real que hizo el proyecto no trivial. 2 o 3 frases.</p>
  </div>
  <div>
    <div class="k">What I built</div>
    <p>Que modelaste, simulaste o resolviste tu. 2 o 3 frases.</p>
  </div>
</div>
<div class="p-credits reveal">
  <b>Art direction</b> Nombre &nbsp;·&nbsp; <b>Visualization</b> Daniel Serna
</div>
```

Hoy solo Honda lo tiene. Los otros seis siguen con la descripcion generica original.

Regla de honestidad para los textos: si hiciste la visualizacion y no el diseño, el texto no puede decir "designed as" ni "designed to". Se escribe desde el encargo y desde lo que las imagenes tenian que resolver. Los creditos van en `.p-credits`.

`.p-meta` usa `auto-fit`, asi que acepta 4, 6 u 8 datos sin dejar huecos.

## Cuidado con los selectores de elemento

El menu del header usa `.site-nav`, NO `nav`. Motivo: la navegacion prev/next
de las paginas de proyecto tambien es un `<nav>`, y con una regla de elemento
`nav{position:fixed; top:0; z-index:100}` la heredaba, se pegaba arriba, tapaba
el menu real e interceptaba todos los clics de la pagina.

Si agregas estilos de layout, usa clases. Un selector de elemento sobre `nav`,
`section`, `main` o `footer` va a alcanzar cosas que no esperas.
