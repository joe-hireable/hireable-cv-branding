
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import HireableLogo from "@/components/branding/HireableLogo";

const EmailVerified = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    // Handle any auth callback parameters if needed
    const handleVerificationCallback = async () => {
      try {
        // The URL auth will be handled by Supabase automatically
        console.log("Email verification complete");
      } catch (error) {
        console.error("Error during email verification:", error);
      }
    };
    
    handleVerificationCallback();
    
    // Set up redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-2 flex flex-col items-center">
          <HireableLogo className="w-32 h-auto mb-4" />
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Email Verified Successfully!</CardTitle>
          <CardDescription>
            Your account has been activated
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-2">
          <p>Thank you for verifying your email address. You now have full access to all features.</p>
          <p className="text-sm mt-4">
            Redirecting to dashboard in <span className="font-bold">{countdown}</span> seconds...
          </p>
        </CardContent>
        
        <CardFooter>
          <Button className="w-full" onClick={() => navigate("/dashboard")}>
            Go to Dashboard Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailVerified;
