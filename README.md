# tongaizinaka.co.zw

Personal portfolio site for Tongai Zinaka — Data & Business Intelligence Analyst.

## Structure

- `index.html` — Home (hero, about, project showcase carousel)
- `analytics.html` — Zinaka Analytics app walkthrough
- `resume.html` — Résumé (embeds `/assets/My Resume.pdf`)
- `contact.html` — Contact links
- `css/style.css` — All site styles (color tokens defined at the top in `:root`)
- `js/main.js` — All site behavior (nav, reveal animations, hero chart cycle, project carousel, lightbox)
- `img/` — Screenshots and app GIFs
- `assets/My Resume.pdf` — Downloadable résumé

## Editing colors

All colors are CSS custom properties defined at the top of `css/style.css`:

```css
--ink       /* page background */
--panel     /* card/panel background */
--slate     /* body text */
--signal    /* gold accent (CTAs, highlights) */
--teal      /* teal accent (links, secondary highlights) */
```

Change these once and the whole site updates.

## Deploying

This is a static site served via GitHub Pages from the `main` branch, using the
custom domain in `CNAME` (tongaizinaka.co.zw).
