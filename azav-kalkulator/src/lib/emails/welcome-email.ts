import { textLogos } from '../svg-logos'

export interface WelcomeEmailData {
  userName: string
}

export function createWelcomeEmail(data: WelcomeEmailData) {
  return {
    subject: 'Willkommen bei Zertmanufaktur!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header mit Logo -->
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          ${textLogos.header}
        </div>
        
        <!-- Hauptinhalt -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Willkommen bei Zertmanufaktur!</h2>
          <p style="color: #374151; line-height: 1.6;">Hallo ${data.userName},</p>
          <p style="color: #374151; line-height: 1.6;">Herzlich willkommen bei Zertmanufaktur! Wir freuen uns, Sie als neues Mitglied in unserer Community begrüßen zu dürfen.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">Was Sie erwartet:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              <li style="margin-bottom: 8px;">Professionelle Zertifizierungs-Services</li>
              <li style="margin-bottom: 8px;">Persönliche Beratung und Support</li>
              <li style="margin-bottom: 8px;">Moderne und benutzerfreundliche Plattform</li>
              <li style="margin-bottom: 8px;">Schnelle und zuverlässige Abwicklung</li>
            </ul>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">Falls Sie Fragen haben, stehen wir Ihnen gerne zur Verfügung. Viel Erfolg bei Ihren Zertifizierungsprojekten!</p>
        </div>
        
        <!-- Footer mit Impressum -->
        <div style="background-color: #f9fafb; padding: 20px; border-top: 1px solid #e5e7eb;">
          <div style="text-align: center; margin-bottom: 20px;">
            ${textLogos.footer}
            <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">Vielen Dank,<br>Ihr Zertmanufaktur Team</p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0; line-height: 1.4;">
              <strong>Zertmanufaktur</strong><br>
              Eine Marke der<br>
              <strong>Cert & Consulting SIA</strong><br>
              Elisabetes Iela 69<br>
              1050 LV-Riga<br>
              CEO: Benedikt Kippschnieder
            </p>
          </div>
        </div>
      </div>
    `
  }
} 