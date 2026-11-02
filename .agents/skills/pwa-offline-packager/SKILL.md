---
name: pwa-offline-packager
description: >-
  Estrategia y receta de empaquetado PWA 100% offline para Astro 5 y Svelte 5 en entornos educativos sin conectividad.
---

# Skill: Empaquetador PWA 100% Offline para Ámbitos Educativos

## Propósito
Guiar la transformación de la aplicación de geometría construida en Astro 5 y Svelte 5 en una Progressive Web App (PWA) instalable y operativa al 100% sin conexión a internet, indispensable para aulas y escuelas con conectividad limitada o nula.

---

## 1. Requisitos para Operatividad Offline
Para que la app funcione sin internet:
1. **Recursos 100% Locales:** Ninguna fuente, hoja de estilos o script debe depender de CDNs externas (por ejemplo, KaTeX debe usar fuentes y CSS locales empaquetados en el bundle o en `/public`).
2. **Service Worker Eficiente:** Debe precachear o interceptar dinámicamente:
   - Rutas HTML principales (`/`, `/clasificacion`, `/posiciones-relativas`, `/entre-paralelas`, `/ecuaciones`, `/examen`).
   - Assets estáticos de Astro (`/_astro/*`).
   - Iconos, favicon y fuentes tipográficas.
3. **Web App Manifest:** Metadatos claros para instalación en Android, ChromeOS, Windows y iOS.

---

## 2. Estructura del Manifiesto (`public/manifest.webmanifest`)

```json
{
  "name": "Geometría 2° Año - Ángulos y Ecuaciones",
  "short_name": "Ángulos 2°",
  "description": "Herramienta interactiva para el aprendizaje de ángulos en 2° año de secundaria.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

---

## 3. Estrategia del Service Worker (`public/sw.js`)

Se recomienda un Service Worker ligero enfocado en aplicaciones educativas estáticas:
- **`install`:** Precachear el shell de la aplicación (páginas clave y manifest).
- **`activate`:** Limpiar caches de versiones anteriores ante actualizaciones.
- **`fetch`:**
  - **Assets estáticos (`/_astro/*`, imágenes, fuentes):** *Cache-First* con caída a red.
  - **Páginas HTML:** *Network-First* con caída inmediata al cache local si no hay conexión.

```javascript
const CACHE_NAME = 'angulos-offline-v1';
const PRECACHE_ASSETS = [
  '/',
  '/clasificacion',
  '/posiciones-relativas',
  '/entre-paralelas',
  '/ecuaciones',
  '/examen',
  '/manifest.webmanifest',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
      );
    })
  );
});
```

---

## 4. Registro en el Layout de Astro (`Layout.astro`)

Registrar el service worker de forma asíncrona sin retrasar la carga del primer frame (FCP):

```astro
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#2563eb" />

<script is:inline>
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('SW registration failed:', err);
      });
    });
  }
</script>
```

---

## 5. Botón de Instalación Opcional (`InstallPwaButton.svelte`)

Capturar el evento del navegador `beforeinstallprompt` para ofrecer un botón intuitivo y accesible:
- Escuchar `window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; showInstall = true; })`.
- Al hacer click: `deferredPrompt.prompt()`.
- Ocultar el botón si ya está instalada la PWA (`display-mode: standalone`).

---

## 6. Verificación de Funcionamiento Offline
1. Ejecutar `npm run build` y previsualizar con `npm run preview`.
2. Abrir DevTools -> pestaña **Application** -> comprobar registro del Service Worker y Manifest.
3. Cambiar la pestaña **Network** a `Offline`.
4. Recargar todas las páginas (`/`, `/clasificacion`, `/ecuaciones`, `/examen`) y comprobar navegación y renderizado matemático fluido sin alertas ni fallos.

