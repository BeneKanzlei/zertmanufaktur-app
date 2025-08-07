import {
  createLoginNotificationEmail,
  createCommentNotificationEmail,
  createTaskNotificationEmail,
  createAppointmentNotificationEmail,
  createWelcomeEmail
} from './src/lib/emails'

function testEmailTemplates() {
  console.log('🚀 Teste E-Mail-Templates...\n')
  
  // Test 1: Login-Benachrichtigung
  console.log('📧 Login-Benachrichtigung Template:')
  const loginEmail = createLoginNotificationEmail({
    userName: 'Benedikt Kippschnieder',
    ipAddress: '192.168.1.100',
    location: 'Riga, Lettland',
    timestamp: new Date().toLocaleString('de-DE')
  })
  console.log(`Betreff: ${loginEmail.subject}`)
  console.log('HTML-Länge:', loginEmail.html.length, 'Zeichen')
  console.log('✅ Login-Template erstellt\n')

  // Test 2: Kommentar-Benachrichtigung
  console.log('📧 Kommentar-Benachrichtigung Template:')
  const commentEmail = createCommentNotificationEmail({
    userName: 'Benedikt Kippschnieder',
    commentText: 'Das ist ein Test-Kommentar für die E-Mail-Benachrichtigung.',
    postTitle: 'Test-Blog-Post'
  })
  console.log(`Betreff: ${commentEmail.subject}`)
  console.log('HTML-Länge:', commentEmail.html.length, 'Zeichen')
  console.log('✅ Kommentar-Template erstellt\n')

  // Test 3: Aufgaben-Benachrichtigung
  console.log('📧 Aufgaben-Benachrichtigung Template:')
  const taskEmail = createTaskNotificationEmail({
    userName: 'Benedikt Kippschnieder',
    taskTitle: 'E-Mail-System Testen',
    taskDescription: 'Testen Sie alle E-Mail-Templates und stellen Sie sicher, dass sie korrekt angezeigt werden.'
  })
  console.log(`Betreff: ${taskEmail.subject}`)
  console.log('HTML-Länge:', taskEmail.html.length, 'Zeichen')
  console.log('✅ Aufgaben-Template erstellt\n')

  // Test 4: Termin-Benachrichtigung
  console.log('📧 Termin-Benachrichtigung Template:')
  const appointmentEmail = createAppointmentNotificationEmail({
    userName: 'Benedikt Kippschnieder',
    appointmentTitle: 'E-Mail-System Review',
    appointmentDate: '15. Januar 2024',
    appointmentTime: '14:00 Uhr'
  })
  console.log(`Betreff: ${appointmentEmail.subject}`)
  console.log('HTML-Länge:', appointmentEmail.html.length, 'Zeichen')
  console.log('✅ Termin-Template erstellt\n')

  // Test 5: Willkommens-E-Mail
  console.log('📧 Willkommens-E-Mail Template:')
  const welcomeEmail = createWelcomeEmail({
    userName: 'Benedikt Kippschnieder'
  })
  console.log(`Betreff: ${welcomeEmail.subject}`)
  console.log('HTML-Länge:', welcomeEmail.html.length, 'Zeichen')
  console.log('✅ Willkommens-Template erstellt\n')

  console.log('🎉 Alle E-Mail-Templates erfolgreich getestet!')
  console.log('📝 Um die E-Mails tatsächlich zu senden, benötigen Sie einen gültigen RESEND_API_KEY.')
  
  // HTML-Beispiel für Login-E-Mail anzeigen
  console.log('\n📄 Beispiel HTML (Login-Benachrichtigung):')
  console.log('='.repeat(50))
  console.log(loginEmail.html.substring(0, 500) + '...')
  console.log('='.repeat(50))
}

// Test ausführen
testEmailTemplates() 