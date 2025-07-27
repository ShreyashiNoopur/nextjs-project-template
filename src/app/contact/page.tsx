"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
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

      {/* Contact Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900 mb-6">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-700">visionstrikers@gmail.com</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-700">Sunday to Thursday</p>
                      <p className="text-gray-700">7:00 AM - 6:00 PM</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900">Response Time</h4>
                      <p className="text-gray-700">We typically respond within 24 hours during business days</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Details</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Company:</strong> Bid Bazzaar Trading Platform</p>
                    <p><strong>Email:</strong> visionstrikers@gmail.com</p>
                    <p><strong>Hours:</strong> Sun-Thu, 7AM-6PM</p>
                    <p><strong>Services:</strong> Agricultural Commodity Trading</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="What's this about?" 
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Immediate Assistance?</h3>
                <p className="text-gray-700">
                  Email us at <a href="mailto:visionstrikers@gmail.com" className="text-blue-600 hover:underline">
                    visionstrikers@gmail.com
                  </a> and we'll get back to you during our business hours:
                </p>
                <p className="text-gray-700 font-semibold mt-2">
                  Sunday to Thursday • 7:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
