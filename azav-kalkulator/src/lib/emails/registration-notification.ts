export interface RegistrationNotificationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  registrationDate: string
}

export function createRegistrationNotificationEmail(data: RegistrationNotificationData) {
  const { firstName, lastName, email, phone, company, registrationDate } = data
  
  return {
    subject: `Neue Registrierung: ${firstName} ${lastName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Neue Registrierung</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1f2937;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            background: #f9fafb;
            padding: 20px;
            border-radius: 0 0 8px 8px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .label {
            font-weight: 600;
            color: #374151;
          }
          .value {
            color: #6b7280;
          }
          .cta {
            background: #1f2937;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
            margin-top: 20px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Neue Registrierung</h1>
          <p>Ein neuer Benutzer hat sich registriert</p>
        </div>
        
        <div class="content">
          <h2>Registrierungsdetails:</h2>
          
          <div class="info-row">
            <span class="label">Name:</span>
            <span class="value">${firstName} ${lastName}</span>
          </div>
          
          <div class="info-row">
            <span class="label">E-Mail:</span>
            <span class="value">${email}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Telefon:</span>
            <span class="value">${phone}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Unternehmen:</span>
            <span class="value">${company}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Registriert am:</span>
            <span class="value">${registrationDate}</span>
          </div>
          
          <p style="margin-top: 20px; color: #6b7280;">
            Sie können den Benutzer unter der angegebenen Telefonnummer kontaktieren.
          </p>
          
          <a href="tel:${phone}" class="cta">
            📞 Jetzt anrufen
          </a>
        </div>
        
        <div class="footer">
          <p>Diese E-Mail wurde automatisch generiert von der Zertmanufaktur-Plattform.</p>
        </div>
      </body>
      </html>
    `
  }
} 