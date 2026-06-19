export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { nombre, organizacion, email, mensaje } = req.body

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son obligatorios' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Inspira Web <noreply@inspira.ar>',
        to: ['info@inspira.ar'],
        reply_to: email,
        subject: `Nuevo contacto desde inspira.ar — ${nombre}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a3a5c;">Nuevo mensaje desde el sitio web</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px;">Nombre:</td>
                <td style="padding: 8px 0;">${nombre}</td>
              </tr>
              ${organizacion ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Organización:</td>
                <td style="padding: 8px 0;">${organizacion}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${mensaje ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Mensaje:</td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${mensaje}</td>
              </tr>` : ''}
            </table>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #e0e0e0;" />
            <p style="color: #888; font-size: 12px;">
              Este mensaje fue enviado desde el formulario de contacto de <a href="https://inspira.ar">inspira.ar</a>.
              Podés responder directamente a este email para contactar a ${nombre}.
            </p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Error al enviar el mensaje' })
    }

    return res.status(200).json({ ok: true })

  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
