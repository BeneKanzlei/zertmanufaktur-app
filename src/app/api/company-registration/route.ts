import { NextRequest, NextResponse } from 'next/server'
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
    if (!firmenname || !firmenanschrift || !land || !bundesland || !firmen_plz || !firmen_ort || !firmen_mail || !firmen_telefon || !userId) {
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

    // Firmendaten vorbereiten (ohne Logo für jetzt)
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
      firmen_logo_url: null // TODO: Implementiere Logo-Upload
    }

    // Firma erstellen
    console.log('🏢 Erstelle Firma in der Datenbank...')
    const { data: company, error: companyError } = await supabase
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
    
    // Zuerst prüfen, ob das Profil existiert
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()
    
    if (checkError) {
      console.error('❌ Fehler beim Prüfen des Profils:', checkError)
      return NextResponse.json(
        { error: 'Benutzerprofil nicht gefunden: ' + checkError.message },
        { status: 500 }
      )
    }
    
    // Profil aktualisieren (ohne select() um RLS-Probleme zu vermeiden)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        firmen_id: company.id,
        is_registration: false 
      })
      .eq('id', userId)
    
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
