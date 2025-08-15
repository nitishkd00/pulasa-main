import React from 'react';
import { FileText, AlertTriangle, DollarSign, XCircle, Shield, Scale, CheckCircle, Mail, Phone } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import FooterSection from '@/components/FooterSection';

const TermsConditions = () => {
  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <div className="pt-28 bg-[hsl(var(--secondary))] py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-[hsl(var(--primary))] mb-6">
              Terms & Conditions – Pulasa.com
            </h1>
            <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
              Effective Date: <span className="font-semibold">01/08/2025</span>
            </p>
          </div>

          {/* Nature of Products */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Nature of Products
            </h2>
            <div className="bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg p-6">
              <p className="text-lg text-[hsl(var(--foreground))]">
                Pulasa.com deals exclusively in Pulasa fish and Pulasa fish curry—both seasonal and perishable. Availability is subject to fishing conditions, weather, and local market supply.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(var(--accent))]" />
                  <span className="text-[hsl(var(--foreground))]">Products are seasonal and subject to availability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(var(--accent))]" />
                  <span className="text-[hsl(var(--foreground))]">Weather conditions may affect supply</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(var(--accent))]" />
                  <span className="text-[hsl(var(--foreground))]">Local market conditions impact availability</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Payment */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Pricing & Payment
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Price Fluctuations</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Prices fluctuate based on season, availability, and market rates.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <Shield className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Secure Payment Processing</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Payments are processed securely via Razorpay; we do not store your card/UPI details.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Order Confirmation</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Orders are confirmed only after full payment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Cancellations */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <XCircle className="w-6 h-6 mr-2 text-[hsl(var(--destructive))]" />
              Order Cancellations
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Cancellations before dispatch</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Cancellations are allowed only before dispatch.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/30 rounded-lg">
                <XCircle className="w-5 h-5 text-[hsl(var(--destructive))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">No cancellations after dispatch</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Once dispatched, cancellations are not possible due to perishable nature.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Liability Limitation */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Liability Limitation
            </h2>
            <div className="bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg p-6">
              <p className="text-lg text-[hsl(var(--foreground))]">
                Our liability is limited to the value of the order placed. We are not responsible for indirect or consequential losses.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(var(--primary))]" />
                  <span className="text-[hsl(var(--foreground))]">Liability limited to order value only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(var(--primary))]" />
                  <span className="text-[hsl(var(--foreground))]">No responsibility for indirect losses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(var(--primary))]" />
                  <span className="text-[hsl(var(--foreground))]">No responsibility for consequential damages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Governing Law & Disputes */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Scale className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Governing Law & Disputes
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <Scale className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Governing Law</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Governed by Indian law.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <Scale className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Jurisdiction</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Jurisdiction: Courts of Telangana.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Terms */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6">
              Additional Terms
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[hsl(var(--primary))] pl-4">
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Quality Assurance</h3>
                <p className="text-[hsl(var(--muted-foreground))] mt-1">We maintain the highest standards of quality and freshness for all our products.</p>
              </div>
              <div className="border-l-4 border-[hsl(var(--accent))] pl-4">
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Customer Service</h3>
                <p className="text-[hsl(var(--muted-foreground))] mt-1">We are committed to providing excellent customer service and support.</p>
              </div>
              <div className="border-l-4 border-[hsl(var(--primary))] pl-4">
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Privacy Protection</h3>
                <p className="text-[hsl(var(--muted-foreground))] mt-1">Your privacy and data security are our top priorities.</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <Mail className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-2" />
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Email Support</h3>
                <a href="mailto:support@pulasa.com" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors font-medium">
                  support@pulasa.com
                </a>
              </div>
              <div className="text-center p-6 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <Phone className="w-8 h-8 text-[hsl(var(--accent))] mx-auto mb-2" />
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Phone Support</h3>
                <a href="tel:+919035151944" className="text-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] transition-colors font-medium">
                  +91-9035151944
                </a>
              </div>
            </div>
            <div className="mt-6 p-4 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg">
              <p className="text-[hsl(var(--foreground))] text-center">
                <strong>Last Updated:</strong> January 8, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default TermsConditions;
