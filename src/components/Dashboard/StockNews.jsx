import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Newspaper } from "lucide-react";
import { useGetStockNews } from "@/api/news/quries";
import { Link } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";

function StockNews() {
  const { data: newsItems } = useGetStockNews({ page: 1 });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Newspaper className="mr-2" /> Market News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] flex flex-col gap-1 overflow-hidden px-4">
          {newsItems?.data?.data?.articles?.map((item, index) => (
            <div
              key={index}
              className="mb-4 dark:hover:bg-slate-800 light:bg-slate-400 hover:bg-slate-200 pr-4 p-2 rounded transition-colors"
            >
              <Link to={item?.url}>
                <p className="font-semibold line-clamp-1">{item?.title}</p>
                <p className="text-sm text-gray-500">
                  {item?.source?.name} • {item?.author}
                </p>
              </Link>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default StockNews;
