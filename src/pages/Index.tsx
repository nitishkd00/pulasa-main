import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ProductShowcase from "@/components/ProductShowcase";
import NavigationHeader from "@/components/NavigationHeader";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <NavigationHeader />
      <HeroSection />
      <StorySection />
      <ProductShowcase />
      <FooterSection />
    </div>
  );
};

export default Index;
