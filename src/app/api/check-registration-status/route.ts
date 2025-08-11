import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    console.log('🔍 API: Empfangene Anfrage mit Body:', body)

    if (!userId) {
      console.log('❌ API: Keine Benutzer-ID erhalten')
      return NextResponse.json(
        { error: 'Benutzer-ID ist erforderlich' },
        { status: 400 }
      )
    }

    console.log('🔍 API: Prüfe Registrierungsstatus für Benutzer:', userId)

    // Benutzerprofil direkt abrufen
    console.log('🔍 API: Rufe Benutzerprofil ab...')
    console.log('🔍 API: Benutzer-ID:', userId)
    
    // Versuche das Profil abzurufen
    console.log('🔍 API: Rufe Profil für Benutzer ab:', userId)
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    console.log('🔍 API: Supabase Antwort:', { profile, error })
    console.log('🔍 API: Profile-Daten vollständig:', profile)
    
    // Falls kein Profil gefunden wurde, verwende Standard-Werte
    if (error && error.code === 'PGRST116') {
      console.log('🔧 API: Kein Profil gefunden, verwende Standard-Werte...')
      
      // Erstelle ein Standard-Profil-Objekt (ohne es zu speichern)
      const defaultProfile = {
        id: userId,
        first_name: '',
        last_name: '',
        phone: '',
        is_registration: true,
        firmen_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      console.log('✅ API: Verwende Standard-Profil:', defaultProfile)
      
      const response = {
        success: true,
        needsCompanyRegistration: true,
        profile: {
          id: defaultProfile.id,
          is_registration: defaultProfile.is_registration,
          firmen_id: defaultProfile.firmen_id,
          company_name: ''
        }
      }
      
      console.log('📋 API: Sende Antwort:', response)
      return NextResponse.json(response)
    } else if (error) {
      console.error('❌ API: Fehler beim Abrufen des Profils:', error)
      return NextResponse.json(
        { error: 'Fehler beim Abrufen des Profils', details: error },
        { status: 500 }
      )
    }
    
    // Prüfen, ob ein Profil vorhanden ist
    if (!profile) {
      console.log('❌ API: Kein Profil gefunden')
      return NextResponse.json(
        { error: 'Benutzerprofil konnte nicht abgerufen werden' },
        { status: 500 }
      )
    }

    console.log('📋 API: Benutzerprofil gefunden:', {
      id: profile.id,
      is_registration: profile.is_registration,
      firmen_id: profile.firmen_id,
      company_name: profile.company_name
    })

    // Prüfen, ob Benutzer Firmendaten erfassen muss
    const needsCompanyRegistration = profile.is_registration === true
    
    console.log('🔍 API: needsCompanyRegistration =', needsCompanyRegistration)

    const response = {
      success: true,
      needsCompanyRegistration,
      profile: {
        id: profile.id,
        is_registration: profile.is_registration,
        firmen_id: profile.firmen_id,
        company_name: profile.company_name || ''
      }
    }
    
    console.log('📋 API: Sende Antwort:', response)
    return NextResponse.json(response)

  } catch (error) {
    console.error('❌ Unerwarteter Fehler beim Prüfen des Registrierungsstatus:', error)
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}
