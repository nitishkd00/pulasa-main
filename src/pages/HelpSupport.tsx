import React from 'react';
import { Mail, Phone, Clock, MessageCircle, Package, CreditCard, Truck, AlertTriangle } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import FooterSection from '@/components/FooterSection';

const HelpSupport = () => {
  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <div className="pt-28 bg-[hsl(var(--secondary))] py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-[hsl(var(--primary))] mb-6">
              Help & Support – Pulasa.com
            </h1>
            <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
              Welcome to Pulasa.com Help & Support. We specialize in delivering the freshest Pulasa fish and Pulasa fish curry directly from the source to your home. We understand the importance of freshness, quality, and timely delivery, and we are here to assist you at every step of your order journey.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[hsl(var(--primary))] mt-1" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Customer Support Email</h3>
                  <a href="mailto:support@pulasa.com" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors">
                    support@pulasa.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[hsl(var(--primary))] mt-1" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Phone/WhatsApp Support</h3>
                  <a href="tel:+919035151944" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors">
                    +91-9035151944
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[hsl(var(--primary))]" />
                Working Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg border border-[hsl(var(--border))]">
                  <h4 className="font-medium text-[hsl(var(--foreground))]">Regular Season</h4>
                  <p className="text-[hsl(var(--muted-foreground))]">8:00 AM – 8:00 PM IST (Mon–Sun)</p>
                </div>
                <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg border border-[hsl(var(--border))]">
                  <h4 className="font-medium text-[hsl(var(--foreground))]">Off-Season</h4>
                  <p className="text-[hsl(var(--muted-foreground))]">10:00 AM – 6:00 PM IST (Mon–Sat)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Query Categories */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6">
              Query Categories
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
              We provide dedicated support for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[hsl(var(--border))] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Package className="w-5 h-5 text-[hsl(var(--accent))] mr-2" />
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Order Placement Help</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))]">Step-by-step assistance for booking your fish or curry order.</p>
              </div>
              <div className="border border-[hsl(var(--border))] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Truck className="w-5 h-5 text-[hsl(var(--primary))] mr-2" />
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Order Status & Tracking</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))]">Real-time updates on your delivery.</p>
              </div>
              <div className="border border-[hsl(var(--border))] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <CreditCard className="w-5 h-5 text-[hsl(var(--accent))] mr-2" />
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Payment & Billing</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))]">Razorpay payment issues, invoices, GST queries.</p>
              </div>
              <div className="border border-[hsl(var(--border))] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Truck className="w-5 h-5 text-[hsl(var(--primary))] mr-2" />
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Delivery Concerns</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))]">Delay reports, change of address before dispatch.</p>
              </div>
              <div className="border border-[hsl(var(--border))] rounded-lg p-6 hover:shadow-lg transition-shadow md:col-span-2">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--destructive))] mr-2" />
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Product Issues</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))]">Damaged goods, incorrect item received, quality concerns.</p>
              </div>
            </div>
          </div>

          {/* Resolution Timelines */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6">
              Resolution Timelines
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[hsl(var(--secondary))] rounded-lg border border-[hsl(var(--border))]">
                <span className="font-medium text-[hsl(var(--foreground))]">General inquiries</span>
                <span className="text-[hsl(var(--primary))] font-semibold">Within 24 hours</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[hsl(var(--secondary))] rounded-lg border border-[hsl(var(--border))]">
                <span className="font-medium text-[hsl(var(--foreground))]">Payment disputes</span>
                <span className="text-[hsl(var(--primary))] font-semibold">Within 48 hours (excluding bank delays)</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[hsl(var(--secondary))] rounded-lg border border-[hsl(var(--border))]">
                <span className="font-medium text-[hsl(var(--foreground))]">Refund requests</span>
                <span className="text-[hsl(var(--primary))] font-semibold">Within 5–7 working days after approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default HelpSupport;
