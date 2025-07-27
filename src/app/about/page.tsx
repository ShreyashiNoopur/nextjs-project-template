"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">BID BAZZAAR</a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-gray-900">HOME</a>
              <a href="/auction" className="text-gray-700 hover:text-gray-900">SHOP BIDDING</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900">ABOUT</a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900">CONTACT</a>
            </nav>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* About Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900 mb-6">
              About Bid Bazzaar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Bid Bazzaar is a groundbreaking platform designed to revolutionize digital food trading. 
                We serve as a comprehensive marketplace where buyers and sellers can engage in transparent, 
                efficient, and competitive bidding processes for various food products.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Our platform bridges the gap between agricultural producers, wholesalers, retailers, and 
                consumers by providing a centralized digital space for food commerce. We specialize in 
                raw materials including rice, spices, flour, and fresh vegetables.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a transparent, efficient, and fair marketplace that benefits both producers 
                and consumers while reducing food waste and promoting sustainable trading practices.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How It Works</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Products are graded based on location and harvest freshness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dynamic pricing based on grade, quantity, and market demand</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Real-time bidding with transparent pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Direct connection between farmers and buyers</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Values</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Transparency</h4>
                  <p className="text-gray-600">Open pricing and grading systems</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fairness</h4>
                  <p className="text-gray-600">Equitable pricing for all stakeholders</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sustainability</h4>
                  <p className="text-gray-600">Reducing food waste through efficient trading</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                  <p className="text-gray-600">Modern technology for traditional trading</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
