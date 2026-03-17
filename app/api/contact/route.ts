import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Faltan campos" }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "Jesus Charris <contacto@jesuscharrisdigital.online>",
      to: ["charrisjesus167@outlook.com"],
      replyTo: email,
      subject: `📩 ${subject || "Nuevo mensaje"} — de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#07080d;color:#fff;padding:32px;border-radius:12px">
          <div style="border-bottom:1px solid rgba(167,139,250,.2);padding-bottom:20px;margin-bottom:24px">
            <h1 style="font-size:20px;font-weight:900;margin:0;color:#fff">
              Nuevo mensaje desde <span style="color:#a78bfa">jesuscharrisdigital.online</span>
            </h1>
          </div>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.4);font-size:12px;width:130px">👤 Nombre</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);color:#fff;font-size:13px">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.4);font-size:12px">📧 Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);color:#fff;font-size:13px">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.4);font-size:12px">📞 Teléfono</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);color:#fff;font-size:13px">${phone || "No proporcionado"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.4);font-size:12px">🎯 Servicio</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);color:#fff;font-size:13px">${subject || "No especificado"}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:rgba(167,139,250,.06);border:1px solid rgba(167,139,250,.15);border-radius:8px">
            <p style="margin:0 0 8px;color:rgba(167,139,250,.7);font-size:11px;text-transform:uppercase;letter-spacing:.15em">💬 Mensaje</p>
            <p style="margin:0;color:rgba(255,255,255,.75);font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>
          <div style="margin-top:24px;text-align:center">
            <a href="https://wa.me/573043819731" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#a78bfa,#22d3ee);border-radius:8px;color:#fff;font-weight:700;font-size:13px;text-decoration:none">
              Responder por WhatsApp →
            </a>
          </div>
        </div>
      `,
    })

    if (error) return NextResponse.json({ success: false }, { status: 500 })
    return NextResponse.json({ success: true, id: data?.id })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}