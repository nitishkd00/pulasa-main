import React from 'react';
import { useAuction } from '@/context/AuctionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, Users, DollarSign, ArrowRight } from 'lucide-react';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

const AuctionList = () => {
  const { auctions, loading, error } = useAuction();

  // Scroll to top when component mounts
  useScrollToTop();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading auctions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Live Auctions</h1>
          <p className="text-muted-foreground text-lg">
            Bid on premium Pulasa fish and other seafood products
          </p>
        </div>

        {auctions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No auctions available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
              <Card key={auction.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={auction.product_image || '/placeholder.svg'}
                      alt={auction.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{auction.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {auction.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Current Bid:</span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        ₹{auction.current_price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Ends:</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(auction.end_time).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Bids:</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {auction.bids?.length || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant={auction.status === 'active' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {auction.status}
                      </Badge>
                      <Link to={`/auctions/${auction.id}`}>
                        <Button size="sm" className="flex items-center space-x-1">
                          <span>View Details</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionList; 