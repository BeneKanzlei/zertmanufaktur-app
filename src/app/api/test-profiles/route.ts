import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Test-API: Starte Test der profiles Tabelle...')
    
    // Teste die Verbindung zur profiles Tabelle
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(5)
    
    console.log('🧪 Test-API: Profiles Abfrage:', { profiles, error })
    
    if (error) {
      console.error('❌ Test-API: Fehler beim Abrufen der profiles:', error)
      return NextResponse.json(
        { error: 'Fehler beim Abrufen der profiles', details: error },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Profiles Tabelle ist erreichbar',
      count: profiles?.length || 0,
      sample: profiles?.slice(0, 2) || []
    })
    
  } catch (error) {
    console.error('❌ Test-API: Unerwarteter Fehler:', error)
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}
