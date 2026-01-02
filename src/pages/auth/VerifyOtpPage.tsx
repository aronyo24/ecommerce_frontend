import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Loader2, Package, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function VerifyOtpPage() {
    const [otpCode, setOtpCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const { verifyOtp, resendOtp } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email') || '';

    useEffect(() => {
        if (!email) {
            navigate('/auth/register');
        }
    }, [email, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!otpCode || otpCode.length !== 6) {
            toast({
                title: 'Invalid OTP',
                description: 'Please enter the 6-digit code sent to your email.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await verifyOtp({ email, otp_code: otpCode });
            toast({
                title: 'Account Verified!',
                description: 'Your account has been activated. You can now sign in.',
            });
            navigate('/auth/login');
        } catch (error) {
            toast({
                title: 'Verification Failed',
                description: error instanceof Error ? error.message : 'Invalid or expired OTP.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            await resendOtp(email);
            toast({
                title: 'OTP Resent',
                description: 'A new code has been sent to your email.',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to resend OTP.',
                variant: 'destructive',
            });
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <div className="w-full max-w-md">
                <div className="rounded-xl border bg-card p-8 shadow-lg">
                    <div className="mb-8 flex flex-col items-center text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                            <Package className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold">Verify your email</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Enter the 6-digit code we sent to <span className="font-medium text-foreground">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="otp" className="sr-only">Verification Code</Label>
                            <Input
                                id="otp"
                                type="text"
                                placeholder="000000"
                                maxLength={6}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                className="text-center text-3xl tracking-[1em] h-16"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify Account'
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <p className="text-muted-foreground">
                            Didn't receive the code?{' '}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isResending}
                                className="font-medium text-primary hover:underline disabled:opacity-50"
                            >
                                {isResending ? 'Resending...' : 'Resend OTP'}
                            </button>
                        </p>
                        <Link to="/auth/register" className="mt-4 block font-medium text-primary hover:underline">
                            Back to registration
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
