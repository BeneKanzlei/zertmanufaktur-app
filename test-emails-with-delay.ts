// Lade .env.local Datei VOR dem Import der email.ts
import { config } from 'dotenv'
config({ path: '.env.local' })

// Jetzt importiere die E-Mail-Funktionen
import { 
  sendLoginNotification,
  sendCommentNotification,
  sendTaskNotification,
  sendAppointmentNotification,
  sendWelcomeEmail
} from './src/lib/email'

const TEST_EMAIL = 'b.kippschnieder@kanzlei-rieger.ch'

// Hilfsfunktion für Verzögerung
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function testAllEmails() {
  console.log('🚀 Starte E-Mail-Tests...')
  console.log('📧 API Key verfügbar:', !!process.env.RESEND_API_KEY)
  
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY nicht gefunden in .env.local Datei')
    return
  }
  
  try {
    // Test 1: Login-Benachrichtigung
    console.log('📧 Sende Login-Benachrichtigung...')
    await sendLoginNotification(TEST_EMAIL, {
      userName: 'Benedikt Kippschnieder',
      ipAddress: '192.168.1.100',
      location: 'Riga, Lettland',
      timestamp: new Date().toLocaleString('de-DE')
    })
    console.log('✅ Login-Benachrichtigung gesendet')
    await delay(1000) // 1 Sekunde warten

    // Test 2: Kommentar-Benachrichtigung
    console.log('📧 Sende Kommentar-Benachrichtigung...')
    await sendCommentNotification(TEST_EMAIL, {
      userName: 'Benedikt Kippschnieder',
      commentText: 'Das ist ein Test-Kommentar für die E-Mail-Benachrichtigung.',
      postTitle: 'Test-Blog-Post'
    })
    console.log('✅ Kommentar-Benachrichtigung gesendet')
    await delay(1000) // 1 Sekunde warten

    // Test 3: Aufgaben-Benachrichtigung
    console.log('📧 Sende Aufgaben-Benachrichtigung...')
    await sendTaskNotification(TEST_EMAIL, {
      userName: 'Benedikt Kippschnieder',
      taskTitle: 'E-Mail-System Testen',
      taskDescription: 'Testen Sie alle E-Mail-Templates und stellen Sie sicher, dass sie korrekt angezeigt werden.'
    })
    console.log('✅ Aufgaben-Benachrichtigung gesendet')
    await delay(1000) // 1 Sekunde warten

    // Test 4: Termin-Benachrichtigung
    console.log('📧 Sende Termin-Benachrichtigung...')
    await sendAppointmentNotification(TEST_EMAIL, {
      userName: 'Benedikt Kippschnieder',
      appointmentTitle: 'E-Mail-System Review',
      appointmentDate: '15. Januar 2024',
      appointmentTime: '14:00 Uhr'
    })
    console.log('✅ Termin-Benachrichtigung gesendet')
    await delay(1000) // 1 Sekunde warten

    // Test 5: Willkommens-E-Mail
    console.log('📧 Sende Willkommens-E-Mail...')
    await sendWelcomeEmail(TEST_EMAIL, {
      userName: 'Benedikt Kippschnieder'
    })
    console.log('✅ Willkommens-E-Mail gesendet')

    console.log('🎉 Alle E-Mail-Tests erfolgreich abgeschlossen!')
    console.log(`📬 Alle E-Mails wurden an ${TEST_EMAIL} gesendet.`)

  } catch (error) {
    console.error('❌ Fehler beim Senden der E-Mails:', error)
  }
}

// Test ausführen
testAllEmails() 