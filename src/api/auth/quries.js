import { axiosPrivate } from "@/axios_config/interceptors";
import { useQuery } from "@tanstack/react-query";

const getUserDetails = () => {
  return axiosPrivate.get(`/users/`);
};

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: getUserDetails,
  });
};
