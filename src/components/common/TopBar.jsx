import { useGetUserDetails } from "@/api/auth/quries";
import { NavBar } from "./NavBar";
import SearchStocks from "../stock/SearchStocks";
import { ThemeToggle } from "./ThemeToggle";
import Avatar from "./Avatar";

function TopBar() {
  const { data: user } = useGetUserDetails();

  return (
    <div className="w-full">
      {user?.data && (
        <div className="flex gap-4 p-4">
          <NavBar />
          <SearchStocks />
          <ThemeToggle />
          <Avatar user={user?.data?.data} />
        </div>
      )}
    </div>
  );
}

export default TopBar;
