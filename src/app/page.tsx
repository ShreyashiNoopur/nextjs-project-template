"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const handleStartBidding = () => {
    router.push('/auction')
  }

  const handleProductClick = (productName: string) => {
    router.push(`/auction?category=${productName.split(' ')[0]}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">BID BAZZAAR</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-gray-900">HOME</a>
              <a href="/auction" className="text-gray-700 hover:text-gray-900">SHOP BIDDING</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900">ABOUT</a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900">CONTACT</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-orange-100 to-yellow-100">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div 
          className="h-full bg-cover bg-center relative"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkZGN0VEIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNGRjk1MDAiLz4KPGNpcmNsZSBjeD0iNDAwIiBjeT0iMjAwIiByPSI2MCIgZmlsbD0iI0ZGQjk0QSIvPgo8Y2lyY2xlIGN4PSI2MDAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjRkY4QTAwIi8+CjxyZWN0IHg9IjEwMCIgeT0iMjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRkZBNTAwIi8+CjxyZWN0IHg9IjUwMCIgeT0iMjgwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkY4QTAwIi8+Cjwvc3ZnPgo=')"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-black">
              <h1 className="text-5xl font-bold mb-4">SHOP • BID • REPEAT</h1>
              <Button 
                onClick={handleStartBidding}
                className="bg-yellow-500 hover:bg-orange-600 text-black font-semibold px-8 py-3 rounded-full text-lg"
              >
                START BIDDING
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">BEST SELLING</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pure Rice */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleProductClick('Rice')}>
              <CardContent className="p-6">
                <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">🍚</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">PURE RICE</h3>
                <p className="text-gray-600 text-sm mb-4">Pure and natural rice sourced from the finest farms. Perfect for daily meals and special occasions.</p>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">₹45.00</p>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProductClick('Rice')
                  }}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700"
                >
                  Bid Now
                </Button>
              </CardContent>
            </Card>

            {/* Spices */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleProductClick('Spices')}>
              <CardContent className="p-6">
                <div className="h-48 bg-gradient-to-br from-red-100 to-red-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌶️</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">SPICES</h3>
                <p className="text-gray-600 text-sm mb-4">Authentic spices that bring flavor and aroma to your cooking. Freshly ground and packaged.</p>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(4)}{'☆'}
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">₹25.00</p>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProductClick('Spices')
                  }}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700"
                >
                  Bid Now
                </Button>
              </CardContent>
            </Card>

            {/* Flour */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleProductClick('Flour')}>
              <CardContent className="p-6">
                <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌾</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">FLOUR</h3>
                <p className="text-gray-600 text-sm mb-4">Premium quality flour made from the finest wheat. Perfect for baking and cooking.</p>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">₹35.00</p>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProductClick('Flour')
                  }}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700"
                >
                  Bid Now
                </Button>
              </CardContent>
            </Card>

            {/* Potatoes */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleProductClick('Vegetables')}>
              <CardContent className="p-6">
                <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">🥔</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">POTATOES</h3>
                <p className="text-gray-600 text-sm mb-4">Fresh and organic potatoes sourced directly from farms. Great for all your cooking needs.</p>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(4)}{'☆'}
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">₹20.00</p>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProductClick('Vegetables')
                  }}
                  className="w-full mt-3 bg-green-600 hover:bg-green-700"
                >
                  Bid Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg leading-relaxed">
              Bid Bazzaar is a groundbreaking platform designed to revolutionize digital food trading. It serves as a comprehensive marketplace where buyers and sellers can engage in transparent, efficient, and competitive bidding processes for various food products. The platform bridges the gap between agricultural producers, wholesalers, retailers, and consumers by providing a centralized digital space for food commerce.
            </p>
            <br />
            <p className="text-lg leading-relaxed">
              Our innovative bidding system ensures fair pricing, reduces food waste, and promotes sustainable trading practices. Whether you're a farmer looking to sell your harvest, a retailer seeking quality products, or a consumer wanting fresh ingredients, Bid Bazzaar provides the tools and transparency needed for successful food trading in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 ">Bid Bazzaar</h3>
              <p className="text-gray-700 text-sm mb-4">
                Online shopping platform designed to revolutionize digital food trading and bidding services.
              </p>
            </div>
            
          </div>
          <div className="border-t border-gray-300 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-700">© 2024 Bid Bazzaar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
