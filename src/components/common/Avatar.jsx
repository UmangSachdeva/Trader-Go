import {
  Avatar as ThemeAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Avatar({ user }) {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    queryClient.removeQueries("user-details");
    nav("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ThemeAvatar>
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {user.first_name[0]}
            {user.last_name[0]}{" "}
          </AvatarFallback>
        </ThemeAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={logout}>
        <DropdownMenuItem>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Avatar;
