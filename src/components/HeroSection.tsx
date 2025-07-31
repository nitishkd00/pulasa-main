import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const handleOrderClick = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStory = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/ddw4avyim/video/upload/v1750400015/13558409_1920_1080_60fps_yydqgb.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F4E5F]/80 via-[#1F4E5F]/60 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 pt-20 md:pt-24 h-full flex items-center justify-start">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8 animate-fade-in text-left">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  The Royal Taste
                  <br />
                  <span className="text-[hsl(var(--primary))] relative inline-block">
                    of Godavari
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-full"></div>
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 font-light leading-relaxed">
                  Premium Pulasa fish, freshly caught from the sacred waters of
                  River Godavari. Experience the legendary taste that was once
                  reserved for royalty.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleOrderClick}
                  className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white px-8 py-4 text-lg rounded-full 
                    transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl
                    relative overflow-hidden group"
                >
                  <span className="relative z-10">Order Fresh Pulasa</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>

                <Button
                  onClick={scrollToStory}
                  variant="outline"
                  className="border-2 border-[hsl(var(--primary))] bg-white text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-md font-semibold"
                >
                  See Pulasa Journey
                </Button>
              </div>
            </div>

            {/* Right Content - Fish Image */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
