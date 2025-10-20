import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Globe, Building, Users, Handshake, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Limited Time: Free TrustTag
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            TrustTag Verification
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Verify the authenticity of any TrustTag certificate instantly. Enter a TrustTag ID to validate skills and view detailed assessment results.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-blue-100">
              <Shield className="w-5 h-5 text-green-300" />
              <span>Blockchain secured</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span>Instant verification</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Globe className="w-5 h-5 text-blue-300" />
              <span>Globally trusted</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <CheckCircle className="w-5 h-5 text-purple-300" />
              <span>AI-powered validation</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/verify">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <CheckCircle className="mr-2 w-5 h-5" />
                Verify TrustTag Now
              </Button>
            </Link>
            <Link to="/create-trust-tag">
              <Button 
                variant="outline"
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                Get Your Free TrustTag
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Partnership Opportunities */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Building className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <CardTitle className="text-white">Enterprise Partners</CardTitle>
              <CardDescription className="text-blue-100">
                Integrate ProofModePro verification into your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/partnership">
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-300 bg-blue-600/20 text-blue-100 hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
              <CardTitle className="text-white">NGO & Training Orgs</CardTitle>
              <CardDescription className="text-blue-100">
                Help your beneficiaries get verified credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/partnership">
                <Button 
                  variant="outline" 
                  className="border-2 border-indigo-300 bg-indigo-600/20 text-indigo-100 hover:bg-indigo-500 hover:text-white hover:border-indigo-400 transition-all duration-300"
                >
                  Partner With Us
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="text-center">
              <Handshake className="w-12 h-12 text-purple-300 mx-auto mb-4" />
              <CardTitle className="text-white">Government & International</CardTitle>
              <CardDescription className="text-blue-100">
                Scale skill verification for workforce programs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/partnership">
                <Button 
                  variant="outline" 
                  className="border-2 border-purple-300 bg-purple-600/20 text-purple-100 hover:bg-purple-500 hover:text-white hover:border-purple-400 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}