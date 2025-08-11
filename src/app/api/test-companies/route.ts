import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Test-API: Starte Test der companies Tabelle...')
    
    // Teste die Verbindung zur companies Tabelle
    const { data: companies, error } = await supabase
      .from('companies')
      .select('*')
      .limit(5)
    
    console.log('🧪 Test-API: Companies Abfrage:', { companies, error })
    
    if (error) {
      console.error('❌ Test-API: Fehler beim Abrufen der companies:', error)
      return NextResponse.json(
        { error: 'Fehler beim Abrufen der companies', details: error },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Companies Tabelle ist erreichbar',
      count: companies?.length || 0,
      sample: companies?.slice(0, 2) || []
    })
    
  } catch (error) {
    console.error('❌ Test-API: Unerwarteter Fehler:', error)
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}
