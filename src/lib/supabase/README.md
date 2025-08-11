# Supabase Module Structure

Diese modulare Struktur organisiert alle Supabase-bezogenen Funktionen in logische Gruppen.

## 📁 Struktur

```
src/lib/supabase/
├── client.ts      # Basis-Supabase-Client-Konfiguration
├── auth.ts        # Authentifizierungs-Funktionen
├── profiles.ts    # Benutzerprofil-Funktionen
├── companies.ts   # Firmen-Funktionen
├── index.ts       # Re-Export aller Funktionen
└── README.md      # Diese Dokumentation
```

## 🔧 Verwendung

### Import aller Funktionen
```typescript
import { 
  signIn, 
  getUserProfile, 
  createCompany 
} from '@/lib/supabase'
```

### Spezifische Imports (optional)
```typescript
import { signIn } from '@/lib/supabase/auth'
import { getUserProfile } from '@/lib/supabase/profiles'
import { createCompany } from '@/lib/supabase/companies'
```

## 📋 Module

### `client.ts`
- **Zweck**: Basis-Supabase-Client-Konfiguration
- **Exportiert**: `supabase` Client-Instanz
- **Features**: 
  - Umgebungsvariablen-Validierung
  - Platzhalter-Erkennung
  - Fehlerbehandlung

### `auth.ts`
- **Zweck**: Authentifizierungs-Funktionen
- **Funktionen**:
  - `signUp()` - Benutzerregistrierung
  - `signIn()` - Benutzeranmeldung
  - `signOut()` - Benutzerabmeldung
  - `getSession()` - Aktuelle Session abrufen
  - `getCurrentUser()` - Aktuellen Benutzer abrufen
  - `updateUserProfile()` - Benutzerprofil aktualisieren

### `profiles.ts`
- **Zweck**: Benutzerprofil-Funktionen
- **Funktionen**:
  - `getUserProfile()` - Benutzerprofil abrufen
  - `updateUserWithCompany()` - Benutzer mit Firma verknüpfen
  - `getAllProfiles()` - Alle Profile abrufen (Admin)
  - `updateProfile()` - Profilfelder aktualisieren

### `companies.ts`
- **Zweck**: Firmen-Funktionen
- **Funktionen**:
  - `createCompany()` - Neue Firma erstellen
  - `getCompany()` - Firma nach ID abrufen
  - `getCompanyByUserId()` - Firma nach Benutzer-ID abrufen
  - `updateCompany()` - Firmendaten aktualisieren
  - `getAllCompanies()` - Alle Firmen abrufen (Admin)
  - `deleteCompany()` - Firma löschen

### `index.ts`
- **Zweck**: Re-Export aller Funktionen für einfache Imports
- **Vorteil**: Ein Import-Pfad für alle Supabase-Funktionen

## 🚀 Vorteile der modularen Struktur

### 1. **Bessere Organisation**
- Logische Gruppierung verwandter Funktionen
- Einfacheres Finden und Warten von Code

### 2. **Skalierbarkeit**
- Neue Module können einfach hinzugefügt werden
- Keine überfüllte einzelne Datei

### 3. **Wiederverwendbarkeit**
- Module können unabhängig importiert werden
- Spezifische Imports für bessere Tree-Shaking

### 4. **Debugging**
- Bessere Fehlerlokalisierung
- Klare Verantwortlichkeiten

### 5. **Teamarbeit**
- Mehrere Entwickler können parallel an verschiedenen Modulen arbeiten
- Weniger Merge-Konflikte

## 🔄 Migration von der alten Struktur

Die alte `supabase.ts` Datei wurde durch diese modulare Struktur ersetzt. Alle bestehenden Imports funktionieren weiterhin:

```typescript
// Alt (funktioniert weiterhin)
import { signIn } from '@/lib/supabase'

// Neu (optional, spezifischer)
import { signIn } from '@/lib/supabase/auth'
```

## 📈 Erweiterung

### Neues Modul hinzufügen:
1. Neue Datei erstellen: `src/lib/supabase/neues-modul.ts`
2. Funktionen implementieren
3. In `index.ts` exportieren
4. Dokumentation aktualisieren

### Beispiel für neues Modul:
```typescript
// src/lib/supabase/notifications.ts
import { supabase } from './client'

export const createNotification = async (data: any) => {
  const { data: result, error } = await supabase
    .from('notifications')
    .insert(data)
    .select()
    .single()
  
  return { data: result, error }
}
```

Dann in `index.ts` hinzufügen:
```typescript
export { createNotification } from './notifications'
```

## 🐛 Debugging

Alle Funktionen enthalten umfangreiche Console-Logs für Debugging:

```typescript
console.log('🔍 Supabase: Rufe Profil für Benutzer ab:', userId)
console.log('🏢 Supabase: Erstelle neue Firma:', companyData)
console.log('🔐 Supabase: Login erfolgreich für:', email)
```

## 📝 Best Practices

1. **Immer über Index importieren** für Konsistenz
2. **Console-Logs beibehalten** für Debugging
3. **Fehlerbehandlung** in allen Funktionen
4. **Typisierung** mit TypeScript Interfaces
5. **Dokumentation** für neue Funktionen
