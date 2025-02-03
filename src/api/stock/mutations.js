import { axiosPrivate } from "@/axios_config/interceptors";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const wishlistStock = (data) => {
  return axiosPrivate.post("/stock/wishlist", data);
};

export const useWishlistStock = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: wishlistStock,
    mutationKey: ["wishlist-stock"],
    onSuccess: (response) => {

      queryClient.invalidateQueries(['get-ticker-data'])

      if (response?.status == 204) {
        toast({
          title: "Success !!",
          description: "Stock removed successfully",
        });
      }
      else {
        toast({
          title: "Wishlisted !!",
          description: "Success, Your Stock is wishlisted 🎉",
        });
      }

    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err?.response?.data?.detail || "Something went wrong",
      });
    },
  });
};
