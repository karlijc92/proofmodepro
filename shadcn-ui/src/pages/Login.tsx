import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';

export default function Login() {
  const [error, setError] = useState('');

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your TrustTag account</p>
          </div>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </CardTitle>
              <CardDescription>
                Click below to open the secure login form
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Memberstack Login Modal Button */}
              <Button
                data-ms-modal="login"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Log in
              </Button>

              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                  Create one here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}