import { axiosPrivate } from "@/axios_config/interceptors";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const getWishlist = () => {
  return axiosPrivate.get(`${import.meta.env.VITE_DJANGO_API}/stock/wishlist`)
}

const getStock = (q) => {
  return axiosPrivate.get(
    `${import.meta.env.VITE_DJANGO_API}/stock/query?q=${q}`
  );
};

const getTickerDetails = (q) => {
  return axiosPrivate.get(`${import.meta.env.VITE_DJANGO_API}/stock/ticker/details?q=${q}`);
};

const getStockInfo = (q) => {
  return axiosPrivate.get(
    `${import.meta.env.VITE_DJANGO_API}/stock?symbol=${q}&time=1month`
  );
};

const getStockDetails = (q) => {
  return axiosPrivate.get(
    `${import.meta.env.VITE_DJANGO_API}/stock/ticker/info?symbol=${q}`
  );
};

export const useGetStockInfo = (q) => {
  return useQuery({
    queryKey: [`get-stock-${q}`],
    queryFn: () => getStock(q),
  });
};

export const useGetStockData = (q) => {
  return useQuery({
    queryKey: [`get-stock-data-${q}`],
    queryFn: () => getStockInfo(q),
  });
};

export const useGetTickerDetails = (q) => {
  return useQuery({
    queryKey: [`get-ticker-data-${q}`],
    queryFn: () => getStockDetails(q),
  });
};

export const useGetWishlist = () => {
  return useQuery({
    queryKey: ['get-wishlist-user'],
    queryFn: getWishlist
  })
}

export const useGetTickerInfo = () => {
  const { tracker } = useParams();

  return useQuery({
    queryKey: [`get-ticker-details-${tracker}`],
    queryFn: () => getTickerDetails(tracker),
  });
};
