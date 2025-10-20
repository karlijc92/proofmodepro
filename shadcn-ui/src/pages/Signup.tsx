import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

interface MemberstackResult {
  data?: unknown;
  error?: { message?: string };
}

interface MemberstackInstance {
  createMember(options: { email: string; customFields: Record<string, string> }): Promise<MemberstackResult>;
  loginMember(options: { email: string }): Promise<MemberstackResult>;
}

declare global {
  interface Window {
    memberstack?: MemberstackInstance;
  }
}

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!window.memberstack) {
      setError('Memberstack not loaded. Please refresh the page.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create member with Memberstack
      const result = await window.memberstack.createMember({
        email: formData.email.trim(),
        customFields: {
          'first-name': formData.firstName.trim(),
          'last-name': formData.lastName.trim()
        }
      });

      if (result.data) {
        // Member created successfully, now log them in
        const loginResult = await window.memberstack.loginMember({
          email: formData.email.trim()
        });

        if (loginResult.data) {
          // Successfully logged in, redirect to profile
          navigate('/profile');
        } else {
          setError('Account created but login failed. Please try logging in manually.');
        }
      } else if (result.error) {
        // Check if it's a duplicate email error
        if (result.error.message && result.error.message.toLowerCase().includes('email')) {
          setError('That email already has an account — use Log in → Forgot/Create Password.');
        } else {
          setError(result.error.message || 'Failed to create account. Please try again.');
        }
      }
    } catch (err: unknown) {
      console.error('Signup error:', err);
      if (err instanceof Error && err.message && err.message.toLowerCase().includes('email')) {
        setError('That email already has an account — use Log in → Forgot/Create Password.');
      } else {
        setError('An error occurred during signup. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <BackButton />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join TrustTag</h1>
            <p className="text-gray-600">Create your account and start building your professional reputation</p>
          </div>

          {/* Signup Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
              </CardTitle>
              <CardDescription>
                Get started with blockchain-verified credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
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
                    <Label htmlFor="lastName">Last Name</Label>
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
                  <Label htmlFor="email">Email Address *</Label>
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

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating Account...</span>
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
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
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