import React from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, Trophy, CheckCircle, Fish, Waves, Crown, Smartphone } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[hsl(var(--primary))]/5 via-[hsl(var(--accent))]/10 to-[hsl(var(--primary))]/15 border-t-4 border-[hsl(var(--primary))] text-[hsl(var(--primary))] pt-12 pb-8 overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B1420A' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src="https://res.cloudinary.com/ddw4avyim/image/upload/v1752650318/WhatsApp_Image_2025-07-16_at_12.47.22_PM_1_eab8kb.jpg"
                alt="Pulasa.com Logo"
                className="w-12 h-12 object-contain rounded-full shadow-lg border-2 border-[hsl(var(--primary))/20]"
              />
              <div>
                <h3 className="text-2xl font-bold text-[hsl(var(--primary))]">
                  Pulasa<span className="text-[hsl(var(--accent))]">.com</span>
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                  Pulasa Fish Delivery
                </p>
              </div>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-base">
              Bringing the royal taste of Godavari's finest Pulasa fish directly
              to your doorstep. Fresh, authentic, and steeped in Telugu
              tradition.
            </p>
          </div>

          {/* Quick Links - Only Navigation Bar Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[hsl(var(--primary))] tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Fresh Catch
                </Link>
              </li>
              <li>
                <a
                  href="https://auction.pulasa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Auctions
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[hsl(var(--primary))] tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help-support"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery-info"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns-refunds"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & App */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[hsl(var(--primary))] tracking-wide">
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href="https://wa.me/+919035151944"
                  className="flex items-center space-x-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="w-5 h-5 text-[#25D366] group-hover:text-[hsl(var(--accent))] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                  </svg>
                  <span>WhatsApp Support</span>
                </a>
                <div className="flex items-center space-x-2 text-[hsl(var(--primary))]">
                  <Phone className="w-5 h-5" />
                  <span>+91 90351 51944</span>
                </div>
                <div className="flex items-center space-x-2 text-[hsl(var(--primary))]">
                  <Mail className="w-5 h-5" />
                  <span>support@pulasa.com</span>
                </div>
                <a
                  href="https://www.instagram.com/pulasa_fish/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-[#E4405F] group-hover:text-[hsl(var(--accent))] transition-colors" />
                  <span>@pulasa_fish</span>
                </a>
              </div>
            </div>

            {/* App Download Teaser */}
            <Card className="bg-[hsl(var(--card))/0.8] backdrop-blur-sm border border-[hsl(var(--primary))] shadow-lg p-5 rounded-xl hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-2">
                <Smartphone className="w-5 h-5 text-[hsl(var(--primary))]" />
                <h5 className="font-semibold text-[hsl(var(--primary))]">
                  App Coming Soon
                </h5>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Get ready for our mobile app launch! We're working hard to bring you an even better ordering experience.
              </p>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[hsl(var(--border))] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Awards & Certifications */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-base">
                <div className="w-9 h-9 bg-[hsl(var(--card))/0.8] backdrop-blur-sm rounded-full flex items-center justify-center border border-[hsl(var(--primary))/20] shadow-md">
                  <Trophy className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <span className="text-[hsl(var(--primary))]">
                  Best Seafood 2025
                </span>
              </div>
              <div className="flex items-center space-x-2 text-base">
                <div className="w-9 h-9 bg-[hsl(var(--card))/0.8] backdrop-blur-sm rounded-full flex items-center justify-center border border-[hsl(var(--primary))/20] shadow-md">
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <span className="text-[hsl(var(--primary))]">
                  Certified Fresh
                </span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-[hsl(var(--muted-foreground))] text-base">
              <p>&copy; 2025 Pulasa.com. All rights reserved.</p>
              <p className="mt-1 flex items-center justify-center space-x-1">
                Made with 
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                for Telugu fish lovers
              </p>
            </div>

            {/* Creative Fish-themed Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[hsl(var(--card))/0.8] backdrop-blur-sm rounded-full flex items-center justify-center border border-[hsl(var(--primary))/20] shadow-md">
                  <Fish className="w-4 h-4 text-[hsl(var(--primary))]" />
                </div>
                <span className="text-sm font-medium text-[hsl(var(--primary))]">
                  Fresh from Godavari
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[hsl(var(--card))/0.8] backdrop-blur-sm rounded-full flex items-center justify-center border border-[hsl(var(--primary))/20] shadow-md">
                  <Waves className="w-4 h-4 text-[hsl(var(--primary))]" />
                </div>
                <span className="text-sm font-medium text-[hsl(var(--primary))]">
                  Royal Taste
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[hsl(var(--card))/0.8] backdrop-blur-sm rounded-full flex items-center justify-center border border-[hsl(var(--primary))/20] shadow-md">
                  <Crown className="w-4 h-4 text-[hsl(var(--primary))]" />
                </div>
                <span className="text-sm font-medium text-[hsl(var(--primary))]">
                  Premium Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
