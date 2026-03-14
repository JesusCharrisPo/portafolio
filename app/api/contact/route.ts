import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_USER,
        pass: process.env.OUTLOOK_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.OUTLOOK_USER}>`,
      to: process.env.OUTLOOK_USER,
      subject: `Nuevo contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje desde tu portafolio</h2>

        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${service}</p>

        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>

        <hr/>
        <p>Enviado desde tu portafolio web</p>
      `,
    })

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    )
  } catch (error) {
    console.error(error)

    return new Response(
      JSON.stringify({ success: false }),
      { status: 500 }
    )
  }
}
