import { Metadata } from 'next'
import { Users, Target, Shield, Globe, Award, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Taksila Coins',
  description: 'Learn about Taksila Coins - the premier antique and valuable coin marketplace connecting collectors with historical treasures.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Taksila Coins</h1>
            <p className="text-xl text-purple-100 mb-8">
              Connecting collectors with the world's finest antique and historical coins since 1985
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To preserve and share numismatic history by providing collectors with authentic, 
            professionally graded coins while fostering a global community of passionate enthusiasts.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Active Collectors', value: '50K+', description: 'Worldwide community' },
            { icon: Globe, label: 'Countries', value: '75+', description: 'Global shipping' },
            { icon: Shield, label: 'Authenticity', value: '100%', description: 'Guaranteed genuine' },
            { icon: Award, label: 'Expert Rating', value: '4.9/5', description: 'Customer satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                <stat.icon className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 1985 by renowned numismatist Dr. James Harrington, Taksila Coins began as a small family-run shop 
                specializing in ancient Roman and Greek coins. What started as a passion for preserving history has grown into 
                one of the world's most trusted coin marketplaces.
              </p>
              <p className="text-gray-600 mb-4">
                Over the past four decades, we've helped over 50,000 collectors build their dream collections, from beginners 
                seeking their first ancient coin to seasoned investors acquiring rare treasures. Our commitment to authenticity, 
                professional grading, and expert customer service has made us the go-to destination for serious collectors.
              </p>
              <p className="text-gray-600">
                Today, Taksila Coins stands at the intersection of tradition and technology, combining decades of numismatic 
                expertise with modern marketplace features to bring the world of coin collecting to enthusiasts everywhere.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">38 Years of Excellence</h3>
                <p className="text-gray-600 mt-2">Trusted by collectors worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Authenticity Guaranteed',
                description: 'Every coin we sell is professionally authenticated and graded by expert numismatists with full money-back guarantees.'
              },
              {
                icon: Zap,
                title: 'Expert Knowledge',
                description: 'Our team of certified numismatists brings decades of experience to help collectors make informed decisions.'
              },
              {
                icon: Users,
                title: 'Collector Community',
                description: 'We foster a welcoming community where collectors can share knowledge, showcase collections, and learn from experts.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="p-4 bg-purple-100 rounded-lg inline-block mb-4">
                  <value.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Dr. James Harrington', role: 'Founder & Chief Numismatist', bio: '38 years experience, ancient coin specialist' },
              { name: 'Sarah Mitchell', role: 'Head of Authentication', bio: 'Certified grader, former museum curator' },
              { name: 'Robert Chen', role: 'Market Director', bio: 'Expert in US and world coins, auction veteran' },
              { name: 'Maria Rodriguez', role: 'Customer Relations', bio: 'Collector advocate, 15 years with Taksila' }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-purple-50 rounded-lg h-48 mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-purple-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Milestones & Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { year: '2023', achievement: 'Launched online marketplace serving 50,000+ collectors' },
              { year: '2020', achievement: 'Expanded to include rare world coins and bullion' },
              { year: '2015', achievement: 'Opened authentication and grading service center' },
              { year: '2008', achievement: 'Published "The Collector\'s Guide to Ancient Coins"' },
              { year: '1995', achievement: 'Expanded to international shipping and exports' },
              { year: '1985', achievement: 'Founded as family coin shop in New York' }
            ].map((milestone, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">{milestone.year}</div>
                <div className="text-gray-700">{milestone.achievement}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Rare Coin Sales',
                description: 'Curated collection of ancient, US, and world coins with full authentication'
              },
              {
                title: 'Professional Appraisal',
                description: 'Expert valuation services for collections and individual coins'
              },
              {
                title: 'Authentication & Grading',
                description: 'Professional coin grading and certification services'
              }
            ].map((service, index) => (
              <div key={index} className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Become part of the world's most trusted coin marketplace. Start your collecting journey with Taksila Coins today.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/coins" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Coins
            </a>
            <a href="/contact" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Contact Experts
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
