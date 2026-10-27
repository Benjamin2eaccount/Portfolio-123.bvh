# Portfolio – Benjamin van Hemert

Persoonlijke portfoliowebsite van Benjamin van Hemert, student Software Developer bij SintLucas.

**Live:** https://benjamin2eaccount.github.io/Portfolio-123.bvh/

## Wat staat erop

- **Home** – introductie, skills, werk en opleiding, uitgelichte projecten
- **Projecten** – overzicht van klant-, eigen en schoolprojecten met screenshots
- **Diensten** – websites voor lokale ondernemers, met vaste prijzen
- **Contact** – formulier, e-mail, WhatsApp en GitHub

De site is tweetalig: Engels in de root, Nederlands in [`/nl/`](nl/).

## Techniek

- HTML, CSS en JavaScript, zonder framework of build-stap
- Responsive met een hamburgermenu op mobiel
- Scroll-animaties met `IntersectionObserver`, uitgeschakeld bij `prefers-reduced-motion`
- Gehost via GitHub Pages

## Structuur

```
index.html, projects.html, services.html, contact.html   Engelse pagina's
nl/                                                       Nederlandse pagina's
en/                                                       Doorverwijzingen van oude /en/-links
style.css, script.js                                      Opmaak en interactie
Photos/                                                   Screenshots en afbeeldingen
```

## Lokaal draaien

Open `index.html` in de browser, of start een simpele server in de projectmap:

```
npx serve .
```
