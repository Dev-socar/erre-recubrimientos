import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { name, email, message } = data;

    const response = await resend.emails.send({
      from: "Contacto <contacto@errecubrimientos.com>",
      to: "omarsolisdev@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error enviando correo" }), {
      status: 500,
    });
  }
};
