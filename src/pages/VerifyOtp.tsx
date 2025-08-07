import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import unifiedAuthService from "@/services/UnifiedAuthService";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      toast.error("Email is required for verification");
      navigate("/signup");
      return;
    }

    // Start countdown timer
    setCountdown(300); // 5 minutes
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      handleVerifyOtp();
    }
  };

  const handleVerifyOtp = async () => {
    if (!email || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const result = await unifiedAuthService.verifyOtp(email, otp);

      if (result.success) {
        toast.success("Email verified successfully!");
        navigate("/");
      } else {
        toast.error(result.error || "OTP verification failed");
        setOtp("");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("An error occurred during verification");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setResendLoading(true);
    try {
      const result = await unifiedAuthService.resendOtp(email);

      if (result.success) {
        toast.success("OTP resent successfully!");
        setCountdown(300); // Reset countdown to 5 minutes
        setOtp("");
      } else {
        toast.error(result.error || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("An error occurred while resending OTP");
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/signup")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign Up
          </Button>
          
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-foreground">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We've sent a 6-digit code to
          </p>
          <p className="text-sm font-medium text-foreground">{email}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter verification code</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <InputOTP
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                disabled={loading}
                className="justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || loading}
                className="w-full"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?
                </p>
                
                {countdown > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Resend available in {formatTime(countdown)}
                  </p>
                ) : (
                  <Button
                    variant="link"
                    onClick={handleResendOtp}
                    disabled={resendLoading}
                    className="text-primary"
                  >
                    {resendLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      "Resend code"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By verifying your email, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp; 