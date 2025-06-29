// POST /api/feedbackForm

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export async function POST(req) {
    try {
        const data = await req.json();
        if (data.name.trim() === '') return Response.json({ success: false, error: 'Name is required' }, { status: 400 })
        if (data.rating.trim() === '' || parseInt(data.rating) < 1) return Response.json({ success: false, error: 'Rating must be between 1 and 5' }, { status: 400 })
        if (data.feedback.trim() === '') return Response.json({ success: false, error: 'Feedback is required' }, { status: 400 })

        const feedbackData = await prisma.FeedbackForm.create({
            data: {
                name: data.name.trim(),
                rating: parseInt(data.rating),
                feedback: data.feedback.trim()
            }
        });
        return Response.json({ success: true, message: 'Feedback submitted successfully', data: feedbackData }, { status: 200 });

    } catch (error) {
        return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
    }
}