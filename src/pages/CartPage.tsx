import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";
import FooterSection from "@/components/FooterSection";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  // Scroll to top when component mounts
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--secondary))]">
      <NavigationHeader />
      <main className="flex-grow container mx-auto px-4 py-24 pt-20">
        <h1 className="text-4xl font-bold text-center text-[hsl(var(--primary))] mb-12">
          Your Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-[hsl(var(--muted-foreground))] mb-4">
              Your cart is empty.
            </p>
            <Link to="/">
              <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="flex items-center p-4 border-2 border-[hsl(var(--border))] bg-white shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-[hsl(var(--primary))]">
                      {item.name} per kg
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))]">
                      {item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold text-[hsl(var(--primary))]">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--primary))] text-white font-semibold px-5"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 border-2 border-[hsl(var(--border))] bg-white shadow-md">
                <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--muted-foreground))]">
                      Subtotal
                    </span>
                    <span className="font-semibold text-[hsl(var(--primary))]">
                      ₹{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--muted-foreground))]">
                      Shipping
                    </span>
                    <span className="font-semibold text-[hsl(var(--primary))]">
                      Free
                    </span>
                  </div>
                  <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
                    <span className="text-[hsl(var(--primary))]">Total</span>
                    <span className="text-[hsl(var(--primary))]">
                      ₹{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
                <Link to="/checkout">
                  <Button className="w-full mt-6 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-full font-semibold text-lg py-3 shadow-md">
                    Proceed to Checkout
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default CartPage;
