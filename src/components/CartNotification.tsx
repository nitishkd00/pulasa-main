import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, X } from 'lucide-react';

const CartNotification: React.FC = () => {
  const { cartItems, getCartTotal, showNotification, hideNotification } = useCart();
  const location = useLocation();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = getCartTotal();
  
  // Hide notification when on cart, checkout, or customer care pages
  useEffect(() => {
    const customerCarePages = [
      '/cart', 
      '/checkout', 
      '/help-support', 
      '/delivery-info', 
      '/returns-refunds', 
      '/terms-conditions', 
      '/privacy-policy'
    ];
    
    if (customerCarePages.includes(location.pathname)) {
      hideNotification();
    }
  }, [location.pathname, hideNotification]);
  
  // Don't show if cart is empty or notification is hidden
  if (totalItems === 0 || !showNotification || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-in slide-in-from-bottom-4 duration-300">
              <div className="bg-[hsl(var(--card))] border-2 border-[hsl(var(--primary))] rounded-lg shadow-2xl p-3 md:p-4 max-w-sm mx-auto md:mx-0">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--primary))]" />
            <span className="font-semibold text-[hsl(var(--primary))] text-sm md:text-base">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
            </span>
          </div>
          <button
            onClick={hideNotification}
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors p-1"
          >
            <X className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
        
        {/* Cart summary */}
        <div className="mb-3 md:mb-4">
          <div className="text-xs md:text-sm text-[hsl(var(--muted-foreground))] mb-2 space-y-1">
            {cartItems.slice(0, 2).map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[hsl(var(--primary))] rounded-full"></span>
                <span className="truncate font-medium">{item.name}</span>
                <span className="text-[hsl(var(--primary))] font-semibold">
                  x{item.quantity}
                </span>
              </div>
            ))}
            {cartItems.length > 2 && (
              <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1 md:mt-2 font-medium">
                +{cartItems.length - 2} more items
              </div>
            )}
          </div>
          
          <div className="border-t border-[hsl(var(--border))] pt-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[hsl(var(--primary))] text-sm md:text-base">Total:</span>
              <span className="font-bold text-base md:text-lg text-[hsl(var(--primary))]">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <Link to="/cart" className="flex-1">
            <Button className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white rounded-full font-semibold text-sm md:text-base py-1.5 md:py-2 shadow-md hover:shadow-lg transition-all duration-300">
              View Cart
            </Button>
          </Link>
          <Link to="/checkout" className="flex-1">
            <Button className="w-full bg-[hsl(var(--card))] border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white rounded-full font-semibold text-sm md:text-base py-1.5 md:py-2 shadow-md hover:shadow-lg transition-all duration-300">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;
