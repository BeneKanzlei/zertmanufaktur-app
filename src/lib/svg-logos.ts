// SVG-Logos für E-Mail-Templates
export const svgLogos = {
  // Header Logo (kleiner für E-Mail-Header)
  headerLogo: `
    <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="25" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white">
        Zertmanufaktur
      </text>
    </svg>
  `,

  // Footer Logo (noch kleiner für E-Mail-Footer)
  footerLogo: `
    <svg width="80" height="25" viewBox="0 0 80 25" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="18" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
        Zertmanufaktur
      </text>
    </svg>
  `,

  // Einfaches Logo als Base64 (falls SVG nicht funktioniert)
  headerLogoBase64: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSIxMCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIj4KWmVydG1hbnVmYWt0dXIKPC90ZXh0Pgo8L3N2Zz4=`,

  footerLogoBase64: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCA4MCAyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHRleHQgeD0iNSIgeT0iMTgiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIj4KWmVydG1hbnVmYWt0dXIKPC90ZXh0Pgo8L3N2Zz4=`
}

// Alternative: Einfache Text-Logos für bessere E-Mail-Kompatibilität
export const textLogos = {
  header: '<span style="font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; color: white;">Zertmanufaktur</span>',
  footer: '<span style="font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; color: white;">Zertmanufaktur</span>'
} 