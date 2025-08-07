# Anmelde-Benachrichtigung Setup

## Übersicht

Die App sendet jetzt automatisch eine E-Mail-Benachrichtigung bei jeder erfolgreichen Anmeldung mit Sicherheitsdetails.

## Funktionsweise

### 1. Automatische Integration
- **Trigger**: Bei jeder erfolgreichen Anmeldung
- **API-Endpunkt**: `/api/auth/login-notification`
- **E-Mail-Absender**: `noreply@zertmanufaktur.de`

### 2. E-Mail-Inhalt
```
Betreff: "Neue Anmeldung erkannt - Zertmanufaktur"

Inhalt:
- Anmelde-Details (IP-Adresse, Lokalisation, Uhrzeit)
- Sicherheitshinweis bei unbefugter Anmeldung
- Handlungsaufforderung: Passwort ändern bei Verdacht
```

### 3. Erfasste Daten
- **IP-Adresse**: Automatische Erkennung der Client-IP
- **Lokalisation**: Vereinfachte GeoIP-Erkennung
- **Zeitstempel**: Deutsche Formatierung (Europe/Berlin)
- **Benutzername**: Aus Supabase User-Metadaten oder E-Mail

## Technische Details

### API-Endpunkte
- **`/api/auth/login-notification`**: Automatische Anmelde-Benachrichtigung
- **`/api/login-notification`**: Manuelle Anmelde-Benachrichtigung

### Fehlerbehandlung
- Anmelde-Benachrichtigung-Fehler blockieren die Anmeldung nicht
- Fehler werden in der Konsole geloggt
- Graceful Degradation bei E-Mail-Service-Problemen

### Sicherheitsfeatures
- **IP-Tracking**: Für verdächtige Anmeldungen
- **Lokalisation**: Identifikation unbekannter Standorte
- **Zeitstempel**: Genaue Nachverfolgung
- **Sicherheitshinweis**: Prominente Warnung bei Verdacht

## Testen

### 1. Manueller Test
```bash
curl -X POST http://localhost:3000/api/auth/login-notification \
  -H "Content-Type: application/json" \
  -d '{"userEmail":"test@example.com","userName":"Test User"}'
```

### 2. Test-Komponente
```tsx
import LoginNotificationTest from '@/components/login-notification-test'

// In Ihrer Seite
<LoginNotificationTest />
```

### 3. Echte Anmeldung
- Melden Sie sich über die Login-Seite an
- E-Mail wird automatisch an die Anmelde-E-Mail-Adresse gesendet

## Konfiguration

### E-Mail-Service
- **Resend API Key**: In `.env.local` konfiguriert
- **Absender**: `noreply@zertmanufaktur.de`
- **Template**: Professionelles HTML-Design

### GeoIP-Service (optional)
Für echte Lokalisation können Sie einen GeoIP-Service integrieren:
```typescript
// In geo-utils.ts
const response = await fetch(`https://ipapi.co/${ipAddress}/json/`)
const data = await response.json()
return `${data.city}, ${data.country_name}`
```

## Produktionsumgebung

### 1. GeoIP-Service
- Integrieren Sie einen echten GeoIP-Service
- Aktualisieren Sie `getLocationFromIP()` in `geo-utils.ts`

### 2. Rate Limiting
- Implementieren Sie Rate Limiting für die API-Endpunkte
- Verhindern Sie Spam-Anmelde-Benachrichtigungen

### 3. Logging
- Erweitern Sie das Logging für Sicherheitsanalysen
- Speichern Sie Anmelde-Versuche in der Datenbank

### 4. Benutzer-Einstellungen
- Ermöglichen Sie Benutzern, Anmelde-Benachrichtigungen zu deaktivieren
- Implementieren Sie verschiedene Benachrichtigungsebenen

## Troubleshooting

### E-Mail wird nicht gesendet
1. Prüfen Sie den Resend API Key in `.env.local`
2. Überprüfen Sie die Domain-Verifizierung in Resend
3. Schauen Sie in die Browser-Konsole für Fehler

### Falsche IP-Adresse
- Bei Proxy/Cloudflare: Prüfen Sie die Header-Konfiguration
- Aktualisieren Sie `getClientIP()` in `geo-utils.ts`

### Lokalisation funktioniert nicht
- Integrieren Sie einen echten GeoIP-Service
- Implementieren Sie Fallback-Werte 