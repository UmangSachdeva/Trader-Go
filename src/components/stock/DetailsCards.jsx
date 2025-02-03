import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useGetTickerInfo } from "@/api/stock/quries";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

function DetailsCards() {
  const { data: stockData, isPending } = useGetTickerInfo();

  if (isPending) {
    return (
      <div className="w-full h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Details</CardTitle>
        <CardDescription>Summary of the stock</CardDescription>
      </CardHeader>
      <CardContent>
        {stockData?.data?.data?.map((item) => {
          return (
            <>
              <Separator />
              <div className="flex justify-between p-4" key={item?.label}>
                <p>{item?.label}</p>
                <p>{item?.value}</p>
              </div>
            </>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default DetailsCards;
