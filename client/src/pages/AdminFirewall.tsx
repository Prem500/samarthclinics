import { useState } from "react";
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
import { Eye, EyeOff, Shield, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  adminPassword: z.string().min(1, { message: "Admin password is required" })
});

const AdminFirewall = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError("");
      
      // Verify the admin password
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/admin-firewall`,
        { adminPassword: values.adminPassword }
      );

      if (response.data && response.data.success) {
        toast.success("Admin verification successful!");
        
        // Store temporary flag for doctor registration
        sessionStorage.setItem("adminVerified", "true");
        
        // Redirect to doctor sign-in or registration
        navigate("/doctor-auth");
      }
    } catch (error: any) {
      console.error("Admin verification error:", error);
      setError(error.response?.data?.message || "Incorrect admin password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-t-4 border-t-red-500">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <ShieldAlert className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">Admin Firewall</CardTitle>
              <CardDescription>
                Enter admin password to access doctor authentication
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="adminPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter admin password"
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <span className="mr-2">Verifying</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    Verify Admin Access
                  </div>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2 mt-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>This area is restricted to authorized personnel only</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFirewall;