import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";
import FooterSection from "@/components/FooterSection";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { Trash2, Clock } from "lucide-react";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCartAfterPurchase } = useCart();

  // Scroll to top when component mounts
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--secondary))]">
      <NavigationHeader />
      <main className="flex-grow container mx-auto px-4 py-24 pt-28">
        <h1 className="text-4xl font-bold text-center text-[hsl(var(--primary))] mb-8">
          Your Shopping Cart
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-[hsl(var(--muted))] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-[hsl(var(--muted-foreground))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-4">
              Your cart is empty
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-md mx-auto">
              Looks like you haven't added any fresh fish to your cart yet. Start shopping to fill your cart with premium seafood!
            </p>
            <Link to="/">
              <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">


            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-[hsl(var(--card))] rounded-2xl shadow-lg border border-[hsl(var(--border))] overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden shadow-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow space-y-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs font-semibold text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] px-2 py-1 rounded-full">
                              PULASA
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
                            {item.name}
                          </h3>
                          <p className="text-[hsl(var(--muted-foreground))] text-sm">
                            Fresh from Godavari waters • Premium quality
                          </p>
                        </div>

                        {/* Price Section */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-[hsl(var(--primary))]">
                              {item.price}
                            </span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))] line-through">
                              ₹{(parseFloat(item.price.replace('₹', '')) * 1.2).toFixed(2)}
                            </span>
                            <span className="text-xs font-medium text-white bg-[hsl(var(--accent))] px-2 py-1 rounded-full border border-[hsl(var(--accent))]">
                              Fresh
                            </span>
                          </div>
                          <p className="text-sm text-[hsl(var(--accent))] font-medium">
                            You save ₹{((parseFloat(item.price.replace('₹', '')) * 0.2)).toFixed(2)}
                          </p>
                        </div>

                        {/* Return Policy */}
                        <div className="flex items-center space-x-2 text-sm text-[hsl(var(--muted-foreground))]">
                          <Clock className="w-4 h-4" />
                          <span>There is no exchange or refund. For more details, refer to our </span>
                          <a 
                            href="https://www.pulasa.com/returns-refunds" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] underline cursor-pointer font-medium"
                          >
                            Read Policy
                          </a>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-[hsl(var(--foreground))]">Qty:</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="w-8 h-8 border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <span className="w-12 text-center font-semibold text-[hsl(var(--primary))] text-lg">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="w-8 h-8 border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-2 border-[hsl(var(--destructive))] text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] hover:text-white rounded-full px-6 py-2 font-semibold transition-all duration-300"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>





            {/* Order Summary & Checkout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Empty space for layout balance */}
              </div>
              
              <div className="lg:col-span-1">
                <Card className="bg-[hsl(var(--card))] rounded-2xl shadow-xl border border-[hsl(var(--border))] p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[hsl(var(--muted-foreground))]">Subtotal</span>
                      <span className="font-semibold text-[hsl(var(--foreground))]">
                        ₹{getCartTotal().toLocaleString()} (estimated for ~1kg)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[hsl(var(--muted-foreground))]">Shipping</span>
                      <span className="font-semibold text-[hsl(var(--accent))]">Free</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[hsl(var(--muted-foreground))]">Token Advance</span>
                      <span className="font-semibold text-[hsl(var(--foreground))]">₹500 (pay now)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[hsl(var(--muted-foreground))]">Estimated Remaining</span>
                      <span className="font-semibold text-[hsl(var(--foreground))]">
                        ₹{(getCartTotal() - 500).toLocaleString()} (varies by actual weight)
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[hsl(var(--foreground))]">Final Total</span>
                        <span className="text-sm text-[hsl(var(--muted-foreground))]">Based on actual fish weight caught</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[hsl(var(--primary))]">Payment Required Now</span>
                        <span className="text-2xl font-bold text-[hsl(var(--primary))]">₹500</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-3 bg-[hsl(34deg_81.22%_70.96%)] rounded-lg border border-[hsl(var(--accent))] border-opacity-5">
                    <p className="text-sm text-[hsl(var(--foreground))]">
                      <span className="font-medium text-[hsl(var(--foreground))]">Note:</span> We'll inform you of the final price and weight once the fish is caught. The remaining balance will be calculated based on the actual weight of your fish.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      variant="outline"
                      onClick={clearCartAfterPurchase}
                      className="w-full border-2 border-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] rounded-full py-3 font-semibold transition-all duration-300"
                    >
                      Clear Cart
                    </Button>
                    <Link to="/checkout" className="w-full">
                      <Button className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-full py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default CartPage;
