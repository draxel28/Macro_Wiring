import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = 're_KnQ4aZHp_Q2Mphbt3i5vLaG15kKR3hD8m'

serve(async (req) => {
  try {
    const { record } = await req.json()
    console.log("New submission received for:", record.full_name)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Macro Wiring Alerts <onboarding@resend.dev>',
        to: ['valconfi1212@gmail.com'], // Updated recipient
        subject: `⚡ New Website Inquiry: ${record.subject || 'General Inquiry'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 20px;">Macro Wiring Technologies</h1>
              <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.8;">New Contact Form Submission</p>
            </div>
            <div style="padding: 20px; line-height: 1.6; color: #334155;">
              <p><strong>From:</strong> ${record.full_name} (${record.email})</p>
              <p><strong>Subject:</strong> ${record.subject || 'N/A'}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="white-space: pre-wrap;">${record.message}</p>
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${record.email}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reply Directly</a>
              </div>
            </div>
            <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
              Sent automatically from your Supabase Edge Function.
            </div>
          </div>
        `,
      }),
    })

    const responseData = await res.json()
    console.log("Resend API Response:", responseData)

    return new Response(JSON.stringify(responseData), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    })
  } catch (error) {
    console.error("Function Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})