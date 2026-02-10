import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "MAD"): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string, locale: string = "fr-MA"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function generateInvoiceNumber(prefix: string = "INV"): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}-${year}${month}${day}-${random}`
}

export function calculateTax(amount: number, taxRate: number): number {
  return Math.round(amount * (taxRate / 100) * 100) / 100
}

export function getTaxLabel(taxType: string, rate: number): string {
  if (taxType === "inclusive") {
    return `TVA comprise (${rate}%)`
  }
  return `TVA ${rate}%`
}

export function calculateDueDate(issueDate: Date, days: number): Date {
  const dueDate = new Date(issueDate)
  dueDate.setDate(dueDate.getDate() + days)
  return dueDate
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-800",
    sent: "bg-blue-100 text-blue-800",
    paid: "bg-green-100 text-green-800",
    overdue: "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return colors[status] || colors.draft
}

export function validateICE(ice: string): boolean {
  // ICE format: 15 digits for businesses
  return /^\d{15}$/.test(ice)
}

export function validateIF(ifNumber: string): boolean {
  // IF format: varies but typically 7 digits
  return /^\d{7}$/.test(ifNumber)
}
