// app/api/logout/route.js
import { NextResponse } from 'next/server';

export function POST() {
    // const token = req.cookies.get('admin-token')?.value;
    try {
        const res = NextResponse.json({ message: 'Token deleted successfully' });
        res.cookies.set('admin-token', '', {
            httpOnly: true,
            maxAge: 0,
            path: '/',
        });
        return res;
    }
    catch (err) {
        console.log(err.message);
    }
}