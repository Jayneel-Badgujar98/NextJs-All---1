// path  : `app/copilotkit/actions/EmailWritingAction.js`
"use client";
import { useCopilotAction } from "@copilotkit/react-core";
import { useState } from "react";

export default function EmailWritingAction() {

    const [emailData, setEmailData] = useState(null);
    useCopilotAction({
        name: "WriteEmail",
        description: "Writes an email based on the provided subject,body and recipient email address.",
        parameters: [
            { name: "subject", type: "string", description: "The subject of the email." },
            { name: "body", type: "string", description: "The body of the email." },
            { name: "recipientEmail", type: "string", description: "The recipient email of the email." }

        ],
        handler: async ({ subject, body, recipientEmail }) => {

            const res = await fetch("/api/sendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject,
                    body,
                    recipientEmail
                }),
            })
            const responseData = await res.json();
            if (!res.ok) {
                console.error("Error sending email:- ", responseData.message);
                return {
                    message: responseData.message,
                };
            }
            else{
                setEmailData({
                    subject: responseData.subject,
                    body: responseData.body,
                    recipientEmail: responseData.recipientEmail
                });
                console.log("Email sent successfully to " + responseData.recipientEmail + " with subject: " + responseData.subject);
                return {
                    message: responseData.message,
                    subject: responseData.subject,
                    body: responseData.body,
                    recipientEmail: responseData.recipientEmail 
                };
            }

        }
    });
    return (
        <div>
            <h2>Email Writing Action</h2>
            {emailData && (
                <div>
                    <h3>Email Details:</h3>
                    <p><strong>Subject:</strong> {emailData.subject}</p>
                    <p><strong>Body:</strong> {emailData.body}</p>
                    <p><strong>Recipient Email:</strong> {emailData.recipientEmail}</p>
                </div>
            )}
        </div>
    );
}