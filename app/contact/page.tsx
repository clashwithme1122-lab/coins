import { Metadata } from 'next'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - Taksila Coins',
  description: 'Get in touch with the Taksila Coins team. We\'re here to help with your antique coin collecting and numismatic needs.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-base sm:text-lg lg:text-xl text-purple-100 mb-8 px-4">
              Have questions about antique coins? We're here to help. Reach out to our numismatic experts and we'll get back to you soon.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">mtalhakh24@gmail.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">+92 321 5060069</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-600">Pakistan</p>
                    <p className="text-sm text-gray-500">By appointment only</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                Expert Consultation
              </h3>
              <p className="text-gray-700 mb-4">
                Our numismatic experts are available for detailed coin appraisals and consultations. Schedule an appointment for personalized service.
              </p>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 text-sm sm:text-base">
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="appraisal">Coin Appraisal</option>
                  <option value="purchase">Purchase Inquiry</option>
                  <option value="consignment">Consignment</option>
                  <option value="technical">Technical Support</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions about our services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-3">How do you authenticate coins?</h3>
              <p className="text-gray-600 text-sm">Our experts use industry-standard authentication methods including metallurgical analysis and historical verification.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-3">Do you offer international shipping?</h3>
              <p className="text-gray-600 text-sm">Yes, we ship worldwide with full insurance and tracking. International rates vary by destination.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-3">What's your return policy?</h3>
              <p className="text-gray-600 text-sm">We offer a 30-day return policy for items that don't match their description. All coins are guaranteed authentic.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
