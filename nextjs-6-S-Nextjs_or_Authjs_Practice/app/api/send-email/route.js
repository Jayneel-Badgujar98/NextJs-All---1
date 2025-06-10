import { resend } from '@/lib/resend';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    const data = await resend.emails.send({
      from: 'New App <onboarding@resend.dev>',
      to: email,
      subject: 'Test Email from Resend',
      html: `<strong>This is a test email sent via Resend!</strong>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
