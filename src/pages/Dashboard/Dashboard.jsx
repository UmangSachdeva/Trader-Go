import { useEffect, useState } from "react";
import Wishlist from "@/components/Dashboard/Wishlist";
import StockNews from "@/components/Dashboard/StockNews";

// Mock data

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Random comments

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Stock Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Watchlist */}
        <Wishlist />

        {/* News Feed */}
        <StockNews />

        {/* Market Overview */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" /> Market Overview
            </CardTitle>
            <CardDescription>{currentTime.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            {marketIndices.map((index) => (
              <div
                key={index.name}
                className="flex items-center justify-between mb-4"
              >
                <p className="font-semibold">{index.name}</p>
                <div className="text-right">
                  <p className="font-semibold">{index.value.toFixed(2)}</p>
                  <p
                    className={`text-sm ${
                      index.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {index.change >= 0 ? (
                      <ArrowUp className="inline mr-1" size={12} />
                    ) : (
                      <ArrowDown className="inline mr-1" size={12} />
                    )}
                    {Math.abs(index.change)}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}

        {/* Recent Transactions */}
        {/* <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2" /> Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
                    >
                      <div>
                        <Badge
                          variant={
                            transaction.type === "Buy" ? "default" : "secondary"
                          }
                        >
                          {transaction.type}
                        </Badge>
                        <p className="mt-2 font-semibold">
                          {transaction.symbol}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.amount} shares
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${transaction.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="buy">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recentTransactions
                    .filter((t) => t.type === "Buy")
                    .map((transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
                      >
                        <div>
                          <Badge>Buy</Badge>
                          <p className="mt-2 font-semibold">
                            {transaction.symbol}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.amount} shares
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${transaction.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="sell">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recentTransactions
                    .filter((t) => t.type === "Sell")
                    .map((transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
                      >
                        <div>
                          <Badge variant="secondary">Sell</Badge>
                          <p className="mt-2 font-semibold">
                            {transaction.symbol}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.amount} shares
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${transaction.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
