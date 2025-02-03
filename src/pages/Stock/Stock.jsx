import { useGetStockData, useGetTickerDetails } from "@/api/stock/quries";
import CandleStickGraph from "@/components/common/CandleStickGraph";
import DetailsCards from "@/components/stock/DetailsCards";
import TickerTopCard from "@/components/stock/TickerTopCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useParams } from "react-router-dom";

function Stock() {
  const params = useParams();
  const { data, isLoading } = useGetStockData(params.tracker);
  const { data: tracker_details, isLoading: trackerDetailsLoading } =
    useGetTickerDetails(params.tracker);

  return (
    <div className="flex gap-4 p-4">
      {/* <pre>{JSON.stringify(data?.data?.data?.results, null, 2)}</pre> */}
      <div className="flex flex-col w-full gap-4">
        <TickerTopCard
          tracker={params.tracker}
          tracker_details={tracker_details}
          isLoading={trackerDetailsLoading}
        />
        {isLoading ? (
          <div className="w-full p-4">
            <Skeleton className="w-full h-[400px] rounded-sm" />
          </div>
        ) : (
          <div className="w-full">
            <CandleStickGraph data={data?.data?.data?.results} />
          </div>
        )}
      </div>
      <div className="w-1/2">
        <DetailsCards tracker={tracker_details} />
      </div>
    </div>
  );
}

export default Stock;
