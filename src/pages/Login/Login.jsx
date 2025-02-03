import { useGetUserDetails } from "@/api/auth/quries";
import LoginForm from "@/components/Login/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { EyeOff, Lock, Mail } from "lucide-react";

function Login() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Login to StockTrader
          </CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
      {/* <Card className="w-[50%]"> */}
      {/* <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back to our platform</CardDescription>
        </CardHeader>
        <CardContent>
          
        </CardContent> */}
      {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      {/* </Card> */}
    </div>
  );
}

export default Login;
