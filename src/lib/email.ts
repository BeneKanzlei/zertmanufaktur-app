import { Resend } from 'resend'
import {
  createLoginNotificationEmail,
  createCommentNotificationEmail,
  createTaskNotificationEmail,
  createAppointmentNotificationEmail,
  createWelcomeEmail,
  createRegistrationNotificationEmail,
  type LoginNotificationData,
  type CommentNotificationData,
  type TaskNotificationData,
  type AppointmentNotificationData,
  type WelcomeEmailData,
  type RegistrationNotificationData
} from './emails'

// Resend-Client erst zur Laufzeit initialisieren
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('❌ RESEND_API_KEY ist nicht gesetzt!')
    console.error('Bitte fügen Sie RESEND_API_KEY zu Ihrer .env.local Datei hinzu.')
    throw new Error('RESEND_API_KEY ist nicht gesetzt')
  }
  
  // Überprüfung auf Platzhalter-Werte
  if (apiKey.includes('placeholder') || apiKey.includes('ihr-resend-api-key')) {
    console.error('❌ RESEND_API_KEY verwendet Platzhalter-Werte!')
    console.error('Bitte ersetzen Sie den Platzhalter in Ihrer .env.local Datei mit einem echten Resend API-Schlüssel.')
    throw new Error('RESEND_API_KEY verwendet Platzhalter')
  }
  
  return new Resend(apiKey)
}

export interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from: 'noreply@zertmanufaktur.de',
      to: [to],
      subject: subject,
      html: html,
    })

    if (error) {
      console.error('Fehler beim Senden der E-Mail:', error)
      throw new Error('E-Mail konnte nicht gesendet werden')
    }

    return { success: true, data }
  } catch (error) {
    console.error('E-Mail-Service Fehler:', error)
    throw error
  }
}

// Spezifische E-Mail-Funktionen
export async function sendLoginNotification(userEmail: string, data: LoginNotificationData) {
  const email = createLoginNotificationEmail(data)
  return await sendEmail({
    to: userEmail,
    subject: email.subject,
    html: email.html
  })
}

export async function sendCommentNotification(userEmail: string, data: CommentNotificationData) {
  const email = createCommentNotificationEmail(data)
  return await sendEmail({
    to: userEmail,
    subject: email.subject,
    html: email.html
  })
}

export async function sendTaskNotification(userEmail: string, data: TaskNotificationData) {
  const email = createTaskNotificationEmail(data)
  return await sendEmail({
    to: userEmail,
    subject: email.subject,
    html: email.html
  })
}

export async function sendAppointmentNotification(userEmail: string, data: AppointmentNotificationData) {
  const email = createAppointmentNotificationEmail(data)
  return await sendEmail({
    to: userEmail,
    subject: email.subject,
    html: email.html
  })
}

export async function sendWelcomeEmail(userEmail: string, data: WelcomeEmailData) {
  const email = createWelcomeEmail(data)
  return await sendEmail({
    to: userEmail,
    subject: email.subject,
    html: email.html
  })
}

export async function sendRegistrationNotification(adminEmail: string, data: RegistrationNotificationData) {
  const email = createRegistrationNotificationEmail(data)
  return await sendEmail({
    to: adminEmail,
    subject: email.subject,
    html: email.html
  })
}

// Generische Hilfsfunktion für alle Benachrichtigungstypen
export async function sendNotification(
  userEmail: string, 
  notificationType: 'login' | 'comment' | 'task' | 'appointment' | 'welcome' | 'registration',
  data: LoginNotificationData | CommentNotificationData | TaskNotificationData | AppointmentNotificationData | WelcomeEmailData | RegistrationNotificationData
) {
  switch (notificationType) {
    case 'login':
      return await sendLoginNotification(userEmail, data as LoginNotificationData)
    case 'comment':
      return await sendCommentNotification(userEmail, data as CommentNotificationData)
    case 'task':
      return await sendTaskNotification(userEmail, data as TaskNotificationData)
    case 'appointment':
      return await sendAppointmentNotification(userEmail, data as AppointmentNotificationData)
    case 'welcome':
      return await sendWelcomeEmail(userEmail, data as WelcomeEmailData)
    case 'registration':
      return await sendRegistrationNotification(userEmail, data as RegistrationNotificationData)
    default:
      throw new Error('Unbekannter Benachrichtigungstyp')
  }
}

// Export der Typen für bessere TypeScript-Unterstützung
export type {
  LoginNotificationData,
  CommentNotificationData,
  TaskNotificationData,
  AppointmentNotificationData,
  WelcomeEmailData,
  RegistrationNotificationData
} 