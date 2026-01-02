import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { forgotPassword } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast({
                title: 'Email Required',
                description: 'Please enter your email address.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await forgotPassword({ email });
            toast({
                title: 'OTP Sent!',
                description: 'Check your email for the password reset code.',
            });
            navigate(`/auth/reset-password?email=${encodeURIComponent(email)}`);
        } catch (error) {
            toast({
                title: 'Error',
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
                        <h1 className="text-2xl font-bold">Forgot password?</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            No worries, we'll send you reset instructions.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending code...
                                </>
                            ) : (
                                'Send Reset Code'
                            )}
                        </Button>
                    </form>

                    <footer className="mt-8 text-center">
                        <Link to="/auth/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to log in
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
}
