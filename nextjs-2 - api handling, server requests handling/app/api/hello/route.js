
export async function POST(req) {
    try {
        const { username, email } = await req.json()
        if (username.trim() === "" || email.trim() === "" ) {
            return Response.json({success : false, message :"Please provide username and email"}, { status: 400 })
        }
        if(!email.includes("@")) {
            return Response.json({success : false, message : "Please provide a valid email"}, { status: 400 })
        }
        return Response.json({success : true, message : `Username :- ${username} and Email :- ${email}`}, { status: 201 });
    }
    catch (error) {
        return Response.json({success : false, message :"Internal Server Error"}, { status: 500 });
    }
}
export async function GET() {
    return new Response("Hello from GET method")
}
export async function PUT(req) {
    const { name } = await req.json();
    return Response.json({ newName: `${name} updated` })
}
export async function DELETE(req) {
    const { name } = await req.json();
    return Response.json({ deletedName: `${name} deleted` })
}