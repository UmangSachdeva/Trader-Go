import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLogin } from "@/api/auth/mutations";
import { LoadingSpinner } from "../ui/loading-spinner";
import { CardContent, CardFooter } from "../ui/card";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Label } from "recharts";

const formSchema = z.object({
  email: z.string().email("Provide a valid username"),
  password: z.string().min(8, "Mininum Length should be 8"),
});

function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    login(values);
  }

  return (
    <div className="flex items-center justify-center w-full gap-4">
      <Form {...form}>
        {/* <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
                <Input
                  id="password"
                  // type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  required
                />
                {/* <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {/* {showPassword ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )} 
                </Button>
              </div>
            </div>
          </CardContent>
        </form> */}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <CardContent className="space-y-4">
            <FormField
              className="w-full h-full"
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Id</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
                        <Input
                          id="email"
                          placeholder="m@example.com"
                          type="email"
                          className="pl-10"
                          required
                          {...field}
                        />
                      </div>
                    </div>
                    {/* <Input placeholder="Email" /> */}
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="w-full h-full"
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute w-5 h-5 left-3 top-3 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        required
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Eye className="w-5 h-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {/* <Input type="password" placeholder="*********"  /> */}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              disabled={isPending}
              type="submit"
              className="flex items-center w-full gap-4"
            >
              Submit{" "}
              {isPending && (
                <LoadingSpinner className="animate-spin text-slate-700" />
              )}{" "}
            </Button>
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="#"
                className="transition-colors text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
