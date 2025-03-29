
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import HireableLogo from "@/components/branding/HireableLogo";

const EmailConfirmation = () => {
  const location = useLocation();
  const { email } = location.state || { email: "your email" };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-2 flex flex-col items-center">
          <HireableLogo className="w-32 h-auto mb-4" />
          <div className="bg-primary/10 p-3 rounded-full">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We've sent a confirmation link to {email}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-2">
          <p>Please check your inbox and click the verification link to confirm your email address.</p>
          <p className="text-sm text-muted-foreground mt-4">
            Didn't receive an email? Check your spam folder or request a new confirmation link.
          </p>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
            Resend confirmation link
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="text-primary hover:underline">
              Return to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailConfirmation;
