import { useState } from 'react';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { LogIn, Loader2 } from 'lucide-react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fromPath =
    (location.state as any)?.from?.pathname || '/profile';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      navigate(fromPath, {
        replace: true,
      });
    } catch (err: any) {
      console.error('Login error:', err);

      setError(
        err?.message || 'Failed to log in. Please check your email and password.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Enter your email address first, then click Forgot Password.');
      return;
    }

    setIsResetting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        throw error;
      }

      setSuccess('Password reset email sent. Please check your inbox.');
    } catch (err: any) {
      console.error('Password reset error:', err);

      setError(err?.message || 'Failed to send password reset email.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <BackButton />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>

            <p className="text-gray-600">
              Sign in to your TrustTag account
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </CardTitle>

              <CardDescription>
                Access your verified profile
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
                    {success}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    disabled={isLoading || isResetting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    disabled={isLoading || isResetting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || isResetting}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Logging In...</span>
                    </div>
                  ) : (
                    'Log In'
                  )}
                </Button>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading || isResetting}
                  className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-60"
                >
                  {isResetting ? 'Sending reset email...' : 'Forgot Password?'}
                </button>

                <div className="text-center text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Create one here
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
