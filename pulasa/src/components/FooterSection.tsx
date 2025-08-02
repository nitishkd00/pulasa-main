import React from "react";
import { Card } from "@/components/ui/card";

const FooterSection = () => {
  return (
    <footer className="bg-white border-t-4 border-[hsl(var(--primary))] text-[hsl(var(--primary))] pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src="https://res.cloudinary.com/ddw4avyim/image/upload/v1752650318/WhatsApp_Image_2025-07-16_at_12.47.22_PM_1_eab8kb.jpg"
                alt="Pulasa.com Logo"
                className="w-12 h-12 object-contain rounded-full shadow-lg border-2 border-[hsl(var(--primary))/20]"
              />
              <h3 className="text-2xl font-bold text-[hsl(var(--primary))]">
                Pulasa<span className="text-[hsl(var(--accent))]">.com</span>
              </h3>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed text-base">
              Bringing the royal taste of Godavari's finest Pulasa fish directly
              to your doorstep. Fresh, authentic, and steeped in Telugu
              tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[hsl(var(--primary))] tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "Fresh Catch",
                "Our Story",
                "Recipes",
                "Order Tracking",
                "Customer Reviews",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[hsl(var(--primary))] tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2">
              {[
                "Help & Support",
                "Delivery Info",
                "Returns & Refunds",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors hover:underline text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
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
                  <span className="w-5 h-5 flex items-center justify-center">
                    {/* WhatsApp SVG Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 group-hover:text-[hsl(var(--accent))] transition-colors"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="currentColor"
                        className="text-[#25D366] group-hover:text-[hsl(var(--accent))] transition-colors"
                      />
                      <path
                        fill="#fff"
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.21-.242-.58-.487-.501-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.369.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"
                      />
                    </svg>
                  </span>
                  <span>WhatsApp Support</span>
                </a>
                <div className="flex items-center space-x-2 text-[hsl(var(--primary))]">
                  <span>📞</span>
                  <span>+91 90351 51944</span>
                </div>
                <div className="flex items-center space-x-2 text-[hsl(var(--primary))]">
                  <span>✉️</span>
                  <span>hello@pulasa.com</span>
                </div>
                <a
                  href="https://www.instagram.com/pulasa_com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors group"
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {/* Official Instagram SVG Icon */}
                    <svg
                      viewBox="0 0 448 512"
                      fill="currentColor"
                      className="w-5 h-5 group-hover:text-[hsl(var(--accent))] transition-colors"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1S388.6 7.6 353.3 5.9C317.8 4.2 130.2 4.2 94.7 5.9 59.4 7.6 28 15.8 2.7 41.1S7.6 59.4 5.9 94.7C4.2 130.2 4.2 317.8 5.9 353.3c1.7 35.3 9.9 66.7 36.2 92.1s56.8 34.5 92.1 36.2c35.5 1.7 223.1 1.7 258.6 0 35.3-1.7 66.7-9.9 92.1-36.2s34.5-56.8 36.2-92.1c1.7-35.5 1.7-223.1 0-258.6z" />
                    </svg>
                  </span>
                  <span>@pulasa_com</span>
                </a>
              </div>
            </div>

            {/* App Download Teaser */}
            <Card className="bg-white border border-[hsl(var(--primary))] shadow p-5 rounded-xl">
              <h5 className="font-semibold mb-2 text-[hsl(var(--primary))]">
                📱 App Coming Soon
              </h5>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                Get notified when our mobile app launches for even faster
                ordering!
              </p>
              <button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-md">
                Notify Me
              </button>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[hsl(var(--border))] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Awards & Certifications */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-base">
                <span className="w-9 h-9 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center text-xl border border-[hsl(var(--primary))/20]">
                  🏆
                </span>
                <span className="text-[hsl(var(--primary))]">
                  Best Seafood 2025
                </span>
              </div>
              <div className="flex items-center space-x-2 text-base">
                <span className="w-9 h-9 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center text-xl border border-[hsl(var(--primary))/20]">
                  ✅
                </span>
                <span className="text-[hsl(var(--primary))]">
                  Certified Fresh
                </span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-[hsl(var(--muted-foreground))] text-base">
              <p>&copy; 2025 Pulasa.com. All rights reserved.</p>
              <p className="mt-1">
                Made with <span className="text-red-400">❤️</span> for Telugu
                fish lovers
              </p>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              {["Facebook", "Instagram", "YouTube", "Twitter"].map(
                (platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--primary))] rounded-full flex items-center justify-center transition-colors group shadow"
                  >
                    <span className="text-lg text-[hsl(var(--primary))] group-hover:text-white group-hover:scale-110 transition-transform">
                      {platform[0]}
                    </span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
