import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ShieldCheck, Globe, CreditCard, Award } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    marketplace: [
      { name: 'Browse Coins', href: '/coins' },
      { name: 'New Acquisitions', href: '/new' },
      { name: 'Roman Empire', href: '/coins?era=roman' },
      { name: 'Mughal Dynasty', href: '/coins?era=mughal' },
    ],
    services: [
      { name: 'Professional Appraisal', href: '/appraisal' },
      { name: 'Authentication Services', href: '/authentication' },
      { name: 'Consign with Us', href: '/consign' },
    ],
    resources: [
      { name: 'Collector\'s Guide', href: '/guide' },
      { name: 'Numismatic Blog', href: '/blog' },
      { name: 'Market Intelligence', href: '/analysis' },
      { name: 'Investment Strategy', href: '/investing' },
    ],
    support: [
      { name: 'Client Services', href: '/help' },
      { name: 'Contact Exerts', href: '/contact' },
      { name: 'Secure Shipping', href: '/shipping' },
      { name: 'Returns & Authenticity Guarantee', href: '/returns' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-gray-800 relative z-10 overflow-hidden">
      {/* Trust Banner */}
      <div className="border-b border-gray-800 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <ShieldCheck className="w-8 h-8 text-amber-500" />
              <h4 className="text-white font-semibold">Lifetime Authenticity</h4>
              <p className="text-sm text-gray-500">Every piece includes a certified guarantee.</p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <Award className="w-8 h-8 text-amber-500" />
              <h4 className="text-white font-semibold">30+ Years Experience</h4>
              <p className="text-sm text-gray-500">Trusted by expert numismatists globally.</p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <Globe className="w-8 h-8 text-amber-500" />
              <h4 className="text-white font-semibold">Insured Global Shipping</h4>
              <p className="text-sm text-gray-500">Secure delivery to your collection.</p>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-2">
              <CreditCard className="w-8 h-8 text-amber-500" />
              <h4 className="text-white font-semibold">Secure Transactions</h4>
              <p className="text-sm text-gray-500">Encrypted payments for high-value assets.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-700 rounded flex items-center justify-center shadow-lg">
                <span className="text-[#0a0a0a] font-playfair font-bold text-xl">T</span>
              </div>
              <span className="font-playfair font-bold text-2xl text-white tracking-widest uppercase">Taksila Coins</span>
            </div>
            
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Purveyors of museum-quality antiquities and rare numismatic treasures. 
              Our curators have authenticated and placed over <strong className="text-amber-500 font-bold">15,000+</strong> historical pieces in private collections worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 mr-3 text-amber-500" />
                <a href="mailto:contact@taksilacoins.com">contact@taksilacoins.com</a>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 mr-3 text-amber-500" />
                <a href="tel:+923215060069">+92 321 5060069</a>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-5 h-5 mr-3 text-amber-500" />
                <span>Islamabad, Pakistan (Global Dispatch Center)</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 bg-[#1a1a1a] rounded-full hover:bg-amber-600 hover:text-white transition-all block text-gray-400 border border-gray-800"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-playfair font-bold text-lg mb-6 tracking-wide uppercase">Collection</h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-playfair font-bold text-lg mb-6 tracking-wide uppercase">Expertise</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-playfair font-bold text-lg mb-6 tracking-wide uppercase">Insight</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              © {currentYear} Taksila Coins LLC. All acquisitions subject to our Authenticity Guarantee.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/terms" className="text-gray-500 hover:text-amber-500 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-amber-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/shipping" className="text-gray-500 hover:text-amber-500 transition-colors">
                Shipping & Vaulting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
