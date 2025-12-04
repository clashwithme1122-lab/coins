'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Warehouse, CheckCircle, Clock, Users, Star } from 'lucide-react';
import DynamicServiceCard from '@/components/DynamicServiceCard';
import { services, serviceFAQs } from '@/lib/data/services';

interface ServicesPageContentProps {
  services: typeof services;
  serviceFAQs: typeof serviceFAQs;
}

export default function ServicesPageContent({ 
  services, 
  serviceFAQs 
}: ServicesPageContentProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Coin Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Expert authentication, professional grading, and secure storage solutions 
              for your valuable numismatic collection
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Professional Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive numismatic services handled by certified experts with decades of experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <DynamicServiceCard
                key={service.id}
                {...service}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Trust Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry certifications and professional standards you can rely on
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="p-3 bg-blue-50 rounded-lg inline-block mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">PCGS Certified</h3>
              <p className="text-sm text-gray-600">Professional Coin Grading Service authorized dealer</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center"
            >
              <div className="p-3 bg-green-50 rounded-lg inline-block mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">NGC Approved</h3>
              <p className="text-sm text-gray-600">Numismatic Guaranty Corporation submission center</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="p-3 bg-purple-50 rounded-lg inline-block mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ANSI Standards</h3>
              <p className="text-sm text-gray-600">American Numismatic Society standards compliance</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center"
            >
              <div className="p-3 bg-orange-50 rounded-lg inline-block mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-sm text-gray-600">Decades of combined numismatic experience</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our professional coin services
            </p>
          </motion.div>

          <div className="space-y-6">
            {serviceFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <a href="https://www.pcgs.com/services" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              PCGS - Professional Coin Grading Services
            </a>
            <a href="https://www.ngccoin.com/submit/services-fees/ngc/" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              NGC - Grading Services and Fees
            </a>
            <a href="https://accuratepmr.com/blog/understanding-coin-grading-how-to-certify-with-pcgs-and-ngc/" 
               className="text-blue-600 hover:text-blue-700 underline" 
               target="_blank" 
               rel="noopener noreferrer">
              Accurate PMR - Coin Grading Certification Guide
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
