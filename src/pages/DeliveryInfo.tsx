import React from 'react';
import { Truck, MapPin, Clock, Package, AlertTriangle, Phone } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import FooterSection from '@/components/FooterSection';

const DeliveryInfo = () => {
  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <div className="pt-28 bg-[hsl(var(--secondary))] py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-[hsl(var(--primary))] mb-6">
              Delivery Info – Pulasa.com
            </h1>
            <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
              Our Delivery Commitment. Pulasa.com is committed to delivering Pulasa fish and Pulasa fish curry in their freshest form. Due to their perishable nature, our logistics process is time-sensitive and handled with utmost care.
            </p>
          </div>

          {/* Serviceable Locations */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Serviceable Locations
            </h2>
            <div className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg p-6">
              <p className="text-lg text-[hsl(var(--foreground))] font-medium">
                We currently serve <span className="font-bold text-[hsl(var(--primary))]">Andhra Pradesh & Telangana</span>
              </p>
              <p className="text-[hsl(var(--muted-foreground))] mt-2">
                If your area is not serviceable, the system will inform you during checkout.
              </p>
            </div>
          </div>

          {/* Dispatch & Delivery Timelines */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Truck className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Dispatch & Delivery Timelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[hsl(var(--border))] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Package className="w-5 h-5 text-[hsl(var(--primary))] mr-2" />
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Pulasa Fish</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))]">
                  Caught fresh early in the morning, processed, packed in insulated boxes, and shipped within hours of catch.
                </p>
              </div>
              <div className="border border-[hsl(var(--border))] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <Package className="w-5 h-5 text-[hsl(var(--accent))] mr-2" />
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Pulasa Fish Curry</h3>
                </div>
                <p className="text-[hsl(var(--muted-foreground))]">
                  Cooked fresh in hygienic conditions, packed in food-grade containers, and dispatched the same day.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Slots */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Delivery Slots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--primary))]/20 border border-[hsl(var(--primary))]/30 rounded-lg p-6">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Morning Slot</h3>
                <p className="text-2xl font-bold text-[hsl(var(--primary))]">7:00 AM – 11:00 AM</p>
              </div>
              <div className="bg-gradient-to-r from-[hsl(var(--accent))]/10 to-[hsl(var(--accent))]/20 border border-[hsl(var(--accent))]/30 rounded-lg p-6">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Evening Slot</h3>
                <p className="text-2xl font-bold text-[hsl(var(--accent))]">3:00 PM – 8:00 PM</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg">
              <p className="text-[hsl(var(--foreground))]">
                <strong>📱 Notification:</strong> Customers will receive an SMS/WhatsApp notification once the delivery partner is en route.
              </p>
            </div>
          </div>

          {/* Shipping Charges */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Package className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Shipping Charges
            </h2>
            <div className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg p-6">
              <p className="text-lg text-[hsl(var(--foreground))]">
                Orders will incur a shipping fee based on distance.
              </p>
              <p className="text-[hsl(var(--muted-foreground))] mt-2">
                The exact shipping cost will be calculated and displayed during checkout based on your delivery location.
              </p>
            </div>
          </div>

          {/* Important Customer Responsibility */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-[hsl(var(--destructive))]" />
              Important Customer Responsibility
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--destructive))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">You must be present to receive the order during the confirmed slot.</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Please ensure someone is available at the delivery address during your selected time slot.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <Package className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Fresh fish and curry must be refrigerated immediately upon receipt.</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">To maintain freshness and quality, please refrigerate your order as soon as you receive it.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">We are not liable for spoilage due to customer delay in accepting delivery.</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Please be available during your delivery slot to ensure the freshest possible product.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Delivery Issues */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mt-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Phone className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Need Help with Delivery?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <Phone className="w-8 h-8 text-[hsl(var(--accent))] mx-auto mb-2" />
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Call Us</h3>
                <a href="tel:+919035151944" className="text-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] transition-colors font-medium">
                  +91-9035151944
                </a>
              </div>
              <div className="text-center p-6 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <Package className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-2" />
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Email Support</h3>
                <a href="mailto:support@pulasa.com" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors font-medium">
                  support@pulasa.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default DeliveryInfo;
