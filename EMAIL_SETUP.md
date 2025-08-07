# E-Mail-Benachrichtigungen Setup

## Übersicht

Die App ist jetzt mit Resend für E-Mail-Benachrichtigungen von `noreply@zertmanufaktur.de` integriert.

## Setup

### 1. Resend API Key

1. Gehen Sie zu [Resend](https://resend.com) und erstellen Sie ein Konto
2. Erstellen Sie einen API Key
3. Fügen Sie den API Key zu Ihrer `.env.local` Datei hinzu:

```env
RESEND_API_KEY=your_resend_api_key_here
```

### 2. Domain-Verifizierung

1. Verifizieren Sie Ihre Domain `zertmanufaktur.de` in Resend
2. Fügen Sie die erforderlichen DNS-Einträge hinzu
3. Warten Sie auf die Verifizierung (kann bis zu 24 Stunden dauern)

### 3. Testen

Verwenden Sie die `NotificationExample` Komponente zum Testen:

```tsx
import NotificationExample from '@/components/notification-example'

// In Ihrer Seite
<NotificationExample />
```

## Verfügbare Benachrichtigungstypen

### 1. Kommentare
```tsx
await sendCommentNotification(
  'user@example.com',
  'Max Mustermann',
  'Kommentar-Text',
  'Post-Titel'
)
```

### 2. Aufgaben
```tsx
await sendTaskNotification(
  'user@example.com',
  'Max Mustermann',
  'Aufgaben-Titel',
  'Aufgaben-Beschreibung'
)
```

### 3. Termine
```tsx
await sendAppointmentNotification(
  'user@example.com',
  'Max Mustermann',
  'Termin-Titel',
  '15. Dezember 2024',
  '14:00 Uhr'
)
```

### 4. Willkommens-E-Mail
```tsx
await sendWelcomeNotification(
  'user@example.com',
  'Max Mustermann'
)
```

## Verwendung in Komponenten

```tsx
import { useNotifications } from '@/hooks/useNotifications'

export default function MyComponent() {
  const { sendCommentNotification, isLoading, error } = useNotifications()

  const handleComment = async () => {
    try {
      await sendCommentNotification(
        'user@example.com',
        'Max Mustermann',
        'Neuer Kommentar',
        'Post Titel'
      )
      console.log('Benachrichtigung gesendet!')
    } catch (err) {
      console.error('Fehler:', err)
    }
  }

  return (
    <button 
      onClick={handleComment}
      disabled={isLoading}
    >
      {isLoading ? 'Sende...' : 'Kommentar senden'}
    </button>
  )
}
```

## E-Mail-Templates

Alle E-Mails verwenden professionelle HTML-Templates mit:
- Zertmanufaktur Branding
- Responsive Design
- Deutsche Lokalisierung
- Klare Struktur und Lesbarkeit

## Fehlerbehandlung

Der Service enthält umfassende Fehlerbehandlung:
- API-Fehler werden abgefangen
- Benutzerfreundliche Fehlermeldungen
- Logging für Debugging

## Sicherheit

- API-Keys werden in Umgebungsvariablen gespeichert
- Server-seitige Validierung
- Rate-Limiting durch Resend
- Sichere E-Mail-Versendung 