import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import FooterSection from "@/components/FooterSection";
import { Card } from "@/components/ui/card";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

// Blog content map (id: JSX)
const blogContent: Record<string, JSX.Element> = {
  "1": (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[hsl(var(--primary))] mb-6 leading-tight tracking-tight">
        Blog 1: Pulasa Through the Ages – A Cultural Symbol of Andhra Royalty
      </h1>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        📜 A Legacy Rooted in River and Royalty
      </h2>
      <img
        src="/assets/blogs/blog1/1.png"
        alt="Pulasa River Royalty"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        In the heart of Andhra Pradesh, where the Godavari River breathes life
        into its delta, a remarkable fish has swum its way through history,
        culture, and the soul of Telugu tradition—
        <span className="font-semibold text-[hsl(var(--accent))]">Pulasa</span>.
        This isn't just another seasonal delicacy—it is a living symbol of
        honor, ritual, and legacy that connects the people of the coast to the
        monsoon-fed lifeline of their land.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa (Telugu: <span className="font-semibold">పులస</span>), the
        river-migrating form of Hilsa, undergoes a dramatic transformation when
        it enters the fresh, swelling waters of the Godavari during monsoon.
        Unlike its cousins from the sea or other rivers, Pulasa takes on a
        distinct richness, texture, and aroma during its journey
        upstream—qualities long revered by Telugu households and kings alike.
      </p>
      <img
        src="/assets/blogs/blog1/2.png"
        alt="Pulasa Rituals"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        👑 Royal Tables and Rituals
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Historically, Pulasa was known as the "Queen of Fish", and rightly so.
        During the Satavahana and Kakatiya periods, Pulasa was gifted to
        visiting royals, courtiers, and foreign traders as a symbol of honor and
        welcome. Ancient accounts from Rajamahendravaram (present-day
        Rajahmundry) mention seasonal fish feasts hosted on riverbanks, where
        Pulasa featured as the centerpiece dish.
      </p>
      <img
        src="/assets/blogs/blog1/3.png"
        alt="Pulasa Family Tradition"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        In Zamindari households of Konaseema and Kakinada, serving Pulasa was
        considered a matter of pride. Elaborate recipes were passed down
        matrilineally, some even guarded like family heirlooms. Households would
        mark the arrival of the first Pulasa with special prayers and offerings,
        aligning with Ashada or Shravana months in the Telugu calendar.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        📚 In Literature and Lore
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa's fame has not just remained in kitchens but echoed through
        Telugu literature and folklore. In the Bammera Pothana's Bhagavatam,
        fish from the Godavari are metaphorically used to express transformation
        and divine journey—a nod to how Pulasa transforms when it leaves the
        ocean behind.
      </p>
      <img
        src="/assets/blogs/blog1/main_page.png"
        alt="Pulasa Literature"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Folktales speak of villagers timing weddings, housewarmings, and
        annadanams around the availability of Pulasa, believing that the fish
        brought auspiciousness and blessings when shared with family and
        neighbors.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        🌊 Sacred Waters, Sacred Catch
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        What sets Pulasa apart isn't just its monsoon migration but where and
        how it is caught. The upper stretches of Dowleswaram Barrage, Yanam
        backwaters, and Narasapuram tributaries form the sacred theater of its
        catch. Fishing here is ritualistic, guided by lunar phases, tide
        timings, and ancestral knowledge.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Many families in these riverbank villages still begin the Pulasa season
        with a puja to the river, offering turmeric, flowers, and betel leaves
        before casting the first net. For them, Pulasa is not just fish—it's the
        river's divine gift.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        🏡 Pulasa in the Modern Telugu Home
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Even today, Pulasa graces special occasions like Shravana feasts, Rakhi
        lunches, and family reunions, especially in Amalapuram, Rajahmundry, and
        Hyderabad. Its seasonal nature brings families together, often
        triggering nostalgic stories from grandparents who remember the smell of
        clay stoves cooking Pulasa fry wrapped in banana leaves.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        With modern cold-chain transport, Pulasa now reaches cities across
        India, but for many, nothing beats eating it by the river, on a rainy
        evening, with steam rising from hot rice and spicy curry.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        💬 A Legacy You Can Taste
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa isn't just Andhra's seasonal delicacy. It's an emotion. A
        cultural memory. A piece of Telugu history you can eat.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Whether you're tasting it for the first time or reliving your childhood
        memories, you're taking part in a centuries-old tradition that began at
        the confluence of monsoon skies, river currents, and ancestral wisdom.
      </p>
    </>
  ),
  "2": (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[hsl(var(--primary))] mb-6 leading-tight tracking-tight">
        Blog 2: The Health Benefits of Including Pulasa Fish in Your Diet: A
        Comprehensive Guide
      </h1>
      <img
        src="/assets/blogs/blog2/Gemini_Generated_Image_y8sn6by8sn6by8sn.png"
        alt="Pulasa Health Benefits"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fish, a seasonal delight from the Godavari River, isn't just a
        culinary treasure—it's a nutritional powerhouse that can enhance your
        overall well-being. Renowned for its rich, oily texture, this variant of
        hilsa fish offers a wealth of health advantages, from supporting heart
        and brain function to boosting immunity and aiding weight management. In
        this in-depth blog, we'll explore the science-backed benefits of
        incorporating Pulasa into your meals, drawing on its unique nutrient
        profile. Whether you're focused on preventive health or simply seeking
        flavorful, wholesome options, Pulasa stands out as an excellent choice.
        Through our online platform, we make it effortless to access fresh
        Pulasa with reliable delivery, bringing these benefits straight to your
        kitchen.
      </p>
      <img
        src="/assets/blogs/blog2/Gemini_Generated_Image_gm1fxigm1fxigm1f.png"
        alt="Pulasa Nutrition"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Nutrient-Rich Profile of Pulasa Fish
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fish is packed with essential nutrients that make it a standout
        in healthy eating. As an oily fish, it's abundant in omega-3 fatty
        acids, which are crucial for reducing inflammation and promoting
        cardiovascular health. These fatty acids help lower cholesterol levels
        and improve insulin regulation, potentially reducing the risk of heart
        disease and supporting metabolic balance. Additionally, Pulasa is low in
        carbohydrates and calories, making it ideal for those monitoring their
        weight while still providing satisfying, nutrient-dense meals.
      </p>
      <img
        src="/assets/blogs/blog2/Gemini_Generated_Image_vm8m4svm8m4svm8m.png"
        alt="Pulasa Protein"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Beyond fats, Pulasa delivers high-quality protein that supports muscle
        repair, growth, and overall body maintenance. This protein content is
        particularly beneficial for active individuals or those recovering from
        physical exertion. The fish also contains key minerals like selenium and
        phosphorus, which strengthen the immune system and contribute to bone
        health by aiding calcium absorption. With vitamins such as B12 and D,
        Pulasa further enhances energy levels, brain performance, and even eye
        health.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Heart Health and Inflammation Reduction
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        One of the most celebrated benefits of Pulasa is its positive impact on
        heart health. The omega-3 fatty acids in this fish work to decrease bad
        cholesterol (LDL) while maintaining healthy blood flow, which can lower
        the risk of cardiovascular issues. Regular consumption may help regulate
        blood pressure and reduce arterial inflammation, creating a protective
        effect against heart-related conditions. For those with a family history
        of heart concerns, adding Pulasa to your diet could be a natural way to
        support long-term wellness.
      </p>
      <img
        src="/assets/blogs/blog2/Gemini_Generated_Image_n6zdyn6zdyn6zdyn.png"
        alt="Pulasa Heart Health"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Moreover, these anti-inflammatory properties extend to joint health,
        potentially alleviating pain and stiffness associated with conditions
        like arthritis. By incorporating Pulasa through our convenient online
        delivery, you can enjoy these heart-boosting effects without the hassle
        of seasonal sourcing.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Brain Function and Cognitive Support
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa's nutrient lineup shines when it comes to brain health. The
        omega-3s, particularly EPA and DHA, enhance cognitive function by
        strengthening neural connections and promoting mental clarity. Vitamin
        B12 in Pulasa plays a vital role in nerve health and energy production,
        which can improve focus, memory, and overall brain performance. Studies
        suggest that diets rich in such nutrients may help mitigate age-related
        cognitive decline, making Pulasa a smart addition for students,
        professionals, or anyone prioritizing mental sharpness.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        For skin and hair benefits, the fatty acids in Pulasa contribute to a
        natural glow and stronger, healthier strands by nourishing from within.
        Our fresh deliveries ensure you get Pulasa at its peak nutritional
        value, ready to support your daily cognitive and aesthetic goals.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Immune Boost and Bone Strength
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Building a resilient immune system is easier with Pulasa's mineral
        content. Selenium acts as an antioxidant, protecting cells from damage
        and enhancing immune responses. Phosphorus, meanwhile, fortifies bones
        and teeth, working alongside vitamin D to improve calcium uptake and
        prevent issues like osteoporosis. This combination makes Pulasa
        especially valuable for growing children, older adults, or anyone
        recovering from illness.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Its low-calorie nature also supports weight control, allowing you to
        maintain a balanced diet without sacrificing flavor. Opt for our online
        service to receive sustainably sourced Pulasa, ensuring these immune and
        skeletal benefits are always within reach.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Incorporating Pulasa into Your Diet Safely
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        To reap these rewards, aim to include Pulasa in your meals two to three
        times a week, prepared by grilling, steaming, or currying to preserve
        its nutrients. Pair it with vegetables, whole grains, or legumes for a
        complete, balanced plate. However, those with fish allergies, pregnant
        individuals, or heart conditions should consult a doctor due to
        potential risks like mercury exposure or allergic reactions. Freshness
        is key—our platform guarantees top-quality Pulasa delivered promptly, so
        you can focus on healthful cooking.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fish represents more than a meal; it's a pathway to enhanced
        vitality through nature's bounty. By choosing our website for online
        ordering and delivery, you're investing in premium, ethically sourced
        seafood that aligns with your health goals. Explore our selection today
        and discover how Pulasa can transform your diet—stay tuned for more tips
        on recipes and sustainable choices!
      </p>
    </>
  ),
  "3": (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[hsl(var(--primary))] mb-6 leading-tight tracking-tight">
        Blog 3: Traditional Recipes Featuring Pulasa Fish: A Culinary Journey
        Through Andhra Flavors
      </h1>
      <img
        src="/assets/blogs/blog3/Gemini_Generated_Image_1nqnf11nqnf11nqn.png"
        alt="Pulasa Recipes"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fish, with its luxurious texture and rich, buttery essence, is a
        cornerstone of Andhra Pradesh's culinary heritage. Harvested from the
        Godavari River during the monsoon season, this delicacy lends itself
        beautifully to time-honored recipes that celebrate bold spices, tangy
        elements, and the natural freshness of seafood. In this detailed blog,
        we'll explore a selection of traditional Pulasa dishes, complete with
        step-by-step guides, ingredient insights, and serving suggestions.
        Whether you're an experienced cook or a beginner eager to try regional
        specialties, these recipes will help you unlock the full potential of
        Pulasa in your kitchen. Best of all, our online platform makes it simple
        to order fresh Pulasa with prompt delivery, ensuring you have the
        highest quality fish ready for these authentic preparations.
      </p>
      <img
        src="/assets/blogs/blog3/Gemini_Generated_Image_5jn8o55jn8o55jn8.png"
        alt="Pulasa Andhra Cuisine"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Introduction to Andhra Cuisine and Pulasa's Role
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Andhra cuisine is renowned for its fiery spices, tangy gravies, and
        emphasis on fresh, local ingredients, often drawing from the region's
        rivers and coastlines. Pulasa, a premium variant of hilsa fish, fits
        perfectly into this framework due to its oily, tender flesh that absorbs
        flavors without losing its inherent delicacy. Traditionally prepared
        during festivals or family gatherings, Pulasa dishes symbolize abundance
        and hospitality in Telugu culture. From sour curries to crispy fries,
        these recipes highlight the fish's versatility while preserving its
        melt-in-your-mouth quality. By sourcing Pulasa through our website, you
        can recreate these classics at home, bridging the gap between river
        traditions and modern convenience.
      </p>
      <img
        src="/assets/blogs/blog3/Gemini_Generated_Image_1y6dnd1y6dnd1y6d.png"
        alt="Pulasa Pulusu"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Classic Pulasa Pulusu: Tangy Tamarind Curry
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa Pulusu is a quintessential Andhra dish that marries the fish's
        richness with a tangy, spice-infused gravy. This curry, or "pulusu,"
        gets its signature sourness from tamarind, balanced by aromatic spices
        that create a harmonious depth of flavor. It's a staple in Godavari
        households, often enjoyed during the rainy season when Pulasa is at its
        peak.
      </p>
      <ul className="mb-4 text-lg text-[hsl(var(--muted-foreground))] list-disc ml-6">
        <li>500g fresh Pulasa fish, cleaned and cut into pieces</li>
        <li>
          2 tablespoons tamarind paste (or extract from a lemon-sized ball of
          tamarind)
        </li>
        <li>2 onions, finely chopped</li>
        <li>3-4 green chilies, slit</li>
        <li>1 tablespoon ginger-garlic paste</li>
        <li>
          1 teaspoon each: turmeric powder, red chili powder, coriander powder
        </li>
        <li>A handful of fresh coriander leaves for garnish</li>
        <li>Salt to taste</li>
        <li>
          2 tablespoons oil (preferably sesame or groundnut for authenticity)
        </li>
        <li>Water as needed</li>
      </ul>
      <ol className="mb-4 text-lg text-[hsl(var(--muted-foreground))] list-decimal ml-6">
        <li>
          Marinate the Pulasa pieces with turmeric, salt, and a pinch of chili
          powder for 15-20 minutes to enhance tenderness and reduce any raw
          odor.
        </li>
        <li>
          Heat oil in a pan and sauté the onions until golden brown. Add
          ginger-garlic paste and green chilies, cooking until fragrant.
        </li>
        <li>
          Stir in the remaining spices (chili powder, coriander powder) and
          tamarind paste, mixing well to form a thick base. Add water to achieve
          a gravy consistency and bring to a simmer.
        </li>
        <li>
          Gently add the marinated fish pieces, cover, and cook on low heat for
          10-12 minutes until the fish is tender and the flavors meld.
        </li>
        <li>
          Garnish with coriander leaves and serve hot with steamed rice or
          millets for a complete meal.
        </li>
      </ol>
      <img
        src="/assets/blogs/blog3/Gemini_Generated_Image_2sdbr42sdbr42sdb.png"
        alt="Pulasa Fry"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Pulasa Fry: Crispy Masala-Coated Delight
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        For those who prefer a drier, crunchier preparation, Pulasa Fry is a
        go-to recipe that showcases the fish's juicy interior beneath a spiced,
        golden crust. This simple yet flavorful dish is perfect as an appetizer
        or side, often featured in festive spreads where its aroma draws
        everyone to the table.
      </p>
      <ul className="mb-4 text-lg text-[hsl(var(--muted-foreground))] list-disc ml-6">
        <li>500g Pulasa fish, cut into steaks or fillets</li>
        <li>
          1 tablespoon each: red chili powder, turmeric powder, coriander powder
        </li>
        <li>1 teaspoon garam masala</li>
        <li>2 tablespoons ginger-garlic paste</li>
        <li>Juice of 1 lemon</li>
        <li>Salt to taste</li>
        <li>3-4 tablespoons oil for frying</li>
        <li>Optional: A pinch of rice flour for extra crispiness</li>
      </ul>
      <ol className="mb-4 text-lg text-[hsl(var(--muted-foreground))] list-decimal ml-6">
        <li>
          Prepare a marinade by mixing the spices, ginger-garlic paste, lemon
          juice, and salt into a paste. Coat the Pulasa pieces evenly and let
          them rest for 20-30 minutes.
        </li>
        <li>
          Heat oil in a shallow pan over medium flame. If using rice flour,
          lightly dust the marinated fish for added crunch.
        </li>
        <li>
          Fry the pieces for 4-5 minutes per side until the exterior is crispy
          and the inside remains moist and flaky. Avoid overcrowding the pan to
          ensure even cooking.
        </li>
        <li>
          Drain on paper towels and serve immediately with lemon wedges and
          sliced onions.
        </li>
      </ol>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Steamed Pulasa: A Light and Healthy Option
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        For a minimalist approach that emphasizes Pulasa's pure taste, steaming
        is an excellent method. This lighter recipe is ideal for
        health-conscious eaters or those seeking a subtle introduction to the
        fish, preserving its nutrients and delicate texture without heavy
        spices.
      </p>
      <ul className="mb-4 text-lg text-[hsl(var(--muted-foreground))] list-disc ml-6">
        <li>500g Pulasa fish, whole or in large pieces</li>
        <li>1 teaspoon turmeric powder</li>
        <li>Salt to taste</li>
        <li>A few slices of ginger and green chilies</li>
        <li>Fresh herbs like curry leaves or coriander for aroma</li>
        <li>Lemon slices for serving</li>
      </ul>
      <ol className="mb-4 text-lg text-[hsl(var(--muted-foreground))] list-decimal ml-6">
        <li>
          Rub the fish with turmeric and salt, allowing it to marinate briefly.
        </li>
        <li>
          Place the fish in a steamer basket, adding ginger, chilies, and herbs
          on top.
        </li>
        <li>
          Steam for 10-15 minutes until the flesh is opaque and flakes easily.
        </li>
        <li>Serve with a squeeze of lemon and a side of salad or yogurt.</li>
      </ol>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Tips for Success and Experimentation
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        To master these recipes, always use fresh Pulasa—our delivery service
        guarantees it arrives in optimal condition. Experiment by adding
        regional twists, like coconut milk in the pulusu for creaminess. Store
        any leftovers in the fridge and reheat gently to maintain texture.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa recipes are more than meals; they're a celebration of Andhra's
        vibrant food culture. Order from our website today for seamless access
        to this delicacy, and let these traditions inspire your cooking. Stay
        tuned for more on Pulasa's health benefits and sustainable sourcing!
      </p>
    </>
  ),
  "4": (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[hsl(var(--primary))] mb-6 leading-tight tracking-tight">
        Blog 4: The Cultural Significance of Pulasa Fish in Indian Traditions: A
        Deep Dive
      </h1>
      <img
        src="/assets/blogs/blog4/Gemini_Generated_Image_h2cw2xh2cw2xh2cw.png"
        alt="Pulasa Culture"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fish, a cherished delicacy from the Godavari River in Andhra
        Pradesh, transcends its role as mere seafood to embody deep cultural,
        social, and symbolic meanings in Indian traditions. Often regarded as a
        symbol of prosperity and the monsoon's generous bounty, this migratory
        fish has woven itself into the fabric of regional folklore, festivals,
        and community life. Its seasonal arrival during the rainy months sparks
        excitement, turning it into more than just a meal—it's a bridge to
        heritage, abundance, and shared joy. In this detailed exploration, we'll
        uncover the layers of Pulasa's cultural importance, from ancient legends
        to modern-day celebrations. Through our online platform, we bring this
        iconic fish fresh to your doorstep via reliable delivery, allowing you
        to partake in these timeless traditions no matter your location.
      </p>
      <img
        src="/assets/blogs/blog4/Gemini_Generated_Image_5uarun5uarun5uar.png"
        alt="Pulasa History"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Historical Roots and Regional Identity
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa, a variant of the hilsa fish (Tenualosa ilisha), holds a special
        place in the cultural identity of Andhra Pradesh, particularly in the
        Godavari delta regions. Its name derives from local Telugu dialects,
        reflecting its integral role in the lives of riverside communities where
        the Godavari's waters are seen as life-giving. Historically, the fish's
        upstream migration during monsoons has been tied to themes of renewal
        and fertility, mirroring the river's flooding that enriches farmlands.
        In areas like East and West Godavari districts, Pulasa is not just
        harvested but revered as a gift from nature, with fishing practices
        passed down through generations that emphasize respect for the
        ecosystem.
      </p>
      <img
        src="/assets/blogs/blog4/Gemini_Generated_Image_bu03mebu03mebu03.png"
        alt="Pulasa Festivals"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Role in Festivals and Celebrations
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa plays a starring role in various Indian festivals, where it's
        prepared as a centerpiece to mark occasions of joy and harvest. During
        Sankranti, a major harvest festival in Andhra Pradesh, families often
        include Pulasa in feasts to symbolize prosperity and good fortune for
        the coming year. The fish is shared among relatives and friends,
        reinforcing community bonds and the spirit of giving. In monsoon-season
        gatherings, especially in Godavari villages, Pulasa-based dishes like
        pulusu (tangy curry) are prepared in large quantities for communal
        meals, turning simple dining into festive events that celebrate the
        rains' arrival.
      </p>
      <img
        src="/assets/blogs/blog4/Gemini_Generated_Image_t14dgft14dgft14d.png"
        alt="Pulasa Folklore"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Folklore, Legends, and Symbolic Meanings
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Folklore surrounding Pulasa is rich with tales that elevate it to
        mythical status. Local legends in Andhra Pradesh portray the fish as a
        divine blessing from the Godavari River, believed to bring luck and
        abundance to those who catch or consume it. One popular saying, "Pustelu
        ammi ayina Pulasa tinocchu," translates to "It's worth eating Pulasa
        even by selling one's nuptials," illustrating the fish's perceived value
        as greater than material possessions. This proverb underscores themes of
        indulgence and the prioritization of life's simple pleasures, deeply
        embedded in Telugu culture.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Social and Community Aspects
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fosters social cohesion through shared experiences, from fishing
        expeditions to family feasts. In Godavari regions, the annual Pulasa
        season becomes a communal event, with auctions and markets buzzing with
        excitement as people bid on the freshest catches. These gatherings
        strengthen social ties, often involving bartering, storytelling, and
        collective cooking that bridge generations. For many, preparing and
        sharing Pulasa dishes is a way to honor ancestors and maintain cultural
        practices, turning meals into acts of heritage preservation.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Preserving the Legacy in Today's World
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        While Pulasa's cultural importance endures, challenges like overfishing
        and environmental changes threaten its availability, prompting calls for
        sustainable practices to safeguard this heritage. Today, efforts to
        promote ethical sourcing blend tradition with conservation, allowing
        future generations to experience its significance. By choosing Pulasa
        from responsible sources, consumers contribute to preserving these
        cultural narratives.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fish is far more than a seasonal treat—it's a living piece of
        Indian heritage that connects us to our roots, festivals, and
        communities. Embrace this legacy by exploring our online selection for
        fresh, sustainably sourced Pulasa delivered directly to you. Whether for
        a family gathering or a personal indulgence, let Pulasa bring a touch of
        tradition to your table. Stay tuned for more insights on its health
        benefits, recipes, and sustainable fishing in upcoming blogs!
      </p>
    </>
  ),
  "5": (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[hsl(var(--primary))] mb-6 leading-tight tracking-tight">
        Blog 5: Sustainable Fishing Practices for Pulasa Fish: Ensuring a Future
        for This River Treasure
      </h1>
      <img
        src="/assets/blogs/blog5/Gemini_Generated_Image_98rxbt98rxbt98rx.png"
        alt="Pulasa Sustainability"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fish, the prized delicacy from the Godavari River in Andhra
        Pradesh, India, embodies the delicate balance between nature's bounty
        and human stewardship. As a migratory species that thrives during the
        monsoon season, Pulasa faces growing challenges from overfishing,
        pollution, and environmental changes, making sustainable practices
        essential for its survival. In this comprehensive blog, we'll delve into
        the methods and strategies that promote responsible harvesting, drawing
        on local traditions and modern conservation efforts. By understanding
        and supporting these practices, we can help preserve Pulasa for
        generations to come. Our online platform connects you with ethically
        sourced Pulasa through seamless delivery, allowing you to enjoy this gem
        while contributing to its sustainability.
      </p>
      <img
        src="/assets/blogs/blog5/Gemini_Generated_Image_w720r5w720r5w720.png"
        alt="Pulasa Challenges"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Understanding the Challenges to Pulasa Sustainability
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa, a variant of the hilsa fish (Tenualosa ilisha), migrates
        upstream in the Godavari River from June to September for spawning,
        transforming from the less flavorful ilisha in the sea to the rich, oily
        delicacy cherished in Andhra cuisine. However, its populations have
        dwindled due to several factors, including excessive fishing of
        juveniles, which prevents the species from replenishing. Pollution from
        industrial effluents released into the river poses a significant threat,
        affecting water quality and the fish's habitat. Additionally, decreasing
        water discharge from upstream dams, heavy siltation, and disruption of
        migration routes have led to a sharp decline in catches, from around 40
        tonnes two decades ago to just 2-4 tonnes recently.
      </p>
      <img
        src="/assets/blogs/blog5/Gemini_Generated_Image_frio6pfrio6pfrio.png"
        alt="Pulasa Traditional Methods"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Traditional and Ethical Fishing Methods in the Godavari Delta
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Local communities in the Godavari delta have long practiced methods that
        align with sustainability, focusing on the fish's short seasonal window
        to minimize impact. Fishermen typically use traditional nets to target
        mature Pulasa, aiming to leave juveniles unharmed so they can grow and
        contribute to future populations. This selective approach respects the
        ecosystem by avoiding overexploitation and allowing the species to
        thrive in its natural habitat.
      </p>
      <img
        src="/assets/blogs/blog5/Gemini_Generated_Image_9vq1le9vq1le9vq1.png"
        alt="Pulasa Conservation"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Modern Strategies for Pulasa Conservation
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        To combat scarcity, experts advocate for stricter regulations, including
        bans on juvenile fishing to allow Pulasa to complete its spawning
        journey. Declaring spawning grounds as protected areas, such as marine
        protected zones, would safeguard critical habitats and promote natural
        breeding. Implementing the polluter pays principle could hold industries
        accountable for river pollution, improving water quality essential for
        Pulasa's migration and transformation.
      </p>
      <img
        src="/assets/blogs/blog5/Gemini_Generated_Image_8y7yb38y7yb38y7y.png"
        alt="Pulasa Community"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Community-led initiatives play a vital role, with local fishermen and
        authorities monitoring catches and enforcing quotas to maintain healthy
        populations. Data-driven management, like tracking fish stocks and
        migration patterns, informs better practices, while education on
        sustainable techniques empowers stakeholders. Efforts to reduce plastic
        waste and carbon emissions from fishing activities further enhance
        environmental protection. These strategies not only boost Pulasa
        availability but also support the livelihoods of dependent communities.
      </p>
      <img
        src="/assets/blogs/blog5/Gemini_Generated_Image_z92zakz92zakz92z.png"
        alt="Pulasa Consumer Support"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        How Consumers Can Support Sustainable Pulasa Fishing
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        As a consumer, your choices matter—opting for sustainably sourced Pulasa
        encourages ethical practices and discourages overfishing. Look for
        certifications or assurances from suppliers that prioritize
        conservation, such as those avoiding peak breeding disruptions. By
        reducing demand for undersized fish and supporting pollution control,
        you contribute to the river's health.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Our online platform makes this easy, offering Pulasa from responsible
        sources with transparent delivery straight to your door. This ensures
        you receive high-quality fish while aiding preservation efforts. Simple
        actions, like advocating for protected areas or choosing eco-labeled
        seafood, amplify these impacts.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Sustainable fishing for Pulasa is about more than preservation—it's
        about honoring a cultural icon while fostering environmental harmony. By
        embracing these practices, we secure its legacy. Visit our website today
        to order fresh, sustainably sourced Pulasa and join the movement toward
        a thriving Godavari ecosystem. Keep an eye out for upcoming blogs on
        storage tips, recipes, and more ways to enjoy this remarkable fish!
      </h2>
    </>
  ),
  "6": (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[hsl(var(--primary))] mb-6 leading-tight tracking-tight">
        Blog 6: Why Pulasa Fish is a Must-Try for Seafood Lovers: An In-Depth
        Appreciation
      </h1>
      <img
        src="/assets/blogs/blog6/Gemini_Generated_Image_at4nk1at4nk1at4n.png"
        alt="Pulasa Must Try"
        className="w-full rounded-xl shadow mb-6"
      />
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa fish, emerging from the Godavari River's monsoon waters, stands
        as an unparalleled delight for seafood aficionados seeking something
        beyond the ordinary. With its velvety texture, profound depth of flavor,
        and a rarity that adds an air of exclusivity, Pulasa rivals the world's
        most esteemed catches like premium salmon or tuna. This Andhra specialty
        captivates with its tender, oily flesh and subtle nutty undertones,
        making it a transformative addition to any meal. In this comprehensive
        blog, we'll explore what makes Pulasa irresistible—from its sensory
        allure to versatile applications—while highlighting how our online
        platform delivers this treasure fresh to your door. Whether you're a
        seasoned gourmet or an adventurous eater, discover why Pulasa has
        enchanted palates for centuries and deserves a spot in your culinary
        repertoire.
      </p>
      <img
        src="/assets/blogs/blog6/Gemini_Generated_Image_nv2v48nv2v48nv2v.png"
        alt="Pulasa Flavor"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        The Unique Flavor Profile That Sets Pulasa Apart
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa's allure begins with its distinctive taste, often described as
        delicate yet richly succulent, thanks to a high concentration of fatty
        acids including omega-3s like 16:0 and 18:1. These elements contribute
        to a buttery, melt-in-your-mouth experience, with hints of earthiness
        and a natural creaminess that distinguishes it from drier fish
        varieties. Unlike everyday options such as mackerel or basa, Pulasa
        develops its superior oiliness during upstream migration, resulting in a
        flavor symphony of subtle nuttiness and indulgence.
      </p>
      <img
        src="/assets/blogs/blog6/Gemini_Generated_Image_z5t61mz5t61mz5t6.png"
        alt="Pulasa Versatility"
        className="w-full rounded-xl shadow mb-6"
      />
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Culinary Versatility for Endless Creativity
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        One of Pulasa's greatest strengths is its adaptability in the kitchen,
        appealing to seafood enthusiasts who love experimenting with global and
        fusion cuisines. Its tender, flaky texture absorbs spices beautifully,
        shining in traditional Andhra preparations like tangy pulusu curries,
        where tamarind and chilies complement its oiliness for a spicy,
        harmonious gravy. For a simpler approach, try pan-frying or grilling to
        achieve a crispy exterior while preserving the juicy interior, perfect
        for appetizers or light meals.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        The Exclusivity and Rarity That Enhance Its Appeal
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Pulasa's seasonal nature, available only during the July-to-September
        monsoon floods, infuses it with an exclusivity that resonates deeply
        with seafood connoisseurs. This limited window, tied to the Godavari's
        nutrient-rich waters, creates a sense of anticipation and prestige, much
        like rare truffles or vintage wines. Its scarcity stems from natural
        migration patterns, where the fish transforms from sea-dwelling ilisha
        to the flavorful Pulasa through estuarine blending of fresh and
        saltwater.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Health and Sensory Benefits for Discerning Palates
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Beyond taste, Pulasa appeals to health-conscious seafood fans with its
        nutrient density, including omega-3 fatty acids that support heart
        health and reduce inflammation. Its protein-rich composition aids muscle
        maintenance, while low carbohydrates make it a smart choice for balanced
        diets. The fish's natural oils promote skin vitality and cognitive
        function, aligning with the wellness trends favored by epicureans.
      </p>
      <h2 className="text-2xl font-bold text-[hsl(var(--accent))] mb-4 mt-10 border-l-4 border-[hsl(var(--accent))] pl-4 bg-[hsl(var(--secondary))/0.3]">
        Why Pulasa Deserves a Place in Your Seafood Repertoire
      </h2>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        In a world of abundant seafood choices, Pulasa stands out as a
        captivating essential, blending rarity, versatility, and unmatched
        flavor to redefine premium dining. It's perfect for hosting elegant
        gatherings or solo indulgences, transforming routine meals into
        extraordinary occasions. Enthusiasts worldwide rave about its ability to
        rival global delicacies while embodying Andhra's river heritage.
      </p>
      <p className="mb-4 text-lg text-[hsl(var(--muted-foreground))]">
        Ready to experience this yourself? Our website offers seamless online
        ordering and swift delivery of fresh, sustainably sourced Pulasa,
        bringing the Godavari's finest straight to your table. Dive into the
        world of elite seafood and let Pulasa captivate your senses—explore our
        selection today and elevate your culinary adventures. Stay tuned for
        more insights on storage tips, recipes, and the cultural legacy of this
        remarkable fish!
      </p>
    </>
  ),
  "7": (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F4E5F] mb-6 leading-tight tracking-tight">
        Blog 7: Pulasa vs Other Fish – Why It Reigns Supreme in Both Taste and
        Tradition
      </h1>
      {/* ...full content for Blog 7... */}
    </>
  ),
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--secondary))]">
      <NavigationHeader />
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-12 pt-20">
        <button
          onClick={() => navigate("/blogs")}
          className="mb-8 px-6 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-semibold shadow hover:scale-105 transition-all text-base"
        >
          ← Back to Blogs
        </button>
        <Card className="p-10 rounded-3xl shadow-2xl bg-white border border-[hsl(var(--border))]">
          <div className="mb-8 border-b border-[hsl(var(--border))] pb-6">
            {blogContent[id || "1"] || (
              <div className="text-xl text-[hsl(var(--accent))]">
                Blog not found.
              </div>
            )}
          </div>
        </Card>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogDetail;
