import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import unifiedAuthService from "@/services/UnifiedAuthService";
import MongoDBService from "@/services/MongoDBService";
import NavigationHeader from "@/components/NavigationHeader";
import FooterSection from "@/components/FooterSection";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface Order {
  id: string;
  order_number: string;
  amount: number;
  status: string;
  created_at: string;
  products: Array<{
    product_id: string;
    name: string;
    price: number;
    quantity: number;
  }> | string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  upi_reference?: string;
  updated_at?: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Scroll to top when component mounts
  useScrollToTop();

  const fetchOrders = async () => {
    try {
      console.log('🔄 Starting to fetch orders...');
      
      // Get current user first
      const currentUser = await unifiedAuthService.getCurrentUser();
      console.log('👤 Current user:', currentUser ? 'Found' : 'Not found');
      
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch user orders only
        console.log('📦 Fetching orders...');
        const ordersData = await MongoDBService.getOrders();
        console.log('📦 Orders received:', ordersData.length);
        setOrders(ordersData);
        
      } else {
        toast.error("Please login to view your orders");
      }
    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
      toast.error("Failed to load orders");
    } finally {
      console.log('✅ Fetch orders completed');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 Orders page mounted, fetching orders...');
    fetchOrders();
  }, []); // Only run once when component mounts

  const handleRefresh = () => {
    setLoading(true);
    fetchOrders();
  };

  // Parse products string to array
  const parseProducts = (products: string | Array<{product_id: string; name: string; price: number; quantity: number}>) => {
    if (typeof products === 'string') {
      try {
        return JSON.parse(products);
      } catch (error) {
        console.error('Error parsing products:', error);
        return [];
      }
    }
    return products;
  };

  // Get display status for UI
  const getDisplayStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'order_raised': 'Order Raised',
      'order_confirmed': 'Order Confirmed', 
      'order_packed': 'Order Packed',
      'order_shipped': 'Order Shipped',
      'order_delivered': 'Order Delivered',
      'order_cancelled': 'Order Cancelled',
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'delivered': 'Delivered',
      'rejected': 'Rejected',
      'completed': 'Completed'
    };
    return statusMap[status] || status;
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'order_delivered':
      case 'completed':
        return 'default';
      case 'order_raised':
      case 'pending':
        return 'secondary';
      case 'order_confirmed':
        return 'default';
      case 'order_packed':
        return 'secondary';
      case 'order_shipped':
        return 'secondary';
      case 'order_cancelled':
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'order_delivered':
      case 'completed':
        return 'text-green-600';
      case 'order_raised':
      case 'pending':
        return 'text-orange-600';
      case 'order_confirmed':
        return 'text-blue-600';
      case 'order_packed':
        return 'text-purple-600';
      case 'order_shipped':
        return 'text-yellow-600';
      case 'order_cancelled':
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'order_raised':
        return 'Your order has been received and is being reviewed.';
      case 'order_confirmed':
        return 'Your order has been confirmed and is being prepared.';
      case 'order_packed':
        return 'Your order has been packed and is ready for shipping.';
      case 'order_shipped':
        return 'Your order has been shipped and is on its way!';
      case 'order_delivered':
        return 'Your order has been delivered successfully!';
      case 'order_cancelled':
        return 'Your order has been cancelled. Please contact support if this was unexpected.';
      case 'completed':
        return 'Your order has been completed successfully!';
      case 'pending':
        return 'Your order is being reviewed by our team.';
      case 'rejected':
        return 'We couldn\'t process your order. Please contact support.';
      default:
        return 'Order status unknown.';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--secondary))]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--secondary))]">
      <NavigationHeader />
      <main className="flex-grow container mx-auto px-4 py-24 pt-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[hsl(var(--primary))]">My Orders</h1>
            <p className="text-[hsl(var(--muted-foreground))] mt-2">
              Track your order status and history
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
            <span>Refresh</span>
          </Button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-2">No Orders Yet</h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const products = parseProducts(order.products);
              return (
                <Card key={order.id} className="border-2 border-[hsl(var(--border))] bg-white shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-[hsl(var(--primary))]">
                          Order #{order.order_number}
                        </CardTitle>
                        <CardDescription className="text-[hsl(var(--muted-foreground))]">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[hsl(var(--primary))]">
                          ₹{order.amount.toLocaleString()}
                        </div>
                        <Badge variant={getStatusBadgeVariant(order.status)} className="mt-2">
                          {getDisplayStatus(order.status)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Products */}
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--primary))] mb-2">Products:</h3>
                        <div className="space-y-2">
                          {Array.isArray(products) ? products.map((product, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                  Quantity: {product.quantity}
                                </p>
                              </div>
                              <p className="font-semibold">₹{product.price.toLocaleString()}</p>
                            </div>
                          )) : (
                            <p className="text-[hsl(var(--muted-foreground))]">Product details unavailable</p>
                          )}
                        </div>
                      </div>

                      {/* Status Message */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className={`font-medium ${getStatusColor(order.status)}`}>
                          {getStatusMessage(order.status)}
                        </p>
                      </div>

                      {/* Shipping Address */}
                      {order.address && (
                        <div>
                          <h3 className="font-semibold text-[hsl(var(--primary))] mb-2">Shipping Address:</h3>
                          <p className="text-[hsl(var(--muted-foreground))]">
                            {order.first_name} {order.last_name}<br />
                            {order.address}<br />
                            {order.city}, {order.state} {order.zip}<br />
                            Phone: {order.phone}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default Orders; 