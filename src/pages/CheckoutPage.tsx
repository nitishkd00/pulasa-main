import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import unifiedAuthService from "@/services/UnifiedAuthService";
import MongoDBService from "@/services/MongoDBService";
import { parsePrice } from "@/lib/utils";
import NavigationHeader from "@/components/NavigationHeader";
import FooterSection from "@/components/FooterSection";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    upiReference: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Scroll to top when component mounts
  useScrollToTop();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await unifiedAuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setFormData(prev => ({
            ...prev,
            firstName: currentUser.name.split(' ')[0] || "",
            lastName: currentUser.name.split(' ').slice(1).join(' ') || "",
            phone: currentUser.phone || "",
            address: currentUser.address || ""
          }));
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Phone validation (Indian format)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "City must be at least 2 characters";
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    } else if (formData.state.trim().length < 2) {
      newErrors.state = "State must be at least 2 characters";
    }

    // ZIP/Pincode validation (Indian format)
    if (!formData.zip.trim()) {
      newErrors.zip = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.zip.trim())) {
      newErrors.zip = "Pincode must be exactly 6 digits";
    }

    // UPI Reference validation
    if (!formData.upiReference.trim()) {
      newErrors.upiReference = "UPI reference is required";
    } else if (formData.upiReference.trim().length < 5) {
      newErrors.upiReference = "UPI reference must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Special handling for phone number (only allow digits)
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
    }
    // Special handling for pincode (only allow digits)
    else if (name === 'zip') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 6) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parsePrice(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        toast.error("Please login to complete checkout");
        return;
      }

      const orderData = {
        user_id: user.id,
        amount: calculateTotal(),
        products: cartItems.map(item => ({
          product_id: String(item.id),
          name: item.name,
          price: parsePrice(item.price),
          quantity: item.quantity
        })),
        address: formData.address,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: `+91${formData.phone}`,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        upi_reference: formData.upiReference,
        status: "pending"
      };

      const result = await MongoDBService.createOrder(orderData);

      if (result.success) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/profile");
      } else {
        toast.error(result.error || "Failed to place order");
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-[hsl(var(--secondary))]">
        <NavigationHeader />
        <main className="flex-grow container mx-auto px-4 py-24 pt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-[hsl(var(--primary))]">Your cart is empty</h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-4">Add some products to your cart before checkout.</p>
            <Button 
              onClick={() => navigate("/products")}
              className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--secondary))]">
      <NavigationHeader />
      <main className="flex-grow container mx-auto px-4 py-24 pt-20">
        <h1 className="text-4xl font-bold text-center text-[hsl(var(--primary))] mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card className="border-2 border-[hsl(var(--border))] bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-[hsl(var(--primary))] text-2xl font-bold">Order Summary</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">Review your items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--primary))]">{item.name} per kg</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-[hsl(var(--primary))]">₹{(parsePrice(item.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t border-[hsl(var(--border))] pt-4">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span className="text-[hsl(var(--primary))]">Total</span>
                      <span className="text-[hsl(var(--primary))]">₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Process Information - MOVED UP */}
            <Card className="border-2 border-[hsl(var(--border))] bg-white shadow-md mt-6">
              <CardHeader>
                <CardTitle className="text-[hsl(var(--primary))] text-xl font-bold">🐟 Payment & Order Process</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">
                  Pay ₹500 now to confirm your order.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
                  <p className="text-sm">
                    This is a token advance, and here's how the process works:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="font-medium text-[hsl(var(--primary))]">Order Review</p>
                        <p className="text-sm">Once payment is done, our admin team will review and approve your order.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="font-medium text-[hsl(var(--primary))]">Catch & Update</p>
                        <p className="text-sm">After the fish is caught, we'll update you with:</p>
                        <ul className="list-disc list-inside ml-4 mt-1 text-sm">
                          <li>The weight of the fish</li>
                          <li>The final price</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                      <div>
                        <p className="font-medium text-[hsl(var(--primary))]">Final Payment</p>
                        <p className="text-sm">You'll then pay the remaining balance before delivery.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-[hsl(var(--accent))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                      <div>
                        <p className="font-medium text-[hsl(var(--accent))]">Refund Policy</p>
                        <p className="text-sm">If we are unable to:</p>
                        <ul className="list-disc list-inside ml-4 mt-1 text-sm">
                          <li>Catch the fish</li>
                          <li>Or unable to deliver your order</li>
                        </ul>
                        <p className="text-sm mt-2 font-medium text-[hsl(var(--accent))]">
                          Your ₹500 will be fully refunded — no worries!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div>
            <Card className="border-2 border-[hsl(var(--border))] bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-[hsl(var(--primary))] text-2xl font-bold">Shipping Information</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">Enter your delivery details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-[hsl(var(--primary))] font-medium">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={`border-2 ${errors.firstName ? 'border-red-500' : 'border-[hsl(var(--border))]'} focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-[hsl(var(--primary))] font-medium">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={`border-2 ${errors.lastName ? 'border-red-500' : 'border-[hsl(var(--border))]'} focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-[hsl(var(--primary))] font-medium">Phone Number *</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-[hsl(var(--muted-foreground))]">+91</span>
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter 10 digit number"
                        className={`border-2 pl-12 ${errors.phone ? 'border-red-500' : 'border-[hsl(var(--border))]'} focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-[hsl(var(--primary))] font-medium">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter complete address"
                      className={`border-2 ${errors.address ? 'border-red-500' : 'border-[hsl(var(--border))]'} focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-[hsl(var(--primary))] font-medium">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={`border-2 ${errors.city ? 'border-red-500' : 'border-[hsl(var(--border))]'} focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-[hsl(var(--primary))] font-medium">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className={`border-2 ${errors.state ? 'border-red-500' : 'border-[hsl(var(--border))]'} focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zip" className="text-[hsl(var(--primary))] font-medium">Pincode *</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                        placeholder="6 digits"
                        className={`border-2 ${errors.zip ? 'border-red-500' : 'border-[hsl(var(--border))]'} focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]`}
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* UPI QR Code Section - MOVED TO SHIPPING */}
                  <div className="border-2 border-[hsl(var(--border))] rounded-lg p-4 bg-gray-50">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-[hsl(var(--primary))] mb-3">UPI Payment</h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">Scan QR code to pay ₹{calculateTotal().toFixed(2)}</p>
                      <div className="flex flex-col items-center space-y-3">
                        <img
                          src="/assets/qrcode.png"
                          alt="UPI QR Code"
                          className="w-40 h-40 object-contain border-2 border-[hsl(var(--border))] rounded-lg"
                        />
                        <div className="text-sm text-[hsl(var(--muted-foreground))]">
                          <p className="font-medium">UPI ID: <span className="text-[hsl(var(--primary))]">malakalav@ybl</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="upiReference" className="text-[hsl(var(--primary))] font-medium">UPI Reference *</Label>
                    <Input
                      id="upiReference"
                      name="upiReference"
                      value={formData.upiReference}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter UPI transaction reference"
                      className={`border-2 ${errors.upiReference ? 'border-red-500' : 'border-[hsl(var(--border))]'} focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]`}
                    />
                    {errors.upiReference && (
                      <p className="text-red-500 text-sm mt-1">{errors.upiReference}</p>
                    )}
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                      Please scan the QR code above and enter the transaction reference number
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-full font-semibold text-lg py-3 shadow-md"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `Place Order - ₹${calculateTotal().toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default CheckoutPage;
