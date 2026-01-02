import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Loader2, Package, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ResetPasswordPage() {
    const [otpCode, setOtpCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { resetPassword } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email') || '';

    useEffect(() => {
        if (!email) {
            navigate('/auth/forgot-password');
        }
    }, [email, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!otpCode || otpCode.length !== 6 || !newPassword) {
            toast({
                title: 'Error',
                description: 'Please fill in all fields correctly.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await resetPassword({ email, otp_code: otpCode, new_password: newPassword });
            toast({
                title: 'Password Reset!',
                description: 'Your password has been updated. You can now log in.',
            });
            navigate('/auth/login');
        } catch (error) {
            toast({
                title: 'Failed to Reset',
                description: error instanceof Error ? error.message : 'Something went wrong.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <div className="w-full max-w-md">
                <div className="rounded-xl border bg-card p-8 shadow-lg">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                            <Package className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold">Set new password</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Enter the code sent to <span className="font-medium text-foreground">{email}</span> and your new password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="otp">Verification Code</Label>
                            <Input
                                id="otp"
                                type="text"
                                placeholder="000000"
                                maxLength={6}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resetting...
                                </>
                            ) : (
                                'Reset Password'
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <Link to="/auth/login" className="font-medium text-primary hover:underline">
                            Back to log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
