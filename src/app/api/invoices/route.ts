import { NextRequest, NextResponse } from "next/server"

// Demo invoices data
const demoInvoices = [
  { id: "1", invoiceNumber: "INV-2024-001", clientName: "Société ABC", total: 15000, status: "paid", dueDate: "2024-01-15" },
  { id: "2", invoiceNumber: "INV-2024-002", clientName: "Entreprise XYZ", total: 8500, status: "sent", dueDate: "2024-01-20" },
  { id: "3", invoiceNumber: "INV-2024-003", clientName: "Corp MAROC", total: 22000, status: "pending", dueDate: "2024-01-25" },
  { id: "4", invoiceNumber: "INV-2024-004", clientName: "Tech Solutions", total: 12000, status: "draft", dueDate: "2024-02-01" },
  { id: "5", invoiceNumber: "INV-2024-005", clientName: "Global Services", total: 18500, status: "overdue", dueDate: "2024-01-10" },
]

// GET all invoices
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    let filtered = demoInvoices
    if (status && status !== "all") {
      filtered = demoInvoices.filter(i => i.status === status)
    }

    const total = filtered.length
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    return NextResponse.json({
      invoices: paginated,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    })
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 })
  }
}

// CREATE a new invoice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newInvoice = {
      id: `invoice_${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(demoInvoices.length + 1).padStart(3, '0')}`,
      clientName: body.clientName || "Nouveau Client",
      total: body.total || 0,
      status: "draft",
      dueDate: body.dueDate || new Date().toISOString().split('T')[0],
      ...body
    }
    
    return NextResponse.json(newInvoice, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 })
  }
}
