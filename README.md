# AZAV Kalkulator

Eine moderne Web-App für die professionelle Kalkulation von AZAV-Maßnahmen mit integriertem Buch der Berufe, BDKS-Rahmen und automatischer Lehrplan-Generierung.

## Features

- **Präzise Kalkulationen**: Automatische Berechnungen basierend auf dem Buch der Berufe Band 2 und BDKS-Rahmen
- **Lehrplan-Generierung**: Erstellen Sie strukturierte Lehrpläne mit Themenschwerpunkten und Unterrichtseinheiten
- **Curriculum-Erstellung**: Vollständige Curricula mit pädagogischer Struktur und Qualitätssicherung
- **Moderne UI**: Tailwind CSS mit Radiant Design System
- **Sichere Authentifizierung**: Supabase-basierte Benutzerverwaltung

## Technologie-Stack

- **Frontend**: Next.js 15 mit TypeScript
- **Styling**: Tailwind CSS
- **Datenbank**: Supabase
- **Authentifizierung**: Supabase Auth
- **UI-Komponenten**: Headless UI + Heroicons

## Installation

### Voraussetzungen

- Node.js 18+ (Installation über [nodejs.org](https://nodejs.org/))
- npm oder yarn
- Supabase-Konto

### 1. Node.js installieren

Falls Node.js noch nicht installiert ist:

```bash
# Über Homebrew (empfohlen für macOS)
brew install node

# Oder über den offiziellen Installer
# Besuchen Sie https://nodejs.org/ und laden Sie die LTS-Version herunter
```

### 2. Projekt installieren

```bash
# In das Projektverzeichnis wechseln
cd azav-kalkulator

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### 3. Umgebungsvariablen konfigurieren

Erstellen Sie eine `.env.local` Datei im Projektverzeichnis:

```env
NEXT_PUBLIC_SUPABASE_URL=ihre_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ihr_supabase_anon_key
```

### 4. Supabase einrichten

1. Erstellen Sie ein neues Projekt auf [supabase.com](https://supabase.com)
2. Kopieren Sie die URL und den anon key aus den Projekteinstellungen
3. Fügen Sie diese in die `.env.local` Datei ein

## Projektstruktur

```
src/
├── app/                 # Next.js App Router
│   ├── login/          # Login-Seite
│   ├── register/       # Registrierungsseite
│   └── globals.css     # Globale Styles
├── components/          # Wiederverwendbare Komponenten
├── lib/                # Utility-Funktionen
│   └── supabase.ts     # Supabase-Konfiguration
└── types/              # TypeScript-Typen
    └── index.ts        # App-Typen
```

## Entwicklung

```bash
# Entwicklungsserver starten
npm run dev

# Build erstellen
npm run build

# Produktionsserver starten
npm start

# Linting
npm run lint
```

## Nächste Schritte

1. **Supabase-Datenbank-Schema**: Erstellen Sie die Tabellen für Benutzer, Kalkulationen und Curricula
2. **Authentifizierung**: Implementieren Sie die Login/Register-Logik mit Supabase
3. **Kalkulations-Module**: Entwickeln Sie die AZAV-Kalkulationslogik
4. **Berufe-Buch-Integration**: Implementieren Sie die Datenbank für das Buch der Berufe
5. **BDKS-Rahmen**: Integrieren Sie den BDKS-Rahmen
6. **Lehrplan-Generator**: Entwickeln Sie den automatischen Lehrplan-Generator
7. **Curriculum-Ersteller**: Implementieren Sie den Curriculum-Ersteller

## Lizenz

Dieses Projekt ist für die interne Nutzung der Zertmanufaktur bestimmt. 