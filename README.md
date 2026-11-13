# web-personal

Web de docente/formador hecha con [Astro](https://astro.build), animaciones [GSAP](https://gsap.com) y scroll suave con [Lenis](https://lenis.darkroom.engineering). Paleta negro · marfil · dorado.

Publicada en **https://iessimarrocicles.github.io/web-personal/**. Cada push a `main` se despliega solo con GitHub Actions (`.github/workflows/deploy.yml`).

## Editar contenido

- Textos, cursos, testimonios, cifras y recursos: `src/data/content.ts`
- Imágenes: `src/assets/images/` (cambia la ruta del import en `content.ts`)
- Colores y tipografías: `src/styles/global.css`
- Animaciones: `src/scripts/animations.ts` e `interactions.ts`

## Comandos

| Comando           | Acción                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Instala dependencias                            |
| `npm run dev`     | Servidor local en `localhost:4321/web-personal` |
| `npm run build`   | Genera la web en `./dist/`                      |
| `npm run preview` | Previsualiza el build                           |
