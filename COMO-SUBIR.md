# Cómo subir esto a GitHub

El zip trae el sitio completo, listo para reemplazar lo que hay en `bydaiserna/Daiserna`.

## Opción A: por la web de GitHub (sin comandos)

1. Descomprime el zip.
2. Entra a https://github.com/bydaiserna/Daiserna
3. **Borra primero estos dos archivos** (ya no existen, quedaron reemplazados por versiones .webp):
   - `img/gate08-reel-poster.jpg`
   - `img/honda-reel-poster.jpg`
   Se borran entrando al archivo, botón de los tres puntos, "Delete file", y confirmando el commit.
4. Arrastra **todo el contenido** de la carpeta descomprimida a la página del repo (no la carpeta, su contenido).
5. GitHub te va a decir que hay archivos que se sobrescriben. Confirma.
6. Escribe un mensaje de commit, por ejemplo `Accesibilidad, rendimiento, SEO y reestructura`, y dale "Commit changes".
7. En 1 o 2 minutos GitHub Pages republica daiserna.com.

## Opción B: por terminal

```bash
git clone https://github.com/bydaiserna/Daiserna.git
cd Daiserna
git rm img/gate08-reel-poster.jpg img/honda-reel-poster.jpg
# copia aquí el contenido del zip, sobrescribiendo
cp -R /ruta/al/zip/descomprimido/. .
git add -A
git commit -m "Accesibilidad, rendimiento, SEO y reestructura"
git push
```

## Después de subir

1. **Revisa la vista previa del enlace.** Pega `https://www.daiserna.com` en https://www.opengraph.xyz o mándate el link por WhatsApp a ti mismo. Debe salir el render de Ravoo con tu nombre.
2. **Vuelve a subir el video de G-08** cuando tengas el nuevo. Va en `video/gate08-hero.mp4` y `video/gate08-reel.mp4`. Comprímelo antes: los actuales van a 1280px de ancho con CRF 28 en H.264.
3. Si en algún momento abres ArtStation, Behance o LinkedIn, en `index.html` hay tres líneas comentadas listas en el bloque de contacto. Descoméntalas y agrega también la URL al array `sameAs` del JSON-LD de arriba.

## Si algo se ve raro

Haz un hard refresh (Ctrl+Shift+R, o Cmd+Shift+R en Mac). El CSS y el JS viejos pueden quedar en caché.
