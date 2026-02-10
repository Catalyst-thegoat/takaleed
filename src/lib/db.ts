// Simple JSON-based database for development
// In production, replace with PostgreSQL/Prisma

import fs from "fs"
import path from "path"

const DB_PATH = path.join(process.cwd(), "data", "db.json")

interface Database {
  users: any[]
  clients: any[]
  invoices: any[]
  settings: any[]
}

const initialData: Database = {
  users: [],
  clients: [],
  invoices: [],
  settings: [],
}

function ensureDb() {
  const dataDir = path.dirname(DB_PATH)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2))
  }
}

function readDb(): Database {
  ensureDb()
  const data = fs.readFileSync(DB_PATH, "utf-8")
  return JSON.parse(data)
}

function writeDb(data: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export const db = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      const data = readDb()
      if (where.email) {
        return data.users.find((u) => u.email === where.email) || null
      }
      if (where.id) {
        return data.users.find((u) => u.id === where.id) || null
      }
      return null
    },
    create: async ({ data }: { data: any }) => {
      const dbData = readDb()
      const user = {
        id: `user_${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      dbData.users.push(user)
      writeDb(dbData)
      return user
    },
  },
  client: {
    findMany: async ({ where, include, orderBy, skip, take }: any = {}) => {
      const data = readDb()
      let clients = data.clients.filter((c) => c.userId === where.userId)
      
      if (include?._count?.select?.invoices) {
        clients = clients.map((c) => ({
          ...c,
          _count: { invoices: data.invoices.filter((i) => i.clientId === c.id).length },
        }))
      }
      
      return clients
    },
    count: async ({ where }: any) => {
      const data = readDb()
      return data.clients.filter((c) => c.userId === where.userId).length
    },
    create: async ({ data }: any) => {
      const dbData = readDb()
      const client = {
        id: `client_${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      dbData.clients.push(client)
      writeDb(dbData)
      return client
    },
  },
  invoice: {
    findMany: async ({ where, include, orderBy, skip, take }: any = {}) => {
      const data = readDb()
      let invoices = data.invoices.filter((i) => i.userId === where.userId)
      
      if (include?.client) {
        invoices = invoices.map((i) => ({
          ...i,
          client: data.clients.find((c) => c.id === i.clientId),
        }))
      }
      
      if (include?.items) {
        invoices = invoices.map((i) => ({
          ...i,
          items: data.invoices.filter((inv: any) => inv.id === i.id)[0]?.items || [],
        }))
      }
      
      // Sort by createdAt desc
      invoices.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      
      // Pagination
      if (skip) {
        invoices = invoices.slice(skip)
      }
      if (take) {
        invoices = invoices.slice(0, take)
      }
      
      return invoices
    },
    count: async ({ where }: any) => {
      const data = readDb()
      return data.invoices.filter((i) => i.userId === where.userId).length
    },
    create: async ({ data }: any) => {
      const dbData = readDb()
      const invoice = {
        id: `invoice_${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      dbData.invoices.push(invoice)
      writeDb(dbData)
      return invoice
    },
  },
}

export default db
