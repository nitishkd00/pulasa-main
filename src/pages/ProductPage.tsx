import React from "react";
import NavigationHeader from "@/components/NavigationHeader";
import ProductShowcase from "@/components/ProductShowcase";
import FooterSection from "@/components/FooterSection";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const ProductPage = () => {
  // Scroll to top when component mounts
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavigationHeader />
      <main className="flex-grow pt-16">
        <div className="w-full max-w-4xl mx-auto mt-6 mb-4 rounded-lg overflow-hidden">
          <img
            src="https://res.cloudinary.com/ddw4avyim/image/upload/v1751276629/snowscat-7e2QqKKOYak-unsplash_aewqwb.jpg"
            alt="Banner"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <ProductShowcase />
      </main>
      <FooterSection />
    </div>
  );
};

export default ProductPage;
