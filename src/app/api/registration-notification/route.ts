import { NextRequest, NextResponse } from 'next/server'
import { sendRegistrationNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, company } = body

    // Validierung der erforderlichen Felder
    if (!firstName || !lastName || !email || !phone || !company) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      )
    }

    // Admin-E-Mail-Adresse (kann später in Umgebungsvariablen konfiguriert werden)
    const adminEmail = process.env.ADMIN_EMAIL || 'b.kippschnieder@kanzlei-rieger.ch'

    // Registrierungsdatum
    const registrationDate = new Date().toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Registrierungsbenachrichtigung senden
    await sendRegistrationNotification(adminEmail, {
      firstName,
      lastName,
      email,
      phone,
      company,
      registrationDate
    })

    console.log('✅ Registrierungsbenachrichtigung erfolgreich gesendet an:', adminEmail)
    console.log('📧 Neue Registrierung von:', `${firstName} ${lastName} (${email})`)

    return NextResponse.json({ 
      success: true, 
      message: 'Registrierungsbenachrichtigung gesendet' 
    })

  } catch (error) {
    console.error('❌ Fehler beim Senden der Registrierungsbenachrichtigung:', error)
    
    return NextResponse.json(
      { error: 'Fehler beim Senden der Registrierungsbenachrichtigung' },
      { status: 500 }
    )
  }
} 