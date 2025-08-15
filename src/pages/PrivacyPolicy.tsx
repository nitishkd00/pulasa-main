import React from 'react';
import { Shield, Eye, Lock, Database, Users, Bell, Globe, FileText } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import FooterSection from '@/components/FooterSection';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useScrollToTop();

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <div className="pt-28 bg-[hsl(var(--secondary))] py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-[hsl(var(--primary))] mb-6">
              Privacy Policy – Pulasa.com
            </h1>
            <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
              We are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and protect your data.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Database className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <Users className="w-5 h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Personal Information</h3>
                  <ul className="text-[hsl(var(--muted-foreground))] mt-1 space-y-1">
                    <li>• Name, delivery address, phone number, and email</li>
                    <li>• Order history and preferences</li>
                    <li>• Payment details processed via Razorpay (not stored by us)</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <Eye className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Usage Information</h3>
                  <ul className="text-[hsl(var(--muted-foreground))] mt-1 space-y-1">
                    <li>• Website usage patterns and preferences</li>
                    <li>• Device information and browser type</li>
                    <li>• IP address and location data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Data Use */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Data Use
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <div className="bg-[hsl(var(--accent))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">To process and deliver your orders</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">We use your information to fulfill orders and ensure timely delivery.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <div className="bg-[hsl(var(--accent))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">To send transaction updates</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">We keep you informed about your order status and delivery progress.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <div className="bg-[hsl(var(--accent))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">For seasonal promotions (only with your consent)</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">We may send promotional offers, but only if you've given us permission.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Data Sharing
            </h2>
            <div className="bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg p-6">
              <p className="text-lg text-[hsl(var(--foreground))] font-medium mb-4">
                We share data only with:
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                  <span className="text-[hsl(var(--foreground))]">Payment processors (Razorpay)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                  <span className="text-[hsl(var(--foreground))]">Delivery partners</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                  <span className="text-[hsl(var(--foreground))]">Legal authorities (if required by law)</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg">
                <p className="text-[hsl(var(--muted-foreground))] text-sm">
                  <strong>Note:</strong> We never sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Security Measures */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Security Measures
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <Lock className="w-5 h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">SSL Encryption</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">SSL encryption on all transactions to protect your data during transmission.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <Shield className="w-5 h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Limited Internal Access</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Limited internal access to customer data with strict access controls.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <Database className="w-5 h-5 text-[hsl(var(--primary))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Secure Data Storage</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Your data is stored securely using industry-standard security practices.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Your Rights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[hsl(var(--border))] rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Access Your Data</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">You have the right to access and review your personal information.</p>
              </div>
              <div className="border border-[hsl(var(--border))] rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Update Information</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">You can update or correct your personal information at any time.</p>
              </div>
              <div className="border border-[hsl(var(--border))] rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Delete Account</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">You can request deletion of your account and associated data.</p>
              </div>
              <div className="border border-[hsl(var(--border))] rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">Opt-out</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm">You can opt-out of promotional communications at any time.</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Mail className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <Mail className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-2" />
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Email Support</h3>
                <a href="mailto:support@pulasa.com" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors font-medium">
                  support@pulasa.com
                </a>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">For privacy-related inquiries</p>
              </div>
              <div className="text-center p-6 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <Phone className="w-8 h-8 text-[hsl(var(--accent))] mx-auto mb-2" />
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Phone Support</h3>
                <a href="tel:+919035151944" className="text-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] transition-colors font-medium">
                  +91-9035151944
                </a>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">For immediate assistance</p>
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

export default PrivacyPolicy;
