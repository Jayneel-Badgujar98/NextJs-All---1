// path : `app/api/sendEmail/route.js`
import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const { subject, body, recipientEmail } = await req.json()
    try {
        if (!subject || !body || !recipientEmail) {
            return Response.json({
                message: "Please provide subject, body and recipient email",
            }, {
                status: 400,
            })
        }
        await resend.emails.send({
            from: "Copilot AI <onboarding@resend.dev>",
            to: recipientEmail,
            subject: subject,
            html: body,
        })
        return Response.json({
            message: "Email sent successfully! to " + recipientEmail + " with subject: " + subject,
            subject,
            body,
            recipientEmail
        }, {
            status: 200,
        })

    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({
            message: "Error while sending email",
            error: error.message,
        }, {
            status: 500,
        })
    }
}