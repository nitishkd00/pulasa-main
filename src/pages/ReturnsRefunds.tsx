import React from 'react';
import { RefreshCw, AlertTriangle, CheckCircle, XCircle, Package, Truck, CreditCard, Clock } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import FooterSection from '@/components/FooterSection';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

const ReturnsRefunds = () => {
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
              Returns & Refunds – Pulasa.com
            </h1>
            <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
              Our Policy for Perishable Goods. Due to the highly perishable nature of Pulasa fish and Pulasa fish curry, we do not accept returns once the order has been delivered and accepted.
            </p>
          </div>

          {/* Policy Overview */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-[hsl(var(--destructive))]" />
              Our Policy for Perishable Goods
            </h2>
            <div className="bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/30 rounded-lg p-6">
              <p className="text-lg text-[hsl(var(--foreground))] font-medium">
                Due to the highly perishable nature of Pulasa fish and Pulasa fish curry, we do not accept returns once the order has been delivered and accepted.
              </p>
              <p className="text-[hsl(var(--muted-foreground))] mt-2">
                This policy ensures the highest quality and freshness standards for all our customers.
              </p>
            </div>
          </div>

          {/* Refund Eligibility */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Refund Eligibility
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
              Refunds will be considered only if:
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">1. Product damaged during transit</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">If the product arrives damaged due to transportation issues.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">2. Wrong product delivered</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">If you received fish instead of curry or vice versa, or any other incorrect item.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">3. Package not delivered</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">If the package is not delivered at all due to our fault.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Process */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <RefreshCw className="w-6 h-6 mr-2 text-[hsl(var(--primary))]" />
              Refund Process
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <div className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Notify us within 2 hours of delivery</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Contact us via email or WhatsApp with clear photos/videos of the issue.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <div className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Verification process</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">After verification, we will initiate the refund via Razorpay to your original payment method.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <div className="bg-[hsl(var(--primary))] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Refund credit timelines</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">5–7 working days (subject to bank/payment provider processing times).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Non-Refundable Situations */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <XCircle className="w-6 h-6 mr-2 text-[hsl(var(--destructive))]" />
              Non-Refundable Situations
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/30 rounded-lg">
                <XCircle className="w-5 h-5 text-[hsl(var(--destructive))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Late consumption leading to spoilage</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">If the product spoils due to delayed consumption after delivery.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/30 rounded-lg">
                <XCircle className="w-5 h-5 text-[hsl(var(--destructive))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Order cancellation after dispatch</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Cancellations are not possible once the order has been dispatched.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/30 rounded-lg">
                <XCircle className="w-5 h-5 text-[hsl(var(--destructive))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Incorrect storage by the customer</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">If the product spoils due to improper storage after delivery.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 mb-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Important Notes
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Time-sensitive reporting</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">All issues must be reported within 2 hours of delivery for consideration.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Documentation required</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Clear photos or videos must be provided for verification.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--accent))] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[hsl(var(--foreground))]">Processing time</h3>
                  <p className="text-[hsl(var(--muted-foreground))] mt-1">Refunds may take 5-7 working days to appear in your account.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Refunds */}
          <div className="bg-[hsl(var(--card))] rounded-xl shadow-2xl p-8 border border-[hsl(var(--border))]">
            <h2 className="text-2xl font-semibold text-[hsl(var(--primary))] mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-[hsl(var(--accent))]" />
              Need to Request a Refund?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
                <CreditCard className="w-8 h-8 text-[hsl(var(--accent))] mx-auto mb-2" />
                <h3 className="font-semibold text-[hsl(var(--foreground))]">Email Support</h3>
                <a href="mailto:support@pulasa.com" className="text-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] transition-colors font-medium">
                  support@pulasa.com
                </a>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">Include photos/videos of the issue</p>
              </div>
              <div className="text-center p-6 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 rounded-lg">
                <Truck className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-2" />
                <h3 className="font-semibold text-[hsl(var(--foreground))]">WhatsApp Support</h3>
                <a href="tel:+919035151944" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors font-medium">
                  +91-9035151944
                </a>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">For immediate assistance</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-[hsl(var(--accent))]/10 border border-[hsl(var(--accent))]/30 rounded-lg">
              <p className="text-[hsl(var(--foreground))] text-center">
                <strong>⚠️ Important:</strong> Please report any issues within 2 hours of delivery for faster resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default ReturnsRefunds;
