import React from "react";
import NavigationHeader from "@/components/NavigationHeader";
import FooterSection from "@/components/FooterSection";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const Blogs = () => {
  // Scroll to top when component mounts
  useScrollToTop();

  const blogPosts = [
    {
      id: 1,
      title: "Discovering the Delicacy of Pulasa Fish: An In-Depth Exploration",
      subtitle:
        "Explore the origins, unique flavor, and culinary magic of Godavari's legendary Pulasa fish. Learn why it's a must-try and how you can get it delivered fresh to your door!",
      image: "/assets/blogs/blog1/main_page.png",
      link: "/blogs/1",
    },
    {
      id: 2,
      title:
        "The Health Benefits of Including Pulasa Fish in Your Diet: A Comprehensive Guide",
      subtitle:
        "Discover why Pulasa is a nutritional powerhouse—rich in omega-3s, protein, and essential minerals. Learn how this seasonal delight supports heart, brain, and immune health, and how to enjoy it fresh at home!",
      image: "/assets/blogs/blog2/Gemini_Generated_Image_y8sn6by8sn6by8sn.png",
      link: "/blogs/2",
    },
    {
      id: 3,
      title:
        "Traditional Recipes Featuring Pulasa Fish: A Culinary Journey Through Andhra Flavors",
      subtitle:
        "Explore classic Andhra recipes for Pulasa—from tangy pulusu to crispy fry. Step-by-step guides and serving tips help you bring authentic river flavors to your kitchen, with fresh Pulasa delivered to your door!",
      image: "/assets/blogs/blog3/Gemini_Generated_Image_1nqnf11nqnf11nqn.png",
      link: "/blogs/3",
    },
    {
      id: 4,
      title:
        "The Cultural Significance of Pulasa Fish in Indian Traditions: A Deep Dive",
      subtitle:
        "Uncover the rich cultural, social, and symbolic meanings of Pulasa in Indian traditions. From festivals to folklore, see how this river delicacy connects communities and heritage.",
      image: "/assets/blogs/blog4/Gemini_Generated_Image_h2cw2xh2cw2xh2cw.png",
      link: "/blogs/4",
    },
    {
      id: 5,
      title:
        "Sustainable Fishing Practices for Pulasa Fish: Ensuring a Future for This River Treasure",
      subtitle:
        "Learn about the challenges and solutions for sustainable Pulasa fishing. Discover how ethical sourcing and conservation efforts protect this iconic fish for generations to come.",
      image: "/assets/blogs/blog5/Gemini_Generated_Image_98rxbt98rxbt98rx.png",
      link: "/blogs/5",
    },
    {
      id: 6,
      title:
        "Why Pulasa Fish is a Must-Try for Seafood Lovers: An In-Depth Appreciation",
      subtitle:
        "Dive into the unique flavor, rarity, and culinary versatility of Pulasa. See why this Godavari delicacy is a must for seafood enthusiasts, and how to enjoy it fresh at home.",
      image: "/assets/blogs/blog6/Gemini_Generated_Image_at4nk1at4nk1at4n.png",
      link: "/blogs/6",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavigationHeader />
      <main className="flex-grow w-full px-4 py-12 pt-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[hsl(var(--primary))] mb-2">
            Our Blog
          </h1>
          <p className="text-lg text-center text-[hsl(var(--muted-foreground))] mb-10">
            Stay informed with the latest insights, stories, and Pulasa culture
            from the Godavari.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[hsl(var(--secondary))] rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-[hsl(var(--primary))] mb-2">
                    {post.title}
                  </h2>
                  <p className="text-[hsl(var(--muted-foreground))] mb-4 flex-1">
                    {post.subtitle}
                  </p>
                  <a
                    href={post.link}
                    className="mt-auto inline-block bg-[hsl(var(--primary))] text-white px-5 py-2 rounded-full font-semibold hover:bg-[hsl(var(--accent))] transition-colors text-center"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Blogs;
