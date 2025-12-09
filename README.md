# Dad Jokes App 🎭

Een moderne, interactieve webapplicatie voor het genieten van dad jokes, gebouwd met de nieuwste webtechnologieën. Geniet van grappige woordspelingen met een prachtig glasmorfisme UI-design!

![Dad Jokes App Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Dad+Jokes+App+Preview)

## ✨ Features

- **🎯 Random Dad Jokes**: Haal verse dad jokes op van de icanhazdadjoke API
- **❤️ Favorieten Systeem**: Sla je favoriete jokes op in localStorage
- **🌙 Dark Mode**: Schakel tussen licht en donker thema
- **💎 Glasmorfisme UI**: Moderne, transparante glasachtige design elementen
- **📱 Responsive Design**: Werkt perfect op desktop en mobiel
- **⚡ Snelle Performance**: Gebouwd met Vite voor optimale snelheid
- **🔧 TypeScript**: Volledig getypeerd voor betere ontwikkelervaring

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **API**: icanhazdadjoke.com
- **State Management**: React Hooks
- **Storage**: localStorage

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

- **Nieuwe Joke Laden**: Klik op de "🔄 New Joke" knop voor een verse dad joke
- **Als Favoriet Opslaan**: Klik op "❤️ Favorite" om de huidige joke toe te voegen aan je favorieten
- **Favorieten Beheren**: Bekijk en verwijder opgeslagen jokes in de favorieten sectie
- **Thema Wisselen**: Gebruik de dark/light mode toggle in de header

## 🏗️ Project Structuur

```text
src/
├── components/          # UI componenten
│   ├── Header.tsx      # App header met dark mode toggle
│   ├── JokeCard.tsx    # Random joke display
│   ├── FavoritesList.tsx # Favorieten beheer
│   ├── Footer.tsx      # App footer
│   └── DadJoke.tsx     # Hoofdcomponent
├── hooks/              # Custom React hooks
│   ├── useDarkMode.ts  # Dark mode logica
│   └── useFavorites.ts # Favorieten state management
├── utils/              # Helper functies
│   └── api.ts          # API calls
└── services/           # Types en interfaces
    └── JokesData.ts    # Joke data types
```

## 📜 Scripts

- `npm run dev` - Start ontwikkelserver
- `npm run build` - Bouw voor productie
- `npm run preview` - Preview productie build

## 🎨 UI/UX Design

Deze app gebruikt moderne design principes:

- **Glasmorfisme**: Transparante elementen met blur-effecten
- **Micro-interacties**: Hover effecten en animaties
- **Consistentie**: Uniforme spacing en kleuren
- **Toegankelijkheid**: Goede contrast ratios en keyboard navigation

## 🤝 Bijdragen

Bijdragen zijn welkom! Volg deze stappen:

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 Licentie

Dit project is gelicentieerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

## 🙏 Credits

- **API**: [icanhazdadjoke.com](https://icanhazdadjoke.com) voor de geweldige dad jokes
- **Icons**: Unicode emojis voor visuele elementen
- **Fonts**: Systeem fonts voor optimale performance

---

Gemaakt met ❤️ door [HamedSadim1](https://github.com/HamedSadim1)
