import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userData } = body

    console.log('🔧 API: Erstelle Profil für Benutzer:', { userId, userData })

    if (!userId) {
      return NextResponse.json(
        { error: 'Benutzer-ID ist erforderlich' },
        { status: 400 }
      )
    }

    // Prüfen, ob Profil bereits existiert
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (existingProfile) {
      console.log('🔧 API: Profil existiert bereits:', existingProfile)
      return NextResponse.json({
        success: true,
        message: 'Profil existiert bereits',
        profile: existingProfile
      })
    }

    // Profil erstellen
    const profileData = {
      id: userId,
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      company: userData?.company || '',
      phone: userData?.phone || '',
      is_registration: true, // Standardmäßig true für neue Benutzer
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    console.log('🔧 API: Erstelle Profil mit Daten:', profileData)

    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single()

    if (createError) {
      console.error('❌ API: Fehler beim Erstellen des Profils:', createError)
      return NextResponse.json(
        { error: 'Fehler beim Erstellen des Profils', details: createError },
        { status: 500 }
      )
    }

    console.log('✅ API: Profil erfolgreich erstellt:', newProfile)

    return NextResponse.json({
      success: true,
      message: 'Profil erfolgreich erstellt',
      profile: newProfile
    })

  } catch (error) {
    console.error('❌ API: Unerwarteter Fehler beim Erstellen des Profils:', error)
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}
