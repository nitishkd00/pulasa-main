import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const storySteps = [
  {
    title: "The Monsoon's Gift",
    description:
      "The journey begins with the first rains of the monsoon. As the Godavari river swells, the prized Pulasa fish begin their upstream journey, a natural spectacle celebrated for generations.",
    image:
      "https://res.cloudinary.com/ddw4avyim/image/upload/v1751281050/pedro-romero-YQv7CFqSS-g-unsplash_nics6o.jpg",
  },
  {
    title: "The Artisanal Catch",
    description:
      "Our skilled fishermen, using techniques passed down through generations, venture into the turbulent waters. They know the river's secrets, ensuring each catch is a testament to their expertise and respect for nature.",
    image:
      "https://res.cloudinary.com/ddw4avyim/image/upload/v1751276629/snowscat-7e2QqKKOYak-unsplash_aewqwb.jpg",
  },
  {
    title: "Quality and Selection",
    description:
      "Each Pulasa is hand-selected, adhering to the highest standards of size, freshness, and oil content. This meticulous process guarantees that only the finest fish, with the richest flavor, make it to your table.",
    image:
      "https://res.cloudinary.com/ddw4avyim/image/upload/v1751281310/bruno-van-der-kraan-04gzASS-q4Y-unsplash_e8x27x.jpg",
  },
  {
    title: "Delivered Fresh",
    description:
      "From the river to your doorstep in under 24 hours. Our state-of-the-art cold chain logistics ensure the Pulasa retains its peak freshness, flavor, and nutritional value, as if it were just caught.",
    image:
      "https://res.cloudinary.com/ddw4avyim/image/upload/v1750400174/pexels-shukran-2553549_yxbzay.jpg",
  },
];

const StorySection = () => {
  const [showPulasaStory, setShowPulasaStory] = useState(false);

  const handleOrderPulasa = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleLearnMore = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="story" className="py-20 bg-[hsl(var(--secondary))]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-[hsl(var(--primary))] mb-6">
            A Legacy of{" "}
            <span className="text-[hsl(var(--accent))]">Excellence</span>
          </h2>
          <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
            For centuries, Pulasa has been more than just fish – it's a symbol
            of prosperity, tradition, and the deep connection between Telugu
            culture and the sacred Godavari River.
          </p>
        </div>
        <div className="mb-16 flex justify-center">
          <Card
            className={`max-w-3xl w-full overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer group ${
              showPulasaStory ? "ring-4 ring-[hsl(var(--primary))/0.3]" : ""
            }`}
            onClick={() => setShowPulasaStory((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-expanded={showPulasaStory}
          >
            <div className="flex flex-col md:flex-row">
              <img
                src="/assets/WhatsApp Image 2025-08-01 at 3.27.15 PM"
                alt="Pulasa – The Queen of Indian Fish"
                className="w-full md:w-64 h-56 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex-1 p-6 flex flex-col justify-center">
                <h3 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--primary))] mb-2">
                  Pulasa – The Queen of Indian Fish
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] text-base mb-2">
                  In Andhra, the river-bound adult Hilsa is known as Pulasa...
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-[hsl(var(--accent))] font-semibold text-sm">
                    {showPulasaStory ? "Hide Story" : "Read Full Story →"}
                  </span>
                </div>
              </div>
            </div>
            {showPulasaStory && (
              <div className="p-8 bg-[hsl(var(--secondary))/0.5] rounded-b-xl shadow-inner border-t border-[hsl(var(--border))] mt-0 animate-fade-in">
                <div className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
                  <p className="mb-4">
                    In Andhra, the river-bound adult Hilsa is known as Pulasa. If you believe the connoisseurs, it's the Godavari's mud that makes Pulasa distinctive and better than all other variants. Young Hilsa or the adults caught in the sea are not Pulasa. It's the adults that have thrashed their way up the murky waters of the Godavari delta that are prized. Godavari Pulasa regularly sells for as much as Rs. 25,000 per kg, and large catches can be auctioned for several times more.
                  </p>
                  <p className="mb-2 font-semibold">
                    Pulasa Pulusu at Pulasa.com
                  </p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Pulasa Pulusu with Steam Rice</li>
                  </ul>
                  <p className="mb-4">
                    I've only come across one recipe for Pulasa, and that's Pulasa Pulusu. While Bengali Ilish recipes are easily spotted in restaurants, you'd rarely see Pulasa being served commercially. My first Pulasa was at a food promotion by Westin Hyderabad where traditional dishes from the villages of Andhra and Telangana were showcased. More recently, I was able to relish Pulasa Pulusu at Pulasa.com during a specially organised meetup by The Great Hyderabad Food and Travel group.
                  </p>
                  <p className="mb-4">
                    Besides the steep price, the other reason why Pulasa Pulusu is rarely available in restaurants is the long prep. This Pulusu is cooked in earthen pots over wood fire. The cooking process lasts between two to four hours. Since Hilsa is a delicate fish, the temperature has to be carefully controlled. The Pulusu should only be allowed to simmer; too much heat and you'll kill the taste of the fish. The Pulasa Pulusu at Pulasa.com had far fewer bones than I had anticipated. I had presumed that this might have been due to the way the fish was cut, but I later learned that due to the unusually long and slow cooking, many of the smaller bones simply melt, and you're left with only the big bones that are relatively easy to tackle.
                  </p>
                  <p className="mb-4">
                    Pulasa Pulusu is a robust gravy that's spicy and tangy. Typically cooked with okra, the main flavouring ingredients are onion, garlic, tamarind paste, curry leaves, chili powder and chilly. Most also add oil from homemade mango pickle prepared during the summer.
                  </p>
                  <p className="mb-4">
                    Whenever someone hears about Pulasa, two questions that follow: 'Is it worth the price?' and 'Is it worth the hype?' The astronomical prices commanded by Pulasa are difficult to justify. Hilsa from Bengal or Bangladesh usually retail for around Rs. 20,000 to Rs. 25,000 per kg. I am not an impartial commentator, but I've found the Hilsa from Godavari to lack the intense aroma and flavour you'd find in the ones from Bengal or Bangladesh. The insane prices are a reflection of the shortfall in supply vs demand for Godavari Hilsa. You aren't necessarily getting something that's better. Socio-economic factors also have a role to play in this. The well-to-do families take pride in acquiring the best Pulasas in auctions and even gifting them. Pulasa is an aspirational product for many and this undoubtedly adds to the demand.
                  </p>
                  <p className="mb-4">
                    However, one thing that I don't doubt is that Hilsa is the Queen of Indian Fish. And a well-made Pulasa Pulusu is quite simply irresistible. Pulasa.com can prepare Pulasa Pulusu for advance group bookings. There are also home chefs that serve this in Hyderabad.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
        <div className="space-y-20">
          {storySteps.map((step, index) => (
            <div
              key={index}
              data-index={index}
              className={`
                story-card flex flex-col lg:flex-row gap-12 items-center
                ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}
              `}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-400 group">
                  <div className="relative overflow-hidden w-full min-h-[20rem] aspect-[3/1] bg-[hsl(var(--secondary))]">
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{
                        position: "absolute",
                        inset: 0,
                        transition: "opacity 0.7s ease",
                        opacity: 1,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.3] to-transparent pointer-events-none"></div>
                  </div>
                </Card>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(var(--primary))] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="h-px bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex-1"></div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--primary))] mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {step.description}
                </p>
                {/* Decorative Element */}
                <div className="flex items-center space-x-2 pt-4">
                  <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full animate-pulse"></div>
                  <div className="w-4 h-px bg-[hsl(var(--accent))]"></div>
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Call to Action */}
        <div className="text-center mt-20">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Experience the Royal Tradition
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of families who have made Pulasa a part of their
              special occasions and everyday meals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--accent))] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                onClick={handleOrderPulasa}
              >
                Order Your Pulasa
              </button>
              <button
                className="border-2 border-white text-white hover:bg-white hover:text-[hsl(var(--primary))] px-6 py-3 rounded-full font-semibold transition-all duration-300"
                onClick={handleLearnMore}
              >
                Learn More
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
