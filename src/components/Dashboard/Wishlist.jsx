import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, Star } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useGetWishlist } from "@/api/stock/quries";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const { data: wishlist } = useGetWishlist();
  const nav = useNavigate();

  const handleNavigate = (symbol) => {
    nav(`/stock/${symbol}`);
  };

  const watchlistStocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800.75, change: -1.2 },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 305.5,
      change: 0.8,
    },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 3300.0, change: -0.5 },
    { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800.75, change: -1.2 },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 305.5,
      change: 0.8,
    },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 3300.0, change: -0.5 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2" /> Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] overflow-hidden">
          {wishlist?.data?.data?.map((stock) => (
            <div
              onClick={() => handleNavigate(stock?.symbol)}
              key={stock?.symbol}
              className="flex justify-between items-center mb-4 dark:hover:bg-slate-800 light:bg-slate-400 hover:bg-slate-200 p-2 rounded transition-colors cursor-pointer px-4"
            >
              <div>
                <p className="font-semibold">{stock?.symbol}</p>
                <p className="text-sm text-gray-500">{stock?.company_name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Watched at</p>
                <p className="font-semibold">${stock?.current_price}</p>
                {/* <p
                  className={`text-sm ${
                    stock.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {/* {stock.change >= 0 ? (
                    <ArrowUp className="inline mr-1" size={12} />
                  ) : (
                    <ArrowDown className="inline mr-1" size={12} />
                  )}
                  {Math.abs(stock.change)}% 
                </p> */}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default Wishlist;
