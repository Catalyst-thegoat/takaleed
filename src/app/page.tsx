"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, CreditCard, FileText, Globe, Shield, Zap, BarChart3, Users, Clock, TrendingUp, Menu, X, ChevronRight } from "@heroicons/react/24/outline"
import { useState } from "react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const features = [
  {
    icon: FileText,
    title: "Factures conformes TVA",
    description: "Générez des factures 100% conformes à la réglementation marocaine avec TVA 20% et mentions légales obligatoires.",
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50"
  },
  {
    icon: Globe,
    title: "Support Arabe & Français",
    description: "Interface bilingue complète avec factures disponibles en arabe et en français.",
    gradient: "from-indigo-500 to-purple-500",
    bgLight: "bg-indigo-50"
  },
  {
    icon: CreditCard,
    title: "Paiements en ligne",
    description: "Acceptez les paiements par carte bancaire via Stripe instantanément.",
    gradient: "from-green-500 to-emerald-500",
    bgLight: "bg-green-50"
  },
  {
    icon: Shield,
    title: "Mentions légales complètes",
    description: "ICE, IF, RC, Patent - Toutes les informations obligatoires automatiquement.",
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50"
  },
  {
    icon: TrendingUp,
    title: "Analytics & Rapports",
    description: "Tableaux de bord détaillés pour suivre votre activité et vos revenus.",
    gradient: "from-rose-500 to-pink-500",
    bgLight: "bg-rose-50"
  },
  {
    icon: Clock,
    title: "Rappels automatiques",
    description: "Ne manquez plus un paiement avec les rappels automatiques par email.",
    gradient: "from-violet-500 to-purple-500",
    bgLight: "bg-violet-50"
  }
]

const stats = [
  { value: "5000+", label: "Entreprises" },
  { value: "50M DH", label: "Facturé/mois" },
  { value: "99.9%", label: "Disponibilité" },
  { value: "24/7", label: "Support" }
]

const pricing = [
  {
    name: "Gratuit",
    price: "0",
    description: "Pour commencer",
    features: ["10 factures/mois", "5 clients", "Export PDF", "Support email"],
    current: false
  },
  {
    name: "Pro",
    price: "199",
    description: "Pour les pros",
    features: ["Factures illimitées", "Clients illimités", "Paiements en ligne", "Rappels automatiques", "API Access"],
    popular: true,
    current: true
  },
  {
    name: "Enterprise",
    price: "499",
    description: "Pour les équipes",
    features: ["Tout en Pro", "Multi-utilisateurs", "Support dédié", "Formation incluse", "Custom branding"],
    current: false
  }
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        </div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full">
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[160px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xl">
                  ت
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Takaleed
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["Fonctionnalités", "Tarifs", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-4"
            >
              <a href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                Connexion
              </a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25"
              >
                Essai gratuit
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-white/10 bg-[#0a0a0f]"
          >
            <div className="px-4 py-4 space-y-4">
              {["Fonctionnalités", "Tarifs", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <a href="/login" className="block text-gray-400 hover:text-white">Connexion</a>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl"
                >
                  Essai gratuit
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeIn} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm">
                <Zap className="h-4 w-4" />
                100% conforme aux normes marocaines
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeIn} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">La facturation</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                nouvelle génération
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeIn} className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Créez des factures professionnelles conformes TVA 20%, gérez vos clients 
              et suivez vos paiements en toute simplicité. Conçu pour les entrepreneurs marocains.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/25 flex items-center gap-3"
              >
                Commencer gratuitement
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/5 transition-colors flex items-center gap-3"
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                Voir la démo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative mt-20"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10" />
            
            <div className="relative rounded-2xl border border-white/10 bg-[#0d0d14] overflow-hidden shadow-2xl shadow-black/50">
              {/* Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center text-sm text-gray-500 font-mono">
                  takaleed.ma/dashboard
                </div>
              </div>
              
              {/* Dashboard Preview */}
              <div className="aspect-[16/9] bg-gradient-to-br from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] relative overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5" 
                     style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                
                {/* Mock Dashboard UI */}
                <div className="absolute inset-0 p-8 flex gap-6">
                  {/* Sidebar */}
                  <div className="w-20 bg-white/5 rounded-2xl border border-white/10" />
                  {/* Main Content */}
                  <div className="flex-1 space-y-4">
                    <div className="h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10" />
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/10" />
                      ))}
                    </div>
                    <div className="h-64 bg-white/5 rounded-xl border border-white/10" />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalités" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tout ce dont vous avez besoin
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-400 max-w-2xl mx-auto">
              Des fonctionnalités complètes adaptées aux besoins spécifiques des entreprises marocaines
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-8 rounded-2xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl overflow-hidden"
              >
                {/* Gradient glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${feature.bgLight} mb-4`}>
                  <feature.icon className={`h-6 w-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                {/* Hover arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute bottom-8 left-8"
                >
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Morocco Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                🇲🇦 Conçu pour les entreprises marocaines
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Takaleed comprend les spécificités du paysage entrepreneurial marocain 
                et offre des fonctionnalités adaptées à vos besoins.
              </p>
              
              <div className="space-y-4">
                {[
                  "TVA 20% et autres taux (14%, 10%, 7%, 0%)",
                  "ICE - Identifiant Commun de l'Entreprise",
                  "IF - Identifiant Fiscal",
                  "RC - Immatriculation au Registre de Commerce",
                  "Patente et centre d'immatriculation",
                  "Devise MAD avec formatage automatique"
                ].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-400" />
                    </div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Invoice Preview Card */}
              <div className="relative rounded-2xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-2xl p-8 shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/10">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Facture #</div>
                    <div className="text-2xl font-bold text-white">INV-2024-001</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Date</div>
                    <div className="text-white font-medium">15 Janvier 2024</div>
                  </div>
                </div>

                {/* Company Info */}
                <div className="mb-8">
                  <div className="text-sm text-gray-400 mb-1">De</div>
                  <div className="text-white font-medium">Votre Entreprise SARL</div>
                  <div className="text-gray-500 text-sm">123, Avenue Mohammed V</div>
                  <div className="text-gray-500 text-sm">Casablanca, Maroc</div>
                  <div className="text-gray-500 text-sm">ICE: 123456789012345</div>
                </div>

                {/* Line Items */}
                <div className="space-y-3 mb-6">
                  {[
                    { desc: "Service de consulting", qty: "10h", price: "500" },
                    { desc: "Développement web", qty: "40h", price: "800" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                      <div>
                        <div className="text-white">{item.desc}</div>
                        <div className="text-gray-500 text-sm">{item.qty} × {item.price} MAD</div>
                      </div>
                      <div className="text-white font-medium">{(parseFloat(item.qty) * parseFloat(item.price)).toLocaleString()} MAD</div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-gray-400">
                    <span>Sous-total</span>
                    <span>37,000 MAD</span>
                  </div>
                  <div className="flex justify-between text-amber-400">
                    <span>TVA (20%)</span>
                    <span>7,400 MAD</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>44,400 MAD</span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-amber-500/25"
              >
                Conforme à la loi marocaine ✓
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tarifs simples et transparents
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-400">
              Pas de frais cachés. Facturez autant que vous voulez.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-2xl border ${
                  plan.popular 
                    ? "border-blue-500/50 bg-[#0d0d14]/80" 
                    : "border-white/10 bg-[#0d0d14]/40"
                } backdrop-blur-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full">
                    Populaire
                  </div>
                )}

                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400"> DH/mois</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300 text-sm">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                      : "border border-white/20 text-white hover:bg-white/5"
                  }`}
                >
                  {plan.name === "Gratuit" ? "Commencer" : "Essai gratuit"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-2xl overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prêt à simplifier votre facturation ?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez plus de 5000 entrepreneurs marocains qui font confiance à Takaleed
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/25"
              >
                Créer mon compte gratuit
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                ت
              </div>
              <span className="font-bold text-white">Takaleed</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 Takaleed. Fait avec ❤️ au Maroc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
