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
import { CreditCard } from "lucide-react";

// Declare Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

const CheckoutPage = () => {
  const { cartItems, clearCart, clearCartAfterPurchase } = useCart();
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
    zip: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Scroll to top when component mounts
  useScrollToTop();

  // Security fix: Redirect if no cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      navigate("/cart");
      return;
    }
  }, [cartItems.length, navigate]);

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
        } else {
          // Security fix: Redirect to login if user is not authenticated
          toast.error("Please login to access checkout");
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // Security fix: Redirect to login on auth error
        toast.error("Authentication failed. Please login again.");
        navigate("/login");
        return;
      }
    };

    fetchUser();
  }, [navigate]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName: string) => {
    if (fieldName === 'firstName') {
      if (!formData.firstName.trim()) {
        setErrors(prev => ({ ...prev, firstName: "First name is required" }));
      } else if (formData.firstName.trim().length < 2) {
        setErrors(prev => ({ ...prev, firstName: "First name must be at least 2 characters" }));
      } else {
        setErrors(prev => ({ ...prev, firstName: "" }));
      }
    } else if (fieldName === 'lastName') {
      if (!formData.lastName.trim()) {
        setErrors(prev => ({ ...prev, lastName: "Last name is required" }));
      } else if (formData.lastName.trim().length < 2) {
        setErrors(prev => ({ ...prev, lastName: "Last name must be at least 2 characters" }));
      } else {
        setErrors(prev => ({ ...prev, lastName: "" }));
      }
    } else if (fieldName === 'phone') {
      if (!formData.phone.trim()) {
        setErrors(prev => ({ ...prev, phone: "Phone number is required" }));
      } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        setErrors(prev => ({ ...prev, phone: "Phone number must be exactly 10 digits" }));
      } else {
        setErrors(prev => ({ ...prev, phone: "" }));
      }
    } else if (fieldName === 'address') {
      if (!formData.address.trim()) {
        setErrors(prev => ({ ...prev, address: "Address is required" }));
      } else if (formData.address.trim().length < 10) {
        setErrors(prev => ({ ...prev, address: "Address must be at least 10 characters" }));
      } else {
        setErrors(prev => ({ ...prev, address: "" }));
      }
    } else if (fieldName === 'city') {
      if (!formData.city.trim()) {
        setErrors(prev => ({ ...prev, city: "City is required" }));
      } else if (formData.city.trim().length < 2) {
        setErrors(prev => ({ ...prev, city: "City must be at least 2 characters" }));
      } else {
        setErrors(prev => ({ ...prev, city: "" }));
      }
    } else if (fieldName === 'state') {
      if (!formData.state.trim()) {
        setErrors(prev => ({ ...prev, state: "State is required" }));
      } else if (formData.state.trim().length < 2) {
        setErrors(prev => ({ ...prev, state: "State must be at least 2 characters" }));
      } else {
        setErrors(prev => ({ ...prev, state: "" }));
      }
    } else if (fieldName === 'zip') {
      if (!formData.zip.trim()) {
        setErrors(prev => ({ ...prev, zip: "Pincode is required" }));
      } else if (!/^\d{6}$/.test(formData.zip.trim())) {
        setErrors(prev => ({ ...prev, zip: "Pincode must be exactly 6 digits" }));
      } else {
        setErrors(prev => ({ ...prev, zip: "" }));
      }
    }
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
    
    // Security fix: Check if user is authenticated and has items in cart
    if (!user) {
      toast.error("Please login to complete checkout");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      navigate("/cart");
      return;
    }
    
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

      // Prepare order data
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
        zip: formData.zip
      };

      // Create Razorpay order for ₹500 token advance
      const response = await fetch(`${import.meta.env.VITE_UNIFIED_AUTH_URL}/api/orders/create-razorpay-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${unifiedAuthService.getCurrentToken()}`

        },
        body: JSON.stringify({
          currency: 'INR',
          user_id: user.id
        })
      });

      const razorpayResult = await response.json();

      if (!razorpayResult.success) {
        throw new Error(razorpayResult.error || 'Failed to create payment order');
      }

      // Initialize Razorpay payment
      const options = {
        key: razorpayResult.key_id,
        amount: razorpayResult.order.amount,
        currency: razorpayResult.order.currency,
        name: 'Pulasa Fish',
        description: '₹500 Token Advance - Fresh Fish Order',
        order_id: razorpayResult.order.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch(`${import.meta.env.VITE_UNIFIED_AUTH_URL}/api/orders/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${unifiedAuthService.getCurrentToken()}`

              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: orderData
              })
            });

            const verifyResult = await verifyResponse.json();

            if (verifyResult.success) {
              toast.success("Payment successful! Order placed successfully!");
              clearCartAfterPurchase();
              navigate("/profile");
            } else {
              toast.error(verifyResult.error || "Payment verification failed");
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: user.email,
          contact: `+91${formData.phone}`
        },
        theme: {
          color: "#7C3AED"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || "An error occurred during checkout");
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
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 lg:py-24 pt-28">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[hsl(var(--primary))] mb-8 sm:mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Order Summary */}
          <div className="order-1 lg:order-1">
            <Card className="bg-white rounded-2xl shadow-xl border border-[hsl(var(--border))] p-6">
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start sm:items-center p-3 bg-[hsl(var(--muted))] bg-opacity-30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[hsl(var(--foreground))] text-sm sm:text-base">{item.name} per kg</h3>
                      <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[hsl(var(--primary))] text-sm sm:text-base ml-2">₹{(parsePrice(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[hsl(var(--muted-foreground))]">Subtotal</span>
                    <span className="font-semibold text-[hsl(var(--foreground))]">
                      ₹{calculateTotal().toFixed(2)} (estimated for ~1kg)
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
                      ₹{(calculateTotal() - 500).toFixed(2)} (varies by actual weight)
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[hsl(var(--foreground))]">Final Total</span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">Based on actual fish weight caught</span>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[hsl(var(--primary))]">Payment Required Now</span>
                      <span className="text-2xl font-bold text-[hsl(var(--primary))]">₹500</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-[hsl(34deg_81.22%_70.96%)] rounded-lg border border-[hsl(var(--accent))] border-opacity-5">
                  <p className="text-xs sm:text-sm text-[hsl(var(--foreground))]">
                    <span className="font-medium text-[hsl(var(--foreground))]">Note:</span> We'll inform you of the final price and weight once the fish is caught. The remaining balance will be calculated based on the actual weight of your fish.
                  </p>
                </div>
              </div>
            </Card>

            {/* Payment Process Information */}
            <Card className="bg-white rounded-2xl shadow-xl border border-[hsl(var(--border))] p-6 mt-6">
              <h2 className="text-xl font-bold text-[hsl(var(--foreground))] mb-4">
                Payment & Order Process
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] text-sm mb-4">
                Pay ₹500 now to confirm your order. This is a token advance, and here's how the process works:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-[hsl(var(--muted))] bg-opacity-20 rounded-lg">
                  <span className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[hsl(var(--foreground))] text-sm">Order Review</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Once payment is done, our admin team will review and approve your order.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-[hsl(var(--muted))] bg-opacity-20 rounded-lg">
                  <span className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[hsl(var(--foreground))] text-sm">Catch & Update</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">After the fish is caught, we'll update you with:</p>
                    <ul className="list-disc list-inside ml-4 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                      <li>The weight of the fish</li>
                      <li>The final price</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-[hsl(var(--muted))] bg-opacity-20 rounded-lg">
                  <span className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[hsl(var(--foreground))] text-sm">Final Payment</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">You'll then pay the remaining balance before delivery.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-[hsl(var(--muted))] bg-opacity-20 rounded-lg">
                  <span className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[hsl(var(--foreground))] text-sm">Refund Policy</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">If we are unable to catch the fish or deliver your order, your ₹500 will be fully refunded — no worries!</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="order-2 lg:order-2">
            <Card className="bg-white rounded-2xl shadow-xl border border-[hsl(var(--border))] p-6">
              <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">Shipping Information</h2>
              
              {/* Required Fields Notice */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">
                  <span className="text-red-500 font-bold">*</span> All fields are required
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onBlur={() => validateField('firstName')}
                      required
                      className={`w-full px-4 py-3 border-2 text-sm sm:text-base transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-50 ${
                        errors.firstName 
                          ? 'border-red-500 bg-red-50' 
                          : formData.firstName.trim() 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-[hsl(var(--border))] bg-white'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onBlur={() => validateField('lastName')}
                      required
                      className={`w-full px-4 py-3 border-2 text-sm sm:text-base transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-50 ${
                        errors.lastName 
                          ? 'border-red-500 bg-red-50' 
                          : formData.lastName.trim() 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-[hsl(var(--border))] bg-white'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={() => validateField('phone')}
                    required
                    className={`w-full px-4 py-3 border-2 text-sm sm:text-base transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-50 ${
                      errors.phone 
                        ? 'border-red-500 bg-red-50' 
                        : formData.phone.trim() && formData.phone.length === 10
                          ? 'border-green-500 bg-green-50' 
                          : 'border-[hsl(var(--border))] bg-white'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={() => validateField('address')}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 border-2 text-sm sm:text-base transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-50 resize-none ${
                      errors.address 
                        ? 'border-red-500 bg-red-50' 
                        : formData.address.trim() && formData.address.length >= 10
                          ? 'border-green-500 bg-green-50' 
                          : 'border-[hsl(var(--border))] bg-white'
                    }`}
                    placeholder="Enter your complete delivery address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={() => validateField('city')}
                      required
                      className={`w-full px-4 py-3 border-2 text-sm sm:text-base transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-50 ${
                        errors.city 
                          ? 'border-red-500 bg-red-50' 
                          : formData.city.trim() && formData.city.length >= 2
                            ? 'border-green-500 bg-green-50' 
                            : 'border-[hsl(var(--border))] bg-white'
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      onBlur={() => validateField('state')}
                      required
                      className={`w-full px-4 py-3 border-2 text-sm sm:text-base transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-50 ${
                        errors.state 
                          ? 'border-red-500 bg-red-50' 
                          : formData.state.trim() && formData.state.length >= 2
                            ? 'border-green-500 bg-green-50' 
                            : 'border-[hsl(var(--border))] bg-white'
                      }`}
                      placeholder="Enter state"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      onBlur={() => validateField('zip')}
                      required
                      className={`w-full px-4 py-3 border-2 text-sm sm:text-base transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-50 ${
                        errors.zip 
                          ? 'border-red-500 bg-red-50' 
                          : formData.zip.trim() && formData.zip.length === 6
                            ? 'border-green-500 bg-green-50' 
                            : 'border-[hsl(var(--border))] bg-white'
                      }`}
                      placeholder="Enter pincode"
                    />
                    {errors.zip && (
                      <p className="mt-1 text-sm text-red-500">{errors.zip}</p>
                    )}
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-xl py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? "Processing..." : "Pay ₹500"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default CheckoutPage;
