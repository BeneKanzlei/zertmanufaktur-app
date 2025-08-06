import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userEmail, notificationType, data } = body

    // Validierung der Eingabedaten
    if (!userEmail || !notificationType || !data) {
      return NextResponse.json(
        { error: 'Fehlende erforderliche Felder' },
        { status: 400 }
      )
    }

    // E-Mail-Benachrichtigung senden
    const result = await sendNotification(userEmail, notificationType, data)

    return NextResponse.json(
      { success: true, message: 'Benachrichtigung erfolgreich gesendet' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Fehler beim Senden der Benachrichtigung:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der Benachrichtigung' },
      { status: 500 }
    )
  }
} 