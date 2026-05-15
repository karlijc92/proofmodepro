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

import { UserPlus, ArrowRight, Loader2 } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

import { supabase } from '@/lib/supabase';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');

  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (
      !formData.firstName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError(
        'Please fill in all required fields.'
      );
      return;
    }

    if (formData.password.length < 6) {
      setError(
        'Password must be at least 6 characters.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            first_name:
              formData.firstName.trim(),
            last_name:
              formData.lastName.trim(),
          },
        },
      });

      if (error) {
        throw error;
      }

      setSuccess(
        'Account created successfully. Please check your email to confirm your account.'
      );

      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err: any) {
      console.error('Signup error:', err);

      if (
        err?.message?.toLowerCase().includes(
          'already registered'
        )
      ) {
        setError(
          'That email already has an account.'
        );
      } else {
        setError(
          err?.message ||
            'Failed to create account.'
        );
      }
    } finally {
      setIsLoading(false);
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
              Join TrustTag
            </h1>

            <p className="text-gray-600">
              Create your account and start building your professional reputation
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />

                <span>Create Account</span>
              </CardTitle>

              <CardDescription>
                Get started with verified credentials
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name *
                    </Label>

                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name
                    </Label>

                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address *
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password *
                  </Label>

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />

                      <span>
                        Creating Account...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Create Account</span>

                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in here
                  </Link>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
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
