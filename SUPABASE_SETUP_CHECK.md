# Supabase-Konfiguration überprüfen

Das Problem liegt wahrscheinlich an der Supabase-Konfiguration. Folgen Sie diesen Schritten:

## 🔧 **Schritt 1: .env.local Datei überprüfen**

Stellen Sie sicher, dass Ihre `.env.local` Datei im Projektverzeichnis existiert und die korrekten Werte enthält:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ihre-projekt-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ihr-anon-key
```

**Wichtig:**
- Keine Anführungszeichen um die Werte
- Keine Leerzeichen vor oder nach den Werten
- Korrekte Projekt-ID und Anon-Key

## 🔧 **Schritt 2: Supabase-Dashboard überprüfen**

1. **Gehen Sie zu [supabase.com](https://supabase.com)**
2. **Wählen Sie Ihr Projekt**
3. **Settings → API**
4. **Kopieren Sie die korrekten Werte:**
   - **Project URL** (nicht Project ID!)
   - **anon public** key

## 🔧 **Schritt 3: Konfiguration testen**

Gehen Sie zu `http://localhost:3001/test-supabase-config` und klicken Sie auf "Konfiguration testen".

**Erwartete Ergebnisse:**
```json
{
  "envVars": {
    "hasUrl": true,
    "hasAnonKey": true,
    "url": "https://ihre-projekt-id.supabase.co",
    "anonKey": "***"
  },
  "clientTest": {
    "hasClient": true,
    "clientType": "object",
    "hasAuth": true
  },
  "connectionTest": {
    "success": true,
    "error": null,
    "data": [...]
  }
}
```

## 🔧 **Schritt 4: Server neu starten**

Nach Änderungen an der `.env.local` Datei:

```bash
# Server stoppen (Ctrl+C)
# Dann neu starten:
npm run dev
```

## 🔧 **Schritt 5: Häufige Probleme**

### Problem: "Supabase-Konfiguration fehlt"
**Lösung:** `.env.local` Datei erstellen oder Werte korrigieren

### Problem: "Supabase-Konfiguration verwendet Platzhalter"
**Lösung:** Echte Werte aus dem Supabase-Dashboard verwenden

### Problem: "Project URL" statt "Project ID"
**Lösung:** Verwenden Sie die vollständige URL, nicht nur die ID

### Problem: Falsche Umgebungsvariablen
**Lösung:** Stellen Sie sicher, dass die Variablen `NEXT_PUBLIC_` beginnen

## 🔧 **Schritt 6: Beispiel .env.local**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU0NzI5MCwiZXhwIjoxOTUyMTIzMjkwfQ.example

# E-Mail (Resend)
RESEND_API_KEY=re_123456789

# Admin E-Mail
ADMIN_EMAIL=admin@example.com
```

## 🔧 **Schritt 7: Testen**

Nach der Konfiguration:

1. **Konfiguration testen:** `http://localhost:3001/test-supabase-config`
2. **Registrierung testen:** `http://localhost:3001/register`
3. **Login testen:** `http://localhost:3001/login`

**Bitte führen Sie diese Schritte durch und teilen Sie mir die Ergebnisse mit!**
