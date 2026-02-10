import { NextRequest, NextResponse } from "next/server"

// GET analytics dashboard data
export async function GET(request: NextRequest) {
  try {
    // Return demo data for now
    const demoData = {
      metrics: {
        totalInvoices: 47,
        paidInvoices: 32,
        pendingInvoices: 10,
        overdueInvoices: 3,
        draftInvoices: 2,
        totalRevenue: 125000,
        pendingAmount: 45000,
        overdueAmount: 15000,
        clientsCount: 25,
      },
      revenueByMonth: [
        { month: "2024-01", revenue: 45000 },
        { month: "2024-02", revenue: 52000 },
        { month: "2024-03", revenue: 48000 },
        { month: "2024-04", revenue: 61000 },
        { month: "2024-05", revenue: 55000 },
        { month: "2024-06", revenue: 67000 },
      ],
      topClients: [
        { name: "Société ABC", total: 35000 },
        { name: "Entreprise XYZ", total: 28000 },
        { name: "Corp MAROC", total: 22000 },
      ],
      recentInvoices: [
        { id: "1", invoiceNumber: "INV-2024-001", clientName: "Société ABC", total: 15000, status: "paid", dueDate: "2024-01-15" },
        { id: "2", invoiceNumber: "INV-2024-002", clientName: "Entreprise XYZ", total: 8500, status: "sent", dueDate: "2024-01-20" },
        { id: "3", invoiceNumber: "INV-2024-003", clientName: "Corp MAROC", total: 22000, status: "pending", dueDate: "2024-01-25" },
      ],
    }
    
    return NextResponse.json(demoData)

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30" // days

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // Get all invoices for the period
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: session.user.id,
        createdAt: { gte: startDate },
      },
      include: { client: true },
    })

    // Calculate metrics
    const totalInvoices = invoices.length
    const paidInvoices = invoices.filter((i) => i.status === "paid")
    const pendingInvoices = invoices.filter((i) => i.status === "sent")
    const overdueInvoices = invoices.filter((i) => i.status === "overdue")
    const draftInvoices = invoices.filter((i) => i.status === "draft")

    const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.total, 0)
    const pendingAmount = pendingInvoices.reduce((sum, i) => sum + i.total, 0)
    const overdueAmount = overdueInvoices.reduce((sum, i) => sum + i.total, 0)

    // Get revenue by month (last 12 months)
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

    const yearlyInvoices = await prisma.invoice.findMany({
      where: {
        userId: session.user.id,
        createdAt: { gte: twelveMonthsAgo },
        status: "paid",
      },
    })

    const revenueByMonth: Record<string, number> = {}
    for (let i = 0; i < 12; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      revenueByMonth[key] = 0
    }

    yearlyInvoices.forEach((invoice) => {
      const key = `${invoice.createdAt.getFullYear()}-${String(invoice.createdAt.getMonth() + 1).padStart(2, "0")}`
      if (revenueByMonth[key] !== undefined) {
        revenueByMonth[key] += invoice.total
      }
    })

    // Top clients by revenue
    const clientRevenue: Record<string, { name: string; total: number }> = {}
    paidInvoices.forEach((invoice) => {
      if (!clientRevenue[invoice.clientId]) {
        clientRevenue[invoice.clientId] = {
          name: invoice.client.name,
          total: 0,
        }
      }
      clientRevenue[invoice.clientId].total += invoice.total
    })

    const topClients = Object.values(clientRevenue)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    // Recent invoices
    const recentInvoices = await prisma.invoice.findMany({
      where: { userId: session.user.id },
      include: { client: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    })

    // Get total clients count
    const clientsCount = await prisma.client.count({
      where: { userId: session.user.id },
    })

    return NextResponse.json({
      metrics: {
        totalInvoices,
        paidInvoices: paidInvoices.length,
        pendingInvoices: pendingInvoices.length,
        overdueInvoices: overdueInvoices.length,
        draftInvoices: draftInvoices.length,
        totalRevenue,
        pendingAmount,
        overdueAmount,
        clientsCount,
      },
      revenueByMonth: Object.entries(revenueByMonth)
        .map(([month, revenue]) => ({ month, revenue }))
        .sort((a, b) => a.month.localeCompare(b.month)),
      topClients,
      recentInvoices: recentInvoices.map((invoice) => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        clientName: invoice.client.name,
        total: invoice.total,
        status: invoice.status,
        dueDate: invoice.dueDate,
      })),
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    )
  }
}
