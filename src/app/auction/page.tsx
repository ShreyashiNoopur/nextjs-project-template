"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

interface AuctionItem {
  id: number
  name: string
  category: string
  location: string
  harvestDate: string
  quantity: number
  basePrice: number
  currentBid: number
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C'
  timeLeft: number
  bidders: number
  description: string
}

const calculateGrade = (location: string, daysFromHarvest: number): 'A+' | 'A' | 'B+' | 'B' | 'C' => {
  const premiumLocations = ['Punjab', 'Haryana', 'Kerala', 'Karnataka']
  const goodLocations = ['Maharashtra', 'Gujarat', 'Tamil Nadu', 'Andhra Pradesh']
  
  let baseGrade = 0
  if (premiumLocations.includes(location)) baseGrade = 4
  else if (goodLocations.includes(location)) baseGrade = 3
  else baseGrade = 2
  
  // Reduce grade based on days from harvest
  if (daysFromHarvest <= 7) baseGrade += 1
  else if (daysFromHarvest <= 15) baseGrade += 0
  else if (daysFromHarvest <= 30) baseGrade -= 1
  else baseGrade -= 2
  
  const grades: ('A+' | 'A' | 'B+' | 'B' | 'C')[] = ['C', 'B', 'B+', 'A', 'A+']
  return grades[Math.max(0, Math.min(4, baseGrade))]
}

const calculatePrice = (basePrice: number, grade: string, quantity: number): number => {
  const gradeMultipliers = { 'A+': 1.5, 'A': 1.3, 'B+': 1.1, 'B': 1.0, 'C': 0.8 }
  const quantityDiscount = quantity > 100 ? 0.9 : quantity > 50 ? 0.95 : 1.0
  
  return Math.round(basePrice * gradeMultipliers[grade as keyof typeof gradeMultipliers] * quantityDiscount)
}

export default function AuctionPage() {
  const searchParams = useSearchParams()
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([])
  const [bidAmounts, setBidAmounts] = useState<{[key: number]: string}>({})
  const [bidQuantities, setBidQuantities] = useState<{[key: number]: string}>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    // Check for category parameter from URL
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    // Initialize auction items
    const items: Omit<AuctionItem, 'grade' | 'currentBid'>[] = [
      {
        id: 1,
        name: "Premium Basmati Rice",
        category: "Rice",
        location: "Punjab",
        harvestDate: "2024-01-10",
        quantity: 150,
        basePrice: 45,
        timeLeft: 3600,
        bidders: 12,
        description: "Premium quality basmati rice from Punjab farms"
      },
      {
        id: 2,
        name: "Organic Red Chili",
        category: "Spices",
        location: "Karnataka",
        harvestDate: "2024-01-05",
        quantity: 75,
        basePrice: 25,
        timeLeft: 2400,
        bidders: 8,
        description: "Organic red chili with high capsaicin content"
      },
      {
        id: 3,
        name: "Whole Wheat Flour",
        category: "Flour",
        location: "Haryana",
        harvestDate: "2024-01-15",
        quantity: 200,
        basePrice: 35,
        timeLeft: 1800,
        bidders: 15,
        description: "Fresh whole wheat flour from premium wheat"
      },
      {
        id: 4,
        name: "Fresh Potatoes",
        category: "Vegetables",
        location: "Maharashtra",
        harvestDate: "2024-01-20",
        quantity: 300,
        basePrice: 20,
        timeLeft: 4200,
        bidders: 6,
        description: "Fresh potatoes perfect for all cooking needs"
      },
      {
        id: 5,
        name: "Turmeric Powder",
        category: "Spices",
        location: "Kerala",
        harvestDate: "2024-01-08",
        quantity: 50,
        basePrice: 40,
        timeLeft: 3000,
        bidders: 10,
        description: "High-quality turmeric powder with rich color"
      },
      {
        id: 6,
        name: "Jasmine Rice",
        category: "Rice",
        location: "Tamil Nadu",
        harvestDate: "2024-01-25",
        quantity: 120,
        basePrice: 38,
        timeLeft: 5400,
        bidders: 9,
        description: "Aromatic jasmine rice with long grains"
      }
    ]

    const processedItems = items.map(item => {
      const daysFromHarvest = Math.floor((new Date().getTime() - new Date(item.harvestDate).getTime()) / (1000 * 3600 * 24))
      const grade = calculateGrade(item.location, daysFromHarvest)
      const currentBid = calculatePrice(item.basePrice, grade, item.quantity)
      
      return {
        ...item,
        grade,
        currentBid
      }
    })

    setAuctionItems(processedItems)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionItems(prev => prev.map(item => ({
        ...item,
        timeLeft: Math.max(0, item.timeLeft - 1)
      })))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleBid = (itemId: number) => {
    const bidAmount = parseFloat(bidAmounts[itemId] || '0')
    const bidQuantity = parseFloat(bidQuantities[itemId] || '0')
    const item = auctionItems.find(i => i.id === itemId)
    
    if (!item) return
    
    if (bidAmount <= item.currentBid) {
      alert('Bid amount must be higher than current bid!')
      return
    }
    
    if (bidQuantity <= 0 || bidQuantity > item.quantity) {
      alert(`Quantity must be between 1 and ${item.quantity}kg!`)
      return
    }

    const totalBidAmount = bidAmount * bidQuantity

    setAuctionItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            currentBid: bidAmount, 
            bidders: item.bidders + 1,
            quantity: item.quantity - bidQuantity
          }
        : item
    ))
    
    setBidAmounts(prev => ({ ...prev, [itemId]: '' }))
    setBidQuantities(prev => ({ ...prev, [itemId]: '' }))
    alert(`Bid placed successfully! Total amount: ₹${totalBidAmount} for ${bidQuantity}kg`)
  }

  const getGradeColor = (grade: string): string => {
    const colors = {
      'A+': 'bg-green-500',
      'A': 'bg-green-400',
      'B+': 'bg-yellow-500',
      'B': 'bg-yellow-400',
      'C': 'bg-red-400'
    }
    return colors[grade as keyof typeof colors] || 'bg-gray-400'
  }

  const calculateTotalBid = (itemId: number): number => {
    const bidAmount = parseFloat(bidAmounts[itemId] || '0')
    const bidQuantity = parseFloat(bidQuantities[itemId] || '0')
    return bidAmount * bidQuantity || 0
  }

  const filteredItems = selectedCategory === 'all' 
    ? auctionItems 
    : auctionItems.filter(item => item.category === selectedCategory)

  const categories = ['all', ...Array.from(new Set(auctionItems.map(item => item.category)))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-900">BID BAZZAAR</a>
              <span className="ml-4 text-lg text-gray-600">Live Auction</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Auction Rules */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Auction Rules & Grading System</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Grading System:</h4>
                <ul className="space-y-1 text-sm">
                  <li><Badge className="bg-green-500 mr-2">A+</Badge>Premium locations + Fresh (≤7 days)</li>
                  <li><Badge className="bg-green-400 mr-2">A</Badge>Premium locations + Good (≤15 days)</li>
                  <li><Badge className="bg-yellow-500 mr-2">B+</Badge>Good locations + Fresh</li>
                  <li><Badge className="bg-yellow-400 mr-2">B</Badge>Standard quality</li>
                  <li><Badge className="bg-red-400 mr-2">C</Badge>Lower grade or older harvest</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Pricing Rules:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Higher grade = Higher price multiplier</li>
                  <li>• Quantity {'>'}100kg = 10% discount</li>
                  <li>• Quantity {'>'}50kg = 5% discount</li>
                  <li>• Location affects base grade</li>
                  <li>• Freshness affects final grade</li>
                  <li>• <strong>Bid = Price per kg × Quantity</strong></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Auction Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge className={`${getGradeColor(item.grade)} text-white`}>
                    Grade {item.grade}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>📍 {item.location}</p>
                  <p>📦 {item.quantity}kg available</p>
                  <p>🕒 Harvested: {new Date(item.harvestDate).toLocaleDateString()}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">{item.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Bid:</span>
                    <span className="text-xl font-bold text-green-600">₹{item.currentBid}/kg</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Time Left:</span>
                    <span className="text-sm font-mono text-red-600">
                      {formatTime(item.timeLeft)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bidders:</span>
                    <span className="text-sm text-blue-600">{item.bidders} active</span>
                  </div>
                  
                  {item.timeLeft > 0 && item.quantity > 0 ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`bid-${item.id}`} className="text-xs text-gray-600">
                            Bid per kg (₹)
                          </Label>
                          <Input
                            id={`bid-${item.id}`}
                            type="number"
                            placeholder={`Min: ₹${item.currentBid + 1}`}
                            value={bidAmounts[item.id] || ''}
                            onChange={(e) => setBidAmounts(prev => ({
                              ...prev,
                              [item.id]: e.target.value
                            }))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`quantity-${item.id}`} className="text-xs text-gray-600">
                            Quantity (kg)
                          </Label>
                          <Input
                            id={`quantity-${item.id}`}
                            type="number"
                            placeholder={`Max: ${item.quantity}`}
                            value={bidQuantities[item.id] || ''}
                            onChange={(e) => setBidQuantities(prev => ({
                              ...prev,
                              [item.id]: e.target.value
                            }))}
                            className="w-full"
                            max={item.quantity}
                            min="1"
                          />
                        </div>
                      </div>
                      
                      {bidAmounts[item.id] && bidQuantities[item.id] && (
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <span className="text-sm text-gray-600">Total Bid: </span>
                          <span className="font-bold text-green-600">
                            ₹{calculateTotalBid(item.id).toLocaleString()}
                          </span>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleBid(item.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={
                          !bidAmounts[item.id] || 
                          !bidQuantities[item.id] ||
                          parseFloat(bidAmounts[item.id]) <= item.currentBid ||
                          parseFloat(bidQuantities[item.id]) <= 0 ||
                          parseFloat(bidQuantities[item.id]) > item.quantity
                        }
                      >
                        Place Bid
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <Badge variant="destructive">
                        {item.timeLeft <= 0 ? 'Auction Ended' : 'Out of Stock'}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
