import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuction } from '@/context/AuctionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, DollarSign, ArrowLeft, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import unifiedAuthService from '@/services/UnifiedAuthService';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

const AuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getAuctionById, placeBid, fetchAuctions } = useAuction();
  const [auction, setAuction] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Scroll to top when component mounts
  useScrollToTop();

  useEffect(() => {
    if (id) {
      const foundAuction = getAuctionById(id);
      setAuction(foundAuction);
    }
  }, [id, getAuctionById]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await unifiedAuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to get user:', error);
      }
    };
    checkUser();
  }, []);

  const handleBid = async () => {
    if (!user) {
      toast.error('Please login to place a bid');
      return;
    }

    if (!bidAmount || parseFloat(bidAmount) <= auction.current_price) {
      toast.error('Bid amount must be higher than current price');
      return;
    }

    setLoading(true);
    try {
      const success = await placeBid(auction.id, parseFloat(bidAmount));
      if (success) {
        setBidAmount('');
        await fetchAuctions(); // Refresh auction data
        const updatedAuction = getAuctionById(id!);
        setAuction(updatedAuction);
      }
    } catch (error) {
      console.error('Error placing bid:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading auction...</p>
        </div>
      </div>
    );
  }

  const timeLeft = new Date(auction.end_time).getTime() - new Date().getTime();
  const isEnded = timeLeft <= 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/auctions" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Auctions</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={auction.product_image || '/placeholder.svg'}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Auction Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{auction.title}</h1>
              <p className="text-muted-foreground text-lg">{auction.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Price</p>
                      <p className="text-2xl font-bold text-primary">
                        ₹{auction.current_price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bids</p>
                      <p className="text-2xl font-bold text-foreground">
                        {auction.bids?.length || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between">
              <Badge
                variant={isEnded ? 'destructive' : auction.status === 'active' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {isEnded ? 'Ended' : auction.status}
              </Badge>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {isEnded ? 'Auction ended' : `Ends ${new Date(auction.end_time).toLocaleDateString()}`}
                </span>
              </div>
            </div>

            <Separator />

            {/* Seller Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Seller Information</h3>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{auction.seller?.name || 'Unknown Seller'}</span>
              </div>
            </div>

            {/* Bidding Section */}
            {!isEnded && auction.status === 'active' && (
              <Card>
                <CardHeader>
                  <CardTitle>Place Your Bid</CardTitle>
                  <CardDescription>
                    Enter an amount higher than the current price
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Enter bid amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={auction.current_price + 1}
                    />
                    <Button onClick={handleBid} disabled={loading || !user}>
                      {loading ? 'Placing Bid...' : 'Place Bid'}
                    </Button>
                  </div>
                  {!user && (
                    <p className="text-sm text-muted-foreground">
                      Please <Link to="/login" className="text-primary hover:underline">login</Link> to place a bid
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Bid History */}
            {auction.bids && auction.bids.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Bid History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auction.bids
                      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .slice(0, 10)
                      .map((bid: any) => (
                        <div key={bid.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">{bid.bidder_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(bid.created_at).toLocaleString()}
                            </p>
                          </div>
                          <p className="font-bold text-primary">₹{bid.amount.toLocaleString()}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail; 