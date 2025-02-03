import { axiosPublic } from "@/axios_config/interceptors";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const login = (body) => {
  return axiosPublic.post(`/users/login`, body);
};

export const useLogin = () => {
  const { toast } = useToast();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (res) => {
      toast({
        title: "Login",
        description: "Success, Welcome to our platform :)",
      });

      localStorage.setItem("access_token", res?.data?.access_token);
      localStorage.setItem("refresh_token", res?.data?.refresh_token);

      queryClient.invalidateQueries(["user-details"]);

      nav("/");
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: "Login",
        description:
          "Failed, " + err?.response?.data?.detail || "Something went wrong",
      });
    },
  });
};
