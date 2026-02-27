import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, message, services, phone } = data;

    const response = await resend.emails.send({
      from: "Contacto <contacto@errerecubrimientos.com>",
      to: ["omarsolisdev@gmail.com"],
      subject: `🚀 Nuevo Prospecto: ${name} - ${services}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
            .header { background-color: #1a1a1a; color: #ffffff; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .field-label { font-weight: bold; color: #555; text-transform: uppercase; font-size: 12px; margin-bottom: 4px; }
            .field-value { margin-bottom: 20px; font-size: 16px; border-bottom: 1px solid #f4f4f4; padding-bottom: 8px; }
            .message-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #cc0000; }
            .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin:0; font-size: 24px;">Nuevo Mensaje de Contacto</h1>
            </div>
            <div class="content">
              <div class="field-label">Nombre del Cliente</div>
              <div class="field-value">${name}</div>

              <div class="field-label">Correo Electrónico</div>
              <div class="field-value"><a href="mailto:${email}" style="color: #cc0000; text-decoration: none;">${email}</a></div>

              <div class="field-label">Teléfono</div>
              <div class="field-value">${phone || "No proporcionado"}</div>

              <div class="field-label">Servicio Solicitado</div>
              <div class="field-value"><span style="background: #eee; padding: 4px 8px; border-radius: 4px;">${services}</span></div>

              <div class="field-label">Mensaje</div>
              <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
            </div>
            <div class="footer">
              Este correo fue enviado desde el formulario de contacto de <strong>errerecubrimientos.com</strong>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error enviando correo" }), {
      status: 500,
    });
  }
};
