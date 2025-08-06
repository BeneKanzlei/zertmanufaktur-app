import { textLogos } from '../svg-logos'

export interface AppointmentNotificationData {
  userName: string
  appointmentTitle: string
  appointmentDate: string
  appointmentTime: string
}

export function createAppointmentNotificationEmail(data: AppointmentNotificationData) {
  return {
    subject: 'Termin-Erinnerung - Zertmanufaktur',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header mit Logo -->
        <div style="background-color: #1f2937; padding: 20px; text-align: center;">
          ${textLogos.header}
        </div>
        
        <!-- Hauptinhalt -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Termin-Erinnerung</h2>
          <p style="color: #374151; line-height: 1.6;">Hallo ${data.userName},</p>
          <p style="color: #374151; line-height: 1.6;">Dies ist eine Erinnerung an Ihren bevorstehenden Termin:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
            <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px;">Termin-Details:</h3>
            <p style="margin: 8px 0; color: #374151;"><strong>Termin:</strong> ${data.appointmentTitle}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Datum:</strong> ${data.appointmentDate}</p>
            <p style="margin: 8px 0; color: #374151;"><strong>Uhrzeit:</strong> ${data.appointmentTime}</p>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">Bitte stellen Sie sicher, dass Sie pünktlich zum Termin erscheinen.</p>
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