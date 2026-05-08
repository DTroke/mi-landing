# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static personal landing page in pure HTML/CSS/JS -- no build step, no dependencies, no framework.

## Development

Open the site locally:
```
open index.html
```

Deploy (push to main triggers GitHub Pages automatically):
```
git push origin main
```

Live URL: https://dtroke.github.io/mi-landing/

## Architecture

Three files, each with a single responsibility:

- **`index.html`** -- all markup and content. Sections in order: nav, hero, servicios (3 cards), proyectos (3 placeholder cards), contacto (copy + form), footer.
- **`styles.css`** -- design tokens at `:root`, then sections in the same order as the HTML. Uses CSS custom properties for the dark theme (`--bg-0` through `--bg-3`, `--accent`, `--accent-2`). No class-based JS toggling except `.scrolled`, `.open`, `.reveal`, and `.visible`.
- **`main.js`** -- three self-contained blocks: nav scroll shadow + mobile burger, IntersectionObserver scroll reveal, and contact form validation with simulated submit.

## Key conventions

- Content is in Spanish; code (variables, comments) is in English.
- All colors and spacing go through CSS custom properties in `:root` -- never hardcode hex values inline.
- The contact form submit is currently simulated with `setTimeout`. To wire a real backend, replace that block in `main.js` (marked with a comment) with a `fetch` to Formspree or equivalent.
- Placeholders to fill in: `Tu Nombre`, `TN` (logo initials), `tu@email.com`, LinkedIn/GitHub URLs, and the three project cards.
