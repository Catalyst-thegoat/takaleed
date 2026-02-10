import type { Metadata } from "next"
import ClientLayout from "./client-layout"
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: "Takaleed - Plateforme de facturation marocaine",
  description: "Créez des factures conformes TVA 20%, gérez vos clients et suivez vos paiements.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </body>
    </html>
  )
}
