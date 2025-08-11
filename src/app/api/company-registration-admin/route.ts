import { NextRequest, NextResponse } from 'next/server'

// Versuche Admin-Client zu importieren, falls verfügbar
let supabaseAdmin: any = null
try {
  const { supabaseAdmin: admin } = await import('@/lib/supabase/admin')
  supabaseAdmin = admin
} catch (error) {
  console.log('⚠️ Admin-Client nicht verfügbar, verwende normalen Client')
}

// Fallback auf normalen Client
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firmenname, 
      firmenanschrift, 
      land,
      bundesland,
      firmen_plz, 
      firmen_ort, 
      firmen_mail, 
      firmen_telefon, 
      firmen_ust_id,
      userId 
    } = body

    // Validierung der erforderlichen Felder
    if (!firmenname || !firmenanschrift || !land || !bundesland || !firmen_plz || !firmen_ort || !firmen_mail || !userId) {
      return NextResponse.json(
        { error: 'Alle erforderlichen Felder müssen ausgefüllt werden' },
        { status: 400 }
      )
    }

    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(firmen_mail)) {
      return NextResponse.json(
        { error: 'Gültige E-Mail-Adresse erforderlich' },
        { status: 400 }
      )
    }

    console.log('🏢 Erstelle neue Firma für Benutzer:', userId)

    // Firmendaten vorbereiten
    const companyData = {
      firmenname,
      firmenanschrift,
      firmen_land: land,
      firmen_bundesland: bundesland,
      firmen_plz,
      firmen_ort,
      firmen_mail,
      firmen_telefon: firmen_telefon || null,
      firmen_ust_id: firmen_ust_id || null,
      firmen_logo_url: null
    }

    // Verwende Admin-Client falls verfügbar, sonst normalen Client
    const client = supabaseAdmin || supabase

    // Firma erstellen
    console.log('🏢 Erstelle Firma in der Datenbank...')
    const { data: company, error: companyError } = await client
      .from('companies')
      .insert(companyData)
      .select()
      .single()
    
    if (companyError) {
      console.error('❌ Fehler beim Erstellen der Firma:', companyError)
      return NextResponse.json(
        { error: 'Fehler beim Speichern der Firmendaten: ' + companyError.message },
        { status: 500 }
      )
    }

    console.log('✅ Firma erfolgreich erstellt:', company.id)

    // Benutzerprofil mit Firmen-ID aktualisieren
    console.log('👤 Aktualisiere Benutzerprofil...')
    const { data: updatedProfile, error: profileError } = await client
      .from('profiles')
      .update({ 
        firmen_id: company.id,
        is_registration: false 
      })
      .eq('id', userId)
      .select()
      .single()
    
    if (profileError) {
      console.error('❌ Fehler beim Aktualisieren des Benutzerprofils:', profileError)
      return NextResponse.json(
        { error: 'Fehler beim Verknüpfen der Firmendaten: ' + profileError.message },
        { status: 500 }
      )
    }

    console.log('✅ Benutzerprofil erfolgreich aktualisiert')

    return NextResponse.json({
      success: true,
      company: company,
      message: 'Firmendaten erfolgreich gespeichert'
    })

  } catch (error) {
    console.error('❌ Unerwarteter Fehler beim Speichern der Firmendaten:', error)
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}
