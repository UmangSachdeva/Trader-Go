import { axiosPrivate } from "@/axios_config/interceptors";
import { useQuery } from "@tanstack/react-query";

const getStockNews = (q) => {
    return axiosPrivate.get(`/news/stock/?${q}`)
}

export const useGetStockNews = (q) => {
    const queryString = new URLSearchParams(q);

    return useQuery({
        queryKey: ['stock-news', queryString],
        queryFn: () => getStockNews(queryString)
    })
}