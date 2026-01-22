# The First Life

**Freeing the Mind in the Age of AI**

A philosophy of cognitive partnership with AI — how to use technology for presence rather than productivity.

## Read Online

Open `index.html` in your browser, or visit the GitHub Pages site (once enabled).

## Features

- **Elegant typography** — Tufte-inspired design with EB Garamond font
- **Adjustable font size** — Four size options with persistent preferences
- **Table of contents** — Slide-out navigation menu accessible from any page
- **Dark mode** — Automatic support via `prefers-color-scheme`
- **Reading progress** — Visual indicator at the top of each page
- **Responsive design** — Works on mobile, tablet, and desktop
- **Print-friendly** — Optimized styles for PDF generation

## Book Structure

| Part | Title | Chapters |
|------|-------|----------|
| Front Matter | — | Note on Process, Preface, Introduction |
| I | The Question | 1. The Mismatch, 2. The Dream |
| II | The Philosophy | 3. The Purpose, 4. The Three Freedoms, 5. The Peril, 6. The Synthesis |
| III | The Global Context | 7. The Burden, 8. The Paradox, 9. The Limits |
| IV | The Architecture | 10. How It Works, 11. Training Your Partner, 12. The Memory Problem |
| V | The Applications | 13. Economic Agency, 14. Education, 15. Legacy |
| VI | The Principles | 16. For Individuals, 17. For Builders, 18. For Society |
| VII | The Vision | 19. The Unburdened Life, 20. The Invitation |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + =` | Increase font size |
| `Ctrl/Cmd + -` | Decrease font size |
| `Escape` | Close table of contents |

## Local Development

```bash
# Serve locally
python3 -m http.server 8000

# Open http://localhost:8000
```

## Building from Markdown

```bash
pip install markdown
python build.py
```

## File Structure

```
the-first-life/
├── index.html              # Title page and table of contents
├── css/
│   └── book.css            # Main stylesheet
├── js/
│   └── reader.js           # Font size & TOC controls
├── chapters/
│   ├── 00-front-matter.html
│   ├── 01-part-i.html
│   ├── 02-part-ii.html
│   ├── 03-part-iii.html
│   ├── 04-part-iv.html
│   ├── 05-part-v.html
│   ├── 06-part-vi.html
│   ├── 07-part-vii.html
│   └── 08-vignettes.html
├── build.py                # Generate HTML from markdown
└── README.md
```

## Credits

- Typography: Inspired by [Tufte CSS](https://edwardtufte.github.io/tufte-css/)
- Font: [EB Garamond](https://fonts.google.com/specimen/EB+Garamond) by Georg Duffner

## License

All rights reserved.
