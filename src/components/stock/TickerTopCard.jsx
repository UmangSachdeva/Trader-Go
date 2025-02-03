import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Bookmark,
  BookmarkCheck,
  BookMarked,
  LoaderCircle,
} from "lucide-react";
import { useWishlistStock } from "@/api/stock/mutations";
import ConfettiExplosion from "react-confetti-explosion";

function TickerTopCard({ tracker, tracker_details, isLoading }) {
  const [confetti, setConfetti] = useState(false);
  const [isWishlited, setIsWishlited] = useState(false);

  const { mutate: wishlist, isPending, isSuccess, data } = useWishlistStock();

  const handleWishlist = () => {
    if (!isPending) {
      wishlist({ symbol: tracker });
    }
  };

  useEffect(() => {
    if (isSuccess && data?.status == 204) {
      setIsWishlited(false);
      setConfetti(false);
    }
    if (isSuccess && data?.status == 201) {
      setIsWishlited(true);
      setConfetti(true);
    }

    // setIsWishlited(tracker_details?.data?.data?.is_wishlisted);
    // if (
    //   isSuccess &&
    //   !isWishlited &&
    //   tracker_details?.data?.data?.is_wishlisted
    // ) {
    //   setConfetti(true);
    //   setIsWishlited(true);
    // } else {
    //   setIsWishlited(false);
    //   setConfetti(false);
    // }
  }, [isSuccess, data]);

  useEffect(() => {
    if (tracker_details?.data?.data?.is_wishlisted) {
      setIsWishlited(tracker_details?.data?.data?.is_wishlisted);
      setConfetti(false);
    }
  }, [tracker_details]);

  if (isLoading) {
    return (
      <div className="flex gap-4 p-4">
        <div className="w-[80px] h-[80px] rounded-sm">
          <Skeleton className="w-full h-full rounded-sm" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[100px] h-[20px] rounded-sm" />
          <Skeleton className="w-[40px] h-[20px] rounded-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-4 p-4">
        <div className="w-[80px] h-[80px] rounded-sm">
          <img
            src={`${
              import.meta.env.VITE_DJANGO_API
            }/stock/ticker/img/?symbol=${tracker}`}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">
            {tracker_details?.data?.data?.name}
          </p>
          <p className={`text-lg text-slate-500 `}>
            {tracker_details?.data?.data?.current_price}{" "}
            <span
              className={`text-sm ${
                tracker_details?.data?.data?.price_change_amount > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {tracker_details?.data?.data?.price_change_amount?.toFixed(2)}
            </span>
            <span
              className={`text-sm ${
                tracker_details?.data?.data?.price_change_percent > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {" ("}
              {tracker_details?.data?.data?.price_change_percent?.toFixed(2)}
              {"%)"}
            </span>
          </p>
        </div>
      </div>
      <div>
        {confetti && <ConfettiExplosion />}
        <button onClick={handleWishlist}>
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>{isWishlited ? <BookmarkCheck /> : <Bookmark />}</>
          )}
        </button>
      </div>
    </div>
  );
}

export default TickerTopCard;
