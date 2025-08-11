# Supabase Setup Anleitung

## 1. Supabase-Projekt erstellen

1. Gehen Sie zu [supabase.com](https://supabase.com)
2. Erstellen Sie ein neues Projekt
3. Notieren Sie sich die Projekt-URL und den anon/public key

## 2. Umgebungsvariablen konfigurieren

Bearbeiten Sie die `.env.local` Datei und ersetzen Sie die Platzhalter:

```bash
# Supabase Konfiguration
NEXT_PUBLIC_SUPABASE_URL=https://ihre-projekt-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ihr-anon-key

# E-Mail Konfiguration (Resend)
RESEND_API_KEY=ihr-resend-api-key

# Admin E-Mail für Registrierungsbenachrichtigungen
ADMIN_EMAIL=b.kippschnieder@kanzlei-rieger.ch

# E-Mail-Absender (optional)
FROM_EMAIL=noreply@zertmanufaktur.de
```

### Wo Sie die Werte finden:

**Supabase:**
- Gehen Sie zu Ihrem Supabase-Projekt
- Klicken Sie auf "Settings" → "API"
- Kopieren Sie die "Project URL" und "anon public" key

**Resend (für E-Mails):**
- Gehen Sie zu [resend.com](https://resend.com)
- Erstellen Sie ein Konto
- Gehen Sie zu "API Keys" und erstellen Sie einen neuen Schlüssel

## 3. Supabase-Datenbank konfigurieren

### Benutzerprofile-Tabelle erstellen:

```sql
-- Erstellen Sie eine Tabelle für Benutzerprofile
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) aktivieren
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Richtlinien für Benutzerprofile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### Trigger für automatische Profilerstellung:

```sql
-- Funktion für automatische Profilerstellung
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, company, phone)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'company',
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger erstellen
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 4. E-Mail-Konfiguration

### Resend Domain verifizieren:

1. Gehen Sie zu Ihrem Resend-Dashboard
2. Fügen Sie Ihre Domain hinzu (z.B. zertmanufaktur.de)
3. Folgen Sie den DNS-Anweisungen
4. Warten Sie auf die Verifizierung

### E-Mail-Templates testen:

```bash
# Testen Sie die E-Mail-Funktionalität
npm run dev
# Gehen Sie zu http://localhost:3000/test-email
```

## 5. Registrierung testen

1. Starten Sie die Entwicklungsumgebung: `npm run dev`
2. Gehen Sie zu `/register`
3. Füllen Sie das Formular aus
4. Überprüfen Sie die Konsole auf Fehler
5. Überprüfen Sie Ihre E-Mail auf die Bestätigung

## Fehlerbehebung

### Häufige Probleme:

1. **"Supabase-Konfiguration fehlt"**
   - Überprüfen Sie, ob die `.env.local` Datei existiert
   - Stellen Sie sicher, dass die Werte korrekt sind

2. **"RESEND_API_KEY ist nicht gesetzt"**
   - Fügen Sie Ihren Resend API-Schlüssel zur `.env.local` hinzu

3. **E-Mail-Bestätigung funktioniert nicht**
   - Überprüfen Sie die Supabase-E-Mail-Einstellungen
   - Stellen Sie sicher, dass die Domain in Resend verifiziert ist

4. **Registrierung schlägt fehl**
   - Überprüfen Sie die Browser-Konsole auf Fehler
   - Überprüfen Sie die Supabase-Logs im Dashboard

### Debugging:

```bash
# Überprüfen Sie die Umgebungsvariablen
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
echo $RESEND_API_KEY
```

## Support

Bei Problemen:
1. Überprüfen Sie die Browser-Konsole
2. Überprüfen Sie die Server-Logs
3. Überprüfen Sie die Supabase-Logs im Dashboard
4. Überprüfen Sie die Resend-Logs im Dashboard
