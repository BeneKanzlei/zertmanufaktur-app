import { textLogos } from '../svg-logos'

export interface LoginNotificationData {
  userName: string
  ipAddress: string
  location: string
  timestamp: string
}

export function createLoginNotificationEmail(data: LoginNotificationData) {
  return {
    subject: 'Neue Anmeldung erkannt - Zertmanufaktur',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header mit Logo -->
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          ${textLogos.header}
        </div>
        
        <!-- Hauptinhalt -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Neue Anmeldung erkannt</h2>
          <p style="color: #374151; line-height: 1.6;">Hallo ${data.userName},</p>
          <p style="color: #374151; line-height: 1.6;">Wir haben eine neue Anmeldung zu Ihrem Zertmanufaktur-Konto erkannt:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">Anmelde-Details:</h3>
            <p style="margin: 8px 0; color: #374151;"><strong>IP-Adresse:</strong> ${data.ipAddress}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Lokalisation:</strong> ${data.location}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Uhrzeit:</strong> ${data.timestamp}</p>
          </div>
          
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">⚠️ Sicherheitshinweis</h3>
            <p style="margin: 0; color: #92400e; line-height: 1.6;">
              <strong>Falls Sie diese Anmeldung nicht veranlasst haben, ändern Sie bitte umgehend Ihr Passwort!</strong>
            </p>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">Falls Sie diese Anmeldung nicht veranlasst haben, kontaktieren Sie bitte sofort unseren Support.</p>
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