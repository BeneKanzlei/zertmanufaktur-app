// Hilfsfunktion zur Ermittlung der IP-Adresse
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'Unbekannt'
}

// Hilfsfunktion zur Ermittlung der Lokalisation (vereinfacht)
export async function getLocationFromIP(ipAddress: string): Promise<string> {
  try {
    // Für Produktionsumgebung würde man einen echten GeoIP-Service verwenden
    // Hier ist eine vereinfachte Version
    if (ipAddress === '127.0.0.1' || ipAddress === '::1') {
      return 'Lokaler Zugriff'
    }
    
    // Für echte IPs könnte man einen Service wie ipapi.co verwenden
    // const response = await fetch(`https://ipapi.co/${ipAddress}/json/`)
    // const data = await response.json()
    // return `${data.city}, ${data.country_name}`
    
    // Vereinfachte Version für Demo
    return 'Deutschland'
  } catch (error) {
    console.error('Fehler beim Ermitteln der Lokalisation:', error)
    return 'Unbekannt'
  }
}

// Hilfsfunktion zur Formatierung des Zeitstempels
export function formatTimestamp(): string {
  return new Date().toLocaleString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Berlin'
  })
} 