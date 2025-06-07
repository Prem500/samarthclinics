import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const registerSchema = z
  .object({
    full_name: z.string().min(2, { message: "Full name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    phoneNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const DoctorAuth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  // Check if admin is verified
  useEffect(() => {
    const isAdminVerified = sessionStorage.getItem("adminVerified") === "true";
    if (!isAdminVerified) {
      toast.error("Authentication required");
      navigate("/admin-firewall");
    }
  }, [navigate]);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/doctor/login`,
        values
      );

      if (response.data && response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("userRole", "doctor");
        localStorage.setItem("full_name", response.data.user.full_name || "");

        toast.success("Logged in successfully!");

        // Clear admin verification
        sessionStorage.removeItem("adminVerified");

        // Redirect to doctor dashboard
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);
      setError("");

      const { confirmPassword, ...registrationData } = values;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/doctor/register`,
        {
          ...registrationData,
          role: "doctor",
        }
      );

      if (response.data && response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("userRole", "doctor");
        localStorage.setItem("full_name", response.data.user.full_name || "");

        toast.success("Doctor account created successfully!");

        // Clear admin verification
        sessionStorage.removeItem("adminVerified");

        // Redirect to doctor dashboard
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.message || "Failed to create doctor account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Doctor Authentication
          </CardTitle>
          <CardDescription>
            Login or register as a doctor to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "login" | "register")}
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="pt-2">
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLogin)}
                  className="space-y-4"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="doctor@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                  <Button
                    type="submit"
                    className="w-full universal-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <span className="mr-2">Signing in</span>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="register" className="pt-2">
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegister)}
                  className="space-y-4"
                >
                  <FormField
                    control={registerForm.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="doctor@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                  <Button
                    type="submit"
                    className="w-full universal-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <span className="mr-2">Creating Account</span>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Register as Doctor
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Doctor authentication for clinic management
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DoctorAuth;
