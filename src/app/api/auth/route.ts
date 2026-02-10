import { NextResponse } from "next/server"

// Simple auth endpoints - demo mode
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, email, password } = body

    if (action === "login") {
      // Demo login - accept any credentials
      return NextResponse.json({
        user: {
          id: "demo_user",
          email: email || "demo@example.com",
          name: "Demo User",
        },
        token: "demo_token"
      })
    }

    if (action === "register") {
      return NextResponse.json({
        user: {
          id: `user_${Date.now()}`,
          email,
          name: email.split("@")[0],
        },
        token: `token_${Date.now()}`
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
