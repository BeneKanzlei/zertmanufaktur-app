import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/lib/email'
import { getClientIP, getLocationFromIP, formatTimestamp } from '@/lib/geo-utils'

export async function POST(request: NextRequest) {
  console.log('🚀 Login-Notification API aufgerufen')
  
  try {
    const body = await request.json()
    console.log('📧 Request Body:', body)
    
    const { userEmail, userName } = body

    // Validierung der Eingabedaten
    if (!userEmail || !userName) {
      console.log('❌ Fehlende Felder:', { userEmail, userName })
      return NextResponse.json(
        { error: 'Fehlende erforderliche Felder' },
        { status: 400 }
      )
    }

    // IP-Adresse und Lokalisation ermitteln
    const ipAddress = getClientIP(request)
    const location = await getLocationFromIP(ipAddress)
    const timestamp = formatTimestamp()
    
    console.log('📍 Anmelde-Details:', { ipAddress, location, timestamp })

    // Anmelde-Benachrichtigung senden
    console.log('📤 Sende E-Mail an:', userEmail)
    const result = await sendNotification(userEmail, 'login', {
      userName,
      ipAddress,
      location,
      timestamp
    })
    
    console.log('✅ E-Mail erfolgreich gesendet')

    return NextResponse.json(
      { 
        success: true, 
        message: 'Anmelde-Benachrichtigung erfolgreich gesendet',
        data: {
          ipAddress,
          location,
          timestamp
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Fehler beim Senden der Anmelde-Benachrichtigung:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der Anmelde-Benachrichtigung' },
      { status: 500 }
    )
  }
} 