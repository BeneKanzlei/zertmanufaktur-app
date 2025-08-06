import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userEmail, userName, ipAddress, location, timestamp } = body

    // Validierung der Eingabedaten
    if (!userEmail || !userName || !ipAddress || !location || !timestamp) {
      return NextResponse.json(
        { error: 'Fehlende erforderliche Felder' },
        { status: 400 }
      )
    }

    // Anmelde-Benachrichtigung senden
    const result = await sendNotification(userEmail, 'login', {
      userName,
      ipAddress,
      location,
      timestamp
    })

    return NextResponse.json(
      { success: true, message: 'Anmelde-Benachrichtigung erfolgreich gesendet' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Fehler beim Senden der Anmelde-Benachrichtigung:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der Anmelde-Benachrichtigung' },
      { status: 500 }
    )
  }
} 