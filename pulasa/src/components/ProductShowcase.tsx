import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import unifiedAuthService from "@/services/UnifiedAuthService";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category?: string;
}

const ProductShowcase = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const currentUser = await unifiedAuthService.getCurrentUser();
        setUser(currentUser);

        // Fetch products (you'll need to implement this API endpoint)
        // For now, using mock data
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Fresh Pulasa Fish",
            description: "Premium quality Pulasa fish caught fresh from the Godavari river",
            price: 25000,
            image: "/assets/Premium Wild Pulasa.png",
            stock: 50,
            category: "Fresh Fish"
          },
          {
            id: "2",
            name: "Pulasa Curry",
            description: "Traditional Pulasa fish curry prepared with authentic spices",
            price: 25800,
            image: "/assets/Pulasa Curry.png",
            stock: 30,
            category: "Curry"
          }
        ];
        setProducts(mockProducts);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    addToCart({
      id: Number(product.id),
      name: product.name,
      price: `₹${product.price.toFixed(2)}`,
      originalPrice: `₹${product.price.toFixed(2)}`,
      image: product.image || "",
      weight: "1kg",
      features: [product.description || ""]
    }, 1);
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-lg">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fresh From Our Waters
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of fresh fish and seafood, 
            sourced directly from the pristine waters of the Godavari river.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <Badge variant="secondary" className="ml-2">
                    {product.category}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{product.price.toFixed(2)} per kg
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock} available
                    </p>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => window.location.href = '/products'}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
