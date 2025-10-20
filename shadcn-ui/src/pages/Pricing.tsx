import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  ArrowLeft, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  Crown,
  Sparkles,
  Award,
  Building,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    id: 'single',
    name: 'Single TrustTag',
    price: '$19',
    period: 'one-time',
    description: 'Verification for one skill or project.',
    badge: null,
    icon: Sparkles,
    features: [
      '1 verified TrustTag',
      'AI + manual verification process',
      'Downloadable badge (PDF & image)',
      'Shareable verification link',
      'ProofMode profile integration',
      'One-time purchase, no subscription'
    ],
    cta: 'Create My TrustTag',
    popular: false,
    stripeLink: 'https://buy.stripe.com/3cI14ogoZ8cyaWW1VteME06',
    savings: null
  },
  {
    id: 'bundle-3',
    name: '3 TrustTags Bundle',
    price: '$49',
    period: 'one-time',
    description: 'Verification for three separate skills or projects.',
    badge: 'Save $8',
    icon: Award,
    features: [
      '3 verified TrustTags',
      'Priority verification',
      'All Single features included',
      'Manage tags inside profile',
      'Share and download all tags'
    ],
    cta: 'Get 3 TrustTags',
    popular: false,
    stripeLink: 'https://buy.stripe.com/3cI14ogoZ8cyaWW1VteME06',
    savings: '$8'
  },
  {
    id: 'bundle-5',
    name: '5 TrustTags Bundle',
    price: '$75',
    period: 'one-time',
    description: 'Verification for five separate skills or projects.',
    badge: 'Most Popular',
    icon: Crown,
    features: [
      '5 verified TrustTags',
      '"Verified Creator" badge on profile',
      'All bundle features included',
      'Optional LinkedIn integration (coming soon)',
      'Early access to new tools'
    ],
    cta: 'Get 5 TrustTags',
    popular: true,
    stripeLink: 'https://buy.stripe.com/14A14o0q1eAW0ii0RpeME08',
    savings: '$20'
  },
  {
    id: 'career',
    name: 'Career Advancement Plan',
    price: '$13',
    period: 'per month',
    description: 'Monthly plan with unlimited TrustTag verifications.',
    badge: 'Best Value',
    icon: TrendingUp,
    features: [
      'Unlimited TrustTags',
      'Verified resume builder',
      'AI career feedback tools',
      'Priority verification & support',
      'Cancel anytime'
    ],
    cta: 'Start Career Plan',
    popular: false,
    stripeLink: 'https://buy.stripe.com/5kQ6oIa0BeAWaWW8jReME09',
    savings: null
  },
  {
    id: 'business',
    name: 'Business & Partner Plan',
    price: '$50',
    period: 'per month',
    description: 'Monthly plan for organizations to create and manage multiple TrustTags.',
    badge: null,
    icon: Building,
    features: [
      'For partners or business plans',
      'Manage multiple user profiles',
      'Partner dashboard with analytics',
      'Custom verification links & API access',
      'Dedicated partner support',
      'Early partner directory listing'
    ],
    cta: 'Join Partner Plan',
    popular: false,
    stripeLink: 'https://buy.stripe.com/eVq8wQfkV9gC2qqeIfeME0a',
    savings: null
  }
];

export default function Pricing() {
  const handlePlanSelection = (stripeLink: string) => {
    window.location.href = stripeLink;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/" className="text-2xl font-bold text-blue-600">TrustTag</Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pricing & Plans
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan to verify your skills and build trust with employers, clients, and partners
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'} hover:shadow-lg transition-all duration-200`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className={`px-3 py-1 text-xs ${
                      plan.popular 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      <Star className="w-3 h-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        plan.popular ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-bold mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="text-center mb-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-1 text-sm">
                      {plan.period}
                    </span>
                  </div>
                  
                  {plan.savings && (
                    <div className="text-sm text-green-600 font-medium mb-2">
                      Save {plan.savings}
                    </div>
                  )}
                  
                  <CardDescription className="text-gray-600 text-sm h-10">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                  {/* Features */}
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-2 text-sm mt-auto ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    onClick={() => handlePlanSelection(plan.stripeLink)}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Value Proposition */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose ProofMode TrustTags?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Credibility</h3>
              <p className="text-gray-600">
                AI + human verification ensures your skills are authentic and trustworthy to employers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Recognition</h3>
              <p className="text-gray-600">
                Share your verified TrustTags on LinkedIn, resumes, and portfolios for immediate impact.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Network</h3>
              <p className="text-gray-600">
                Join thousands of verified professionals building trust in the digital economy.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What makes TrustTags different from certificates?
              </h3>
              <p className="text-gray-600">
                TrustTags use AI + human verification to validate real skills, not just course completion. 
                They're shareable, verifiable, and trusted by employers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does verification take?
              </h3>
              <p className="text-gray-600">
                Standard verification takes 3-7 business days. Priority verification (bundles and plans) 
                is completed within 1-3 business days.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade from a bundle to a monthly plan?
              </h3>
              <p className="text-gray-600">
                Yes! Your existing TrustTags carry over when you upgrade to a Career or Business plan. 
                Contact support for seamless migration.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is your refund policy?
              </h3>
              <p className="text-gray-600">
                All sales are final. We do not offer refunds once verification has begun. 
                Please review your purchase carefully before completing checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Secure Payments via Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>10,000+ Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>No Refunds Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}