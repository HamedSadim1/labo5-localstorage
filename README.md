# DadJokes 🎭

Een moderne, interactieve webapplicatie voor het genieten van dad jokes. Haal verse woordspelingen op van de [icanhazdadjoke](https://icanhazdadjoke.com) API en laat ze beoordelen door de Groan-o-Meter — met een strak glasmorfisme UI-design, dark mode en een eigen favorietenlijst.

## ✨ Features

- **🎯 Random Dad Jokes**: haal verse dad jokes op van de icanhazdadjoke API
- **📊 Groan-o-Meter**: elke joke wordt bij aankomst beoordeeld met een score en label (Smirk / Mild chuckle / Full eye-roll)
- **❤️ Favorieten**: sla jokes op in `localStorage` (max. 100), met highlight, copy-knop en verwijder-opties
- **🌙 Dark Mode**: respecteert je systeemvoorkeur en onthoudt een handmatige keuze
- **💀 Skeleton loading**: mooie shimmer-placeholders i.p.v. een kale "Loading" — de layout verschuift niet
- **⚠️ Robust error handling**: request-timeout, offline-detectie, rate-limit-melding en een error boundary
- **📋 Copy-to-clipboard**: kopieer een joke met één klik, inclusief ✓/✕ feedback
- **💎 Glasmorfisme UI**: transparante, geblurde kaarten met micro-interacties
- **♿ Toegankelijkheid**: skip-link, keyboard focus-ringen, semantische `role="meter"`/`role="status"`, 44px touch-targets en `prefers-reduced-motion`-ondersteuning
- **📱 Responsive**: werkt op desktop, tablet en mobiel
- **🔌 PWA-ready**: manifest met correcte thema-kleuren en iconen

## 🛠️ Tech Stack

- **Framework**: React 19
- **Taal**: TypeScript 5.9 (volledig getypeerd, geen `any`)
- **Build tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **Classnames**: `clsx` + `tailwind-merge` (via de `cn()` utility)
- **HTTP**: axios (met timeout en request-cancellation)
- **State**: React Hooks + `localStorage`
- **Code quality**: ESLint (type-aware) + Husky + lint-staged + GitHub Actions

## 🚀 Installatie

1. **Clone de repository**

   ```bash
   git clone https://github.com/HamedSadim1/labo5-localstorage.git
   cd labo5-localstorage
   ```

2. **Installeer dependencies**

   ```bash
   npm install
   ```

3. **Start de ontwikkelserver**

   ```bash
   npm run dev
   ```

4. **Open je browser**

   ```text
   http://localhost:5173
   ```

## 📖 Gebruik

- **Nieuwe joke laden**: klik op "New Joke"
- **Favoriet maken**: klik op "Favorite" om de huidige joke op te slaan
- **Joke kopiëren**: klik op de copy-knop om de tekst naar het klembord te kopiëren
- **Favorieten beheren**: bekijk, kopieer en verwijder opgeslagen jokes in de favorietenlijst
- **Thema wisselen**: gebruik de sun/moon toggle in de header

## 📜 Scripts

| Script | Beschrijving |
| --- | --- |
| `npm run dev` | Start de ontwikkelserver |
| `npm run build` | Bouw voor productie |
| `npm run preview` | Preview van de productie-build |
| `npm run lint` | ESLint (type-aware, inclusief `any`-verbod) |
| `npm run typecheck` | TypeScript typecheck zonder emit |
| `npm run prepare` | Initialiseert de Husky git-hooks |

## 🏗️ Project Structuur

```text
src/
├── components/            # UI-componenten
│   ├── Button.tsx         # Herbruikbare knop (variant + size)
│   ├── Card.tsx           # Gedeelde card-shell + PANEL_CLASSES
│   ├── CopyButton.tsx     # Copy-knop met ✓/✕ feedback
│   ├── DadJoke.tsx        # Hoofdcontainer (compositie-laag)
│   ├── ErrorBoundary.tsx  # Vangnet tegen crashes
│   ├── FavoritesList.tsx  # Favorieten beheer
│   ├── Footer.tsx         # Footer
│   ├── GroanMeter.tsx     # Groan-o-Meter (score + label)
│   ├── Header.tsx         # Header met dark-mode toggle
│   ├── icons.tsx          # SVG-iconen (SSOT, geen emoji)
│   ├── JokeCard.tsx       # Joke-display
│   ├── Skeleton.tsx       # Shimmer skeleton-placeholders
│   ├── StatusBadge.tsx    # Status-pill (loading/error/live)
│   └── Toast.tsx          # Toast-notificatie
├── hooks/                 # Custom hooks
│   ├── useCopy.ts         # Copy-state-machine
│   ├── useDarkMode.ts     # Dark-mode logica
│   ├── useFavorites.ts    # Favorieten state
│   ├── useJoke.ts         # Joke-fetch (abort + errors)
│   ├── useNotice.ts       # Toast-logica
│   ├── usePersistedState.ts # Generiek localStorage-persisted state
│   └── useTimeout.ts      # Herbruikbare transient timer
├── services/
│   └── JokesData.ts       # Joke-type + getJokeText (SSOT)
├── utils/                 # Helper-modules
│   ├── api.ts             # API-call (axios)
│   ├── clipboard.ts       # Klembord-logica met fallback
│   ├── cn.ts              # clsx + tailwind-merge utility
│   ├── groan.ts           # groanScore + groanLabel
│   ├── storage.ts         # Veilige localStorage-wrappers
│   └── theme.ts           # systemPrefersDark
├── config.ts              # Centrale constanten (SSOT)
├── App.tsx
├── main.tsx
└── index.css              # Tailwind + design tokens
```

## 🧭 Code Conventies

- **Path alias `@/`**: imports gebruiken altijd `@/…` i.p.v. relatieve paden (`@/hooks/useJoke`, `@/components/Header`). Een ESLint-regel (`no-restricted-imports`) dwingt dit af.
- **`cn()` utility**: combineer classnames met `cn(...)` i.p.v. template-literals, zodat conflicterende Tailwind-classes correct worden samengevoegd.
- **Single source of truth**: API-URL's, timeouts, drempels en meldingen staan centraal in `src/config.ts`; domeinlogica (zoals `getJokeText`) in `src/services/JokesData.ts`.
- **Sterke types**: `no-explicit-any` en de `no-unsafe-*`-regels staan aan als error; de codebase is `any`-vrij.

## ✅ Code Quality

- **Pre-commit (Husky)**: bij elke commit draaien `typecheck` en `lint-staged` (eslint --fix op gestagede `.ts`/`.tsx`).
- **CI (GitHub Actions)**: elke pull request draait `lint` en `typecheck`.
- **Strikte ESLint-config**: type-aware regels, `no-console`, `eqeqeq`, `no-floating-promises`, `consistent-type-imports` en `no-restricted-imports` (alias).

## 🤝 Bijdragen

Bijdragen zijn welkom! Volg deze stappen:

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 🙏 Credits

- **API**: [icanhazdadjoke.com](https://icanhazdadjoke.com) voor de dad jokes
- **Icons**: eigen SVG-iconen (`src/components/icons.tsx`)
- **Fonts**: Fraunces (serif) voor koppen, systeemfonts voor body-tekst

---

Gemaakt met ❤️ door [HamedSadim1](https://github.com/HamedSadim1)
