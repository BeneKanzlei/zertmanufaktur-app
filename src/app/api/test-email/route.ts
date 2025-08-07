import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const testEmail = {
      to: 'b.kippschnieder@kanzlei-rieger.ch',
      subject: 'Test E-Mail von Zertmanufaktur',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">Test E-Mail von Zertmanufaktur</h2>
          <p>Hallo,</p>
          <p>Dies ist eine Test-E-Mail von der Zertmanufaktur App.</p>
          <p>Die E-Mail-Funktion funktioniert korrekt!</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Test-Details:</strong></p>
            <p style="margin: 5px 0;">Absender: noreply@zertmanufaktur.de</p>
            <p style="margin: 5px 0;">Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
            <p style="margin: 5px 0;">Status: Erfolgreich gesendet</p>
          </div>
          <p>Vielen Dank,<br>Ihr Zertmanufaktur Team</p>
        </div>
      `
    }

    const result = await sendEmail(testEmail)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Test-E-Mail erfolgreich gesendet',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Fehler beim Senden der Test-E-Mail:', error)
    return NextResponse.json(
      { 
        error: 'Fehler beim Senden der Test-E-Mail',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      },
      { status: 500 }
    )
  }
} 