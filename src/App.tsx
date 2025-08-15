import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { CartProvider } from "./context/CartContext";
import { AuctionProvider } from "./context/AuctionContext";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import Blogs from "./pages/blogs";
import BlogDetail from "./pages/blogs/BlogDetail";
import AuctionList from "./pages/AuctionList";
import AuctionDetail from "./pages/AuctionDetail";
import HelpSupport from "./pages/HelpSupport";
import DeliveryInfo from "./pages/DeliveryInfo";
import ReturnsRefunds from "./pages/ReturnsRefunds";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AuctionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                {/* Auction Routes */}
                <Route path="/auctions" element={<AuctionList />} />
                <Route path="/auctions/:id" element={<AuctionDetail />} />
                {/* Customer Care Routes */}
                <Route path="/help-support" element={<HelpSupport />} />
                <Route path="/delivery-info" element={<DeliveryInfo />} />
                <Route path="/returns-refunds" element={<ReturnsRefunds />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuctionProvider>
      </CartProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
