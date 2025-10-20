import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Star, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { airtable } from '@/lib/airtable';

const trustTagPackages = [
  {
    id: 'single',
    name: 'Single TrustTag',
    price: 7,
    tags: 1,
    description: 'Perfect for showcasing one key skill',
    features: [
      '1 Professional TrustTag',
      'Comprehensive 12-question assessment',
      'Digital certificate',
      'Shareable profile link',
      'Basic verification'
    ],
    popular: false
  },
  {
    id: 'triple',
    name: '3 TrustTags',
    price: 18,
    tags: 3,
    description: 'Great for multi-skilled professionals',
    features: [
      '3 Professional TrustTags',
      'Multiple skill assessments',
      'Digital certificates',
      'Enhanced profile',
      'Priority verification',
      'Save $3'
    ],
    popular: true
  },
  {
    id: 'five',
    name: '5 TrustTags',
    price: 32,
    tags: 5,
    description: 'Ideal for experienced professionals',
    features: [
      '5 Professional TrustTags',
      'Complete skill portfolio',
      'Premium certificates',
      'Advanced profile features',
      'Fast-track verification',
      'Save $3'
    ],
    popular: false
  },
  {
    id: 'ten',
    name: '10+ TrustTags',
    price: 'Custom',
    tags: '10+',
    description: 'Business package with custom pricing',
    features: [
      '10+ Professional TrustTags',
      'Full skill verification suite',
      'Premium certificates',
      'Professional portfolio',
      'Instant verification',
      'Priority support',
      'Custom pricing available'
    ],
    popular: false
  },
  {
    id: 'business',
    name: 'Business Package',
    price: 'Custom',
    tags: 'Unlimited',
    description: 'Perfect for teams and organizations',
    features: [
      'Unlimited TrustTags for your team',
      'Team management dashboard',
      'Bulk verification tools',
      'Custom branding options',
      'Analytics and reporting',
      'Dedicated support',
      'Volume discounts available'
    ],
    popular: false
  }
];

export default function Checkout() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    setIsProcessing(true);
    
    try {
      const selectedPkg = trustTagPackages.find(pkg => pkg.id === selectedPackage);
      if (!selectedPkg) return;

      // Get user email from localStorage or Memberstack
      const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';

      // For custom pricing packages, redirect to contact
      if (selectedPkg.price === 'Custom') {
        alert(`Thank you for your interest in ${selectedPkg.name}! Please contact us for custom pricing and setup.`);
        window.location.href = '/contact';
        return;
      }

      // Create purchase record in Airtable
      const purchaseData = {
        userEmail,
        packageType: selectedPkg.name,
        numberOfTags: selectedPkg.tags,
        totalAmount: selectedPkg.price,
        selectedSkills: 'To be selected'
      };

      const result = await airtable.createTrustTagPurchase(purchaseData);

      if (result.success) {
        // Redirect to skill selection or payment processing
        alert(`Purchase initiated for ${selectedPkg.name}! You will be redirected to complete payment.`);
        // Here you would typically redirect to Stripe or another payment processor
      } else {
        alert('There was an error processing your purchase. Please try again.');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('There was an error processing your purchase. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/create-trust-tag">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Skills
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your TrustTag Package
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the package that best fits your professional needs. All packages include comprehensive 12-question skill assessments and digital certificates.
            </p>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {trustTagPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPackage === pkg.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                } ${pkg.popular ? 'border-blue-500' : ''}`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {pkg.id === 'business' ? (
                      <Building className="w-8 h-8 text-blue-600" />
                    ) : (
                      <Users className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {pkg.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {pkg.price === 'Custom' ? 'Custom' : `$${pkg.price}`}
                    </span>
                    <span className="text-gray-600 ml-2">
                      ({pkg.tags} tag{typeof pkg.tags === 'number' && pkg.tags > 1 ? 's' : ''})
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Purchase Button */}
          {selectedPackage && (
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Selected Package
                </h3>
                <div className="mb-6">
                  {(() => {
                    const pkg = trustTagPackages.find(p => p.id === selectedPackage);
                    return pkg ? (
                      <>
                        <p className="text-lg font-semibold text-blue-600">{pkg.name}</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {pkg.price === 'Custom' ? 'Custom Pricing' : `$${pkg.price}`}
                        </p>
                        <p className="text-gray-600">{pkg.tags} TrustTag{typeof pkg.tags === 'number' && pkg.tags > 1 ? 's' : ''}</p>
                      </>
                    ) : null;
                  })()}
                </div>
                
                <Button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {isProcessing ? 'Processing...' : 
                   selectedPackage === 'business' || selectedPackage === 'ten' ? 'Get Custom Quote' : 'Create TrustTags'}
                </Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  {selectedPackage === 'business' || selectedPackage === 'ten' ? 
                    'Contact us for volume pricing and custom solutions' :
                    'Secure payment processing • 30-day money-back guarantee'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}