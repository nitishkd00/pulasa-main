import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface Auction {
  id: string;
  title: string;
  description: string;
  starting_price: number;
  current_price: number;
  end_time: string;
  status: 'active' | 'ended' | 'pending';
  product_image: string;
  seller: {
    id: string;
    name: string;
    email: string;
  };
  bids: Bid[];
  created_at: string;
  updated_at: string;
}

interface Bid {
  id: string;
  auction_id: string;
  bidder_id: string;
  bidder_name: string;
  amount: number;
  created_at: string;
}

interface AuctionContextType {
  auctions: Auction[];
  loading: boolean;
  error: string | null;
  fetchAuctions: () => Promise<void>;
  createAuction: (auctionData: Partial<Auction>) => Promise<boolean>;
  placeBid: (auctionId: string, amount: number) => Promise<boolean>;
  getAuctionById: (id: string) => Auction | undefined;
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};

interface AuctionProviderProps {
  children: ReactNode;
}

export const AuctionProvider: React.FC<AuctionProviderProps> = ({ children }) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auctionApiUrl = import.meta.env.VITE_AUCTION_API_URL || 'http://localhost:5001/api';

  const fetchAuctions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${auctionApiUrl}/auctions`);
      if (response.data.success) {
        setAuctions(response.data.auctions);
      } else {
        setError('Failed to fetch auctions');
      }
    } catch (error) {
      console.error('Error fetching auctions:', error);
      setError('Failed to fetch auctions');
    } finally {
      setLoading(false);
    }
  };

  const createAuction = async (auctionData: Partial<Auction>): Promise<boolean> => {
    try {
      const token = localStorage.getItem('pulasa_unified_session');
      const response = await axios.post(
        `${auctionApiUrl}/auctions`,
        auctionData,
        {
          headers: {
            Authorization: `Bearer ${token ? JSON.parse(token).tokens?.jwtToken : ''}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Auction created successfully!');
        await fetchAuctions();
        return true;
      } else {
        toast.error(response.data.error || 'Failed to create auction');
        return false;
      }
    } catch (error) {
      console.error('Error creating auction:', error);
      toast.error('Failed to create auction');
      return false;
    }
  };

  const placeBid = async (auctionId: string, amount: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('pulasa_unified_session');
      const response = await axios.post(
        `${auctionApiUrl}/bids`,
        {
          auction_id: auctionId,
          amount
        },
        {
          headers: {
            Authorization: `Bearer ${token ? JSON.parse(token).tokens?.jwtToken : ''}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Bid placed successfully!');
        await fetchAuctions();
        return true;
      } else {
        toast.error(response.data.error || 'Failed to place bid');
        return false;
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      toast.error('Failed to place bid');
      return false;
    }
  };

  const getAuctionById = (id: string): Auction | undefined => {
    return auctions.find(auction => auction.id === id);
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const value: AuctionContextType = {
    auctions,
    loading,
    error,
    fetchAuctions,
    createAuction,
    placeBid,
    getAuctionById
  };

  return (
    <AuctionContext.Provider value={value}>
      {children}
    </AuctionContext.Provider>
  );
}; 