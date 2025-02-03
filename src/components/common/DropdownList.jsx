import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

function DropdownList({ options, isLoading }) {
  if (isLoading) {
    return (
      <div className="absolute z-20 w-full p-4 border rounded-sm dark:bg-slate-950 top-12 max-h-[200px] overflow-hidden overflow-y-scroll flex flex-col gap-2 custom-scrollbar">
        <Skeleton className="w-[200px] h-[15px] rounded-full" />
        <Skeleton className="w-[100px] h-[15px] rounded-full" />
      </div>
    );
  }

  return (
    <div className="absolute z-20 w-full p-4 border rounded-sm dark:bg-slate-950 top-12 max-h-[200px] overflow-hidden overflow-y-scroll custom-scrollbar">
      {options?.map((item) => (
        <Link to={`/stock/${item?.symbol}`} key={item?.symbol}>
          <div className="flex items-center justify-between p-2 transition-colors rounded-sm cursor-pointer dark:hover:bg-slate-800 light:bg-slate-400 hover:bg-slate-200">
            <div>
              <p className="">{item?.description}</p>
              <p className="text-sm text-slate-500">{item?.symbol}</p>
            </div>
            {item?.current_price && (
              <div className="p-2 text-xs border rounded-full">
                <p>{item.current_price}</p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DropdownList;
