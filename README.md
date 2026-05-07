# Walter & Selina ❤️

A love timer counting every moment since June 15, 2015 — redesigned in **Apple DESIGN.md** style.

**Live site:** [https://meetwk.site](https://meetwk.site)

## About

This page celebrates the love story of Walter and Selina, counting every day, hour, minute, and second since June 15, 2015. Click the quote to cycle through love quotes; anniversary days trigger confetti and heart particles.

## Design

Inspired by [Apple's DESIGN.md](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/apple/DESIGN.md) (Google Stitch format):

- **Canvas:** Pure white (#ffffff) + parchment (#f5f5f7) surfaces
- **Typography:** SF Pro Display (headings) + SF Pro Text (body) with negative letter-spacing
- **Accent:** Single Action Blue (#0066cc) — Apple's one-interactive-color philosophy
- **Frosted glass:** Timer card with `backdrop-filter: blur(20px) saturate(180%)`
- **No UI shadows:** Only the avatar (treated as product photo) casts a shadow
- **Design tokens:** All colors, spacing, radius values driven by CSS custom properties mapped from Apple's DESIGN.md

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JavaScript
- No build step or dependencies
- Hosted on GitHub Pages

## Project Structure

```
.
├── index.html              # Main love timer page (Apple DESIGN.md style)
├── assets/
│   ├── css/
│   │   └── love-timer.css   # Apple token-driven styles (444 lines)
│   ├── js/
│   │   └── love-timer.js    # Timer & quote logic (283 lines)
│   └── img/
│       └── logo.png         # Couple avatar
├── CNAME                   # meetwk.site
└── README.md
```

## Development

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

## License

Private & personal. All rights reserved.

---

*Built with ❤️, DESIGN.md, and [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)*
