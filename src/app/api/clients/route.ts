import { NextRequest, NextResponse } from "next/server"

// Demo clients data
const demoClients = [
  { id: "1", name: "Société ABC", email: "contact@abc.ma", phone: "+212 5XX XXX XXX", city: "Casablanca", totalInvoices: 5 },
  { id: "2", name: "Entreprise XYZ", email: "contact@xyz.ma", phone: "+212 6XX XXX XXX", city: "Rabat", totalInvoices: 3 },
  { id: "3", name: "Corp MAROC", email: "contact@corp.ma", phone: "+212 7XX XXX XXX", city: "Marrakech", totalInvoices: 8 },
  { id: "4", name: "Tech Solutions", email: "contact@tech.ma", phone: "+212 5XX XXX XXX", city: "Casablanca", totalInvoices: 2 },
  { id: "5", name: "Global Services", email: "contact@global.ma", phone: "+212 6XX XXX XXX", city: "Tanger", totalInvoices: 6 },
]

// GET all clients
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")

    let filtered = demoClients
    if (search) {
      filtered = demoClients.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    const total = filtered.length
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    return NextResponse.json({
      clients: paginated,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    })
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 })
  }
}

// CREATE a new client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newClient = {
      id: `client_${Date.now()}`,
      name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      city: body.city || null,
      totalInvoices: 0,
      ...body
    }
    
    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 })
  }
}
