# Firmenregistrierung Setup

Diese Anleitung beschreibt die Einrichtung der Firmenregistrierung für neue Benutzer.

## 1. Datenbank-Schema einrichten

Führen Sie das SQL-Skript `database-setup.sql` in Ihrer Supabase-Datenbank aus:

```sql
-- Firmen-Tabelle erstellen
CREATE TABLE public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firmenname TEXT NOT NULL,
  firmenanschrift TEXT NOT NULL,
  firmen_plz TEXT NOT NULL,
  firmen_ort TEXT NOT NULL,
  firmen_mail TEXT NOT NULL,
  firmen_telefon TEXT,
  firmen_ust_id TEXT,
  firmen_logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS für Firmen-Tabelle aktivieren
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Richtlinien für Firmen-Tabelle
CREATE POLICY "Users can view own company" ON public.companies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.firmen_id = companies.id 
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can update own company" ON public.companies
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.firmen_id = companies.id 
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Users can insert company" ON public.companies
  FOR INSERT WITH CHECK (true);

-- Profiles-Tabelle erweitern
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_registration BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS firmen_id UUID REFERENCES public.companies(id);

-- Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_profiles_firmen_id ON public.profiles(firmen_id);
CREATE INDEX IF NOT EXISTS idx_profiles_is_registration ON public.profiles(is_registration);

-- Funktion für automatische Aktualisierung des updated_at Feldes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für companies-Tabelle
CREATE TRIGGER update_companies_updated_at 
    BEFORE UPDATE ON public.companies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 2. Funktionsweise

### Registrierungsprozess:

1. **Neue Benutzer registrieren sich** über `/register`
2. **Beim ersten Login** wird das `is_registration`-Flag in der `profiles`-Tabelle auf `true` gesetzt
3. **Nach erfolgreicher Anmeldung** wird geprüft, ob `is_registration = true` ist
4. **Falls ja**, öffnet sich automatisch das Firmendaten-Modal
5. **Benutzer füllt Firmendaten aus** und speichert diese
6. **Firma wird in `companies`-Tabelle gespeichert**
7. **Benutzerprofil wird aktualisiert** mit `firmen_id` und `is_registration = false`
8. **Weiterleitung zur Dashboard**

### Datenstruktur:

#### `profiles`-Tabelle (erweitert):
- `id` (UUID) - Referenz auf auth.users
- `first_name` (TEXT)
- `last_name` (TEXT)
- `company` (TEXT) - Legacy-Feld
- `phone` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- **`is_registration` (BOOLEAN)** - Neu: Gibt an, ob Benutzer Firmendaten erfassen muss
- **`firmen_id` (UUID)** - Neu: Referenz auf companies-Tabelle

#### `companies`-Tabelle (neu):
- `id` (UUID) - Primärschlüssel
- `firmenname` (TEXT) - Erforderlich
- `firmenanschrift` (TEXT) - Erforderlich
- `firmen_plz` (TEXT) - Erforderlich
- `firmen_ort` (TEXT) - Erforderlich
- `firmen_mail` (TEXT) - Erforderlich
- `firmen_telefon` (TEXT) - Optional
- `firmen_ust_id` (TEXT) - Optional
- `firmen_logo_url` (TEXT) - Optional (für späteren Logo-Upload)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 3. API-Endpunkte

### `/api/check-registration-status`
**POST** - Prüft, ob ein Benutzer Firmendaten erfassen muss

**Request:**
```json
{
  "userId": "user-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "needsCompanyRegistration": true,
  "profile": {
    "id": "user-uuid",
    "is_registration": true,
    "firmen_id": null
  }
}
```

### `/api/company-registration`
**POST** - Speichert Firmendaten und verknüpft sie mit dem Benutzer

**Request:**
```json
{
  "firmenname": "Musterfirma GmbH",
  "firmenanschrift": "Musterstraße 123",
  "firmen_plz": "12345",
  "firmen_ort": "Musterstadt",
  "firmen_mail": "info@musterfirma.de",
  "firmen_telefon": "+49 123 456789",
  "firmen_ust_id": "DE123456789",
  "userId": "user-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "company": {
    "id": "company-uuid",
    "firmenname": "Musterfirma GmbH",
    // ... weitere Firmendaten
  },
  "message": "Firmendaten erfolgreich gespeichert"
}
```

## 4. Komponenten

### `CompanyRegistrationModal`
- Modal-Dialog für die Firmendatenerfassung
- Validierung aller erforderlichen Felder
- File-Upload für Firmenlogo (vorbereitet)
- Responsive Design

### Erweiterte `LoginForm`
- Prüft Registrierungsstatus nach erfolgreicher Anmeldung
- Zeigt Modal bei Bedarf an
- Verarbeitet Firmendaten-Speicherung

## 5. Sicherheit

### Row Level Security (RLS):
- Benutzer können nur ihre eigene Firma einsehen/bearbeiten
- Neue Firmen können von allen authentifizierten Benutzern erstellt werden
- Verknüpfung über `profiles.firmen_id` stellt sicher, dass Benutzer nur ihre eigene Firma sehen

### Validierung:
- Server-seitige Validierung aller erforderlichen Felder
- E-Mail-Format-Validierung
- Client-seitige Validierung für bessere UX

## 6. Nächste Schritte

### Logo-Upload implementieren:
1. Supabase Storage Bucket für Logos erstellen
2. Upload-Funktionalität in `CompanyRegistrationModal` implementieren
3. API-Endpunkt für Logo-Upload erweitern

### Firmendaten bearbeiten:
1. Einstellungsseite erweitern um Firmendaten-Bearbeitung
2. API-Endpunkt für Firmendaten-Update erstellen

### Admin-Funktionen:
1. Admin-Dashboard für Firmenübersicht
2. Export-Funktionen für Firmendaten
3. Statistiken über registrierte Firmen

## 7. Testing

### Test-Szenarien:
1. **Neue Registrierung**: Benutzer registriert sich → Login → Modal erscheint
2. **Bestehender Benutzer**: Login ohne Modal (wenn bereits Firmendaten vorhanden)
3. **Fehlerbehandlung**: Ungültige Daten → Validierungsfehler
4. **Abbruch**: Modal schließen → Weiterleitung zur Dashboard

### Test-Daten:
```sql
-- Test-Benutzer mit is_registration = true
UPDATE profiles SET is_registration = true WHERE id = 'test-user-id';

-- Test-Benutzer mit Firmendaten
UPDATE profiles SET is_registration = false, firmen_id = 'test-company-id' WHERE id = 'test-user-id';
```
