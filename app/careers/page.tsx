import { Metadata } from 'next'
import { MapPin, DollarSign, Clock, Users, Briefcase, Heart, Rocket, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers - CryptoCoin',
  description: 'Join the CryptoCoin team. Explore career opportunities in cryptocurrency, fintech, and blockchain technology.',
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-purple-100 mb-8">
              Help us build the future of cryptocurrency trading and analytics
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold">150+</div>
                <div className="text-purple-200">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold">15+</div>
                <div className="text-purple-200">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold">500K+</div>
                <div className="text-purple-200">Users Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Join CryptoCoin?</h2>
          <p className="text-xl text-gray-600">
            Be part of a team that's revolutionizing the cryptocurrency industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Rocket,
              title: 'Innovation',
              description: 'Work on cutting-edge technology in the rapidly evolving crypto space'
            },
            {
              icon: Users,
              title: 'Great Team',
              description: 'Collaborate with talented individuals from diverse backgrounds'
            },
            {
              icon: Target,
              title: 'Growth',
              description: 'Accelerated career growth with learning and development opportunities'
            },
            {
              icon: Heart,
              title: 'Culture',
              description: 'Inclusive environment where your ideas and contributions matter'
            }
          ].map((benefit, index) => (
            <div key={index} className="crypto-card text-center">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-4">
                <benefit.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Open Positions */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
          
          <div className="space-y-6">
            {[
              {
                title: 'Senior Frontend Developer',
                department: 'Engineering',
                location: 'San Francisco, CA / Remote',
                type: 'Full-time',
                description: 'Build and maintain our web trading platform using React, TypeScript, and modern web technologies.',
                requirements: ['5+ years of React experience', 'TypeScript expertise', 'Experience with trading platforms', 'Strong problem-solving skills']
              },
              {
                title: 'Backend Engineer',
                department: 'Engineering',
                location: 'San Francisco, CA',
                type: 'Full-time',
                description: 'Design and implement scalable backend systems for our cryptocurrency trading infrastructure.',
                requirements: ['4+ years of backend development', 'Experience with Node.js/Python', 'Knowledge of blockchain technology', 'Database design skills']
              },
              {
                title: 'Product Manager',
                department: 'Product',
                location: 'San Francisco, CA / Remote',
                type: 'Full-time',
                description: 'Drive product strategy and development for our cryptocurrency trading platform.',
                requirements: ['3+ years of product management', 'Fintech/crypto experience', 'Strong analytical skills', 'Excellent communication']
              },
              {
                title: 'Security Engineer',
                department: 'Security',
                location: 'San Francisco, CA',
                type: 'Full-time',
                description: 'Ensure the security and integrity of our platform and user assets.',
                requirements: ['4+ years of security experience', 'Knowledge of crypto security', 'Security certifications', 'Incident response experience']
              },
              {
                title: 'Data Scientist',
                department: 'Analytics',
                location: 'Remote',
                type: 'Full-time',
                description: 'Develop machine learning models for market analysis and trading signals.',
                requirements: ['3+ years of data science experience', 'Python/R expertise', 'Machine learning knowledge', 'Financial modeling experience']
              },
              {
                title: 'Customer Success Manager',
                department: 'Support',
                location: 'Remote',
                type: 'Full-time',
                description: 'Help our users get the most value from our platform and ensure their success.',
                requirements: ['2+ years of customer success', 'Crypto knowledge preferred', 'Excellent communication skills', 'Problem-solving mindset']
              }
            ].map((job, index) => (
              <div key={index} className="crypto-card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 crypto-button">
                    Apply Now
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{job.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: 'Competitive Salary',
                description: 'Market-leading compensation with equity options'
              },
              {
                icon: Heart,
                title: 'Health Insurance',
                description: 'Comprehensive medical, dental, and vision coverage'
              },
              {
                icon: Clock,
                title: 'Flexible Work',
                description: 'Remote-friendly with flexible working hours'
              },
              {
                icon: Target,
                title: 'Professional Development',
                description: 'Budget for courses, conferences, and certifications'
              },
              {
                icon: Users,
                title: 'Team Events',
                description: 'Regular team building activities and retreats'
              },
              {
                icon: Rocket,
                title: 'Crypto Benefits',
                description: 'Get paid in cryptocurrency and trading fee discounts'
              }
            ].map((benefit, index) => (
              <div key={index} className="crypto-card">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <benefit.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Culture</h2>
          <div className="crypto-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <div className="space-y-4">
                  {[
                    'Innovation - We push boundaries and challenge the status quo',
                    'Integrity - We operate with transparency and honesty',
                    'Excellence - We strive for the highest quality in everything we do',
                    'Collaboration - We work together to achieve common goals',
                    'Customer Focus - Our users are at the center of every decision',
                    'Continuous Learning - We embrace curiosity and personal growth'
                  ].map((value, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Life at CryptoCoin</h3>
                <p className="text-gray-600 mb-4">
                  We're a diverse team of passionate individuals united by our mission to democratize 
                  access to professional cryptocurrency trading tools. We believe in work-life balance, 
                  continuous learning, and creating an environment where everyone can do their best work.
                </p>
                <p className="text-gray-600 mb-4">
                  From daily standups to quarterly hackathons, we foster a culture of collaboration 
                  and innovation. We celebrate wins together, learn from failures, and always keep 
                  our users' needs at the forefront of everything we do.
                </p>
                <p className="text-gray-600">
                  Whether you're in our San Francisco office or working remotely, you'll be part of 
                  a supportive community that values your unique perspective and contributions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-purple-100 mb-6">
            Help us build the future of cryptocurrency trading
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#open-positions" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Open Positions
            </a>
            <a href="/contact" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Contact Recruiting
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
