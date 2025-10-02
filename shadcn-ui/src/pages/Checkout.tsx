import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Wallet, Smartphone, Shield, CheckCircle, ArrowLeft, Lock, Building, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    id: 'single',
    name: 'Single TrustTag',
    price: 7,
    originalPrice: null,
    description: 'Perfect for getting started',
    features: ['AI-powered skill assessment', 'Basic TrustTag certificate', 'Email verification', '90-day validity', 'LinkedIn integration'],
    popular: false
  },
  {
    id: 'bundle3',
    name: '3 TrustTags Pack',
    price: 18,
    originalPrice: 21,
    description: 'Save $3 with bundle pricing',
    features: ['3 TrustTag verifications', 'AI skill assessments', 'Enhanced certificates', 'LinkedIn integration', '1-year validity', 'Priority support'],
    popular: true,
    savings: '$3'
  },
  {
    id: 'bundle5',
    name: '5 TrustTags Pack',
    price: 30,
    originalPrice: 35,
    description: 'Best value - Save $5',
    features: ['5 TrustTag verifications', 'Premium assessments', 'Work samples review', 'Blockchain timestamped', '2-year validity', 'Priority support', 'Portfolio integration'],
    popular: false,
    savings: '$5'
  },
  {
    id: 'business',
    name: 'Business Plan',
    price: 299,
    originalPrice: null,
    description: 'For employers and teams',
    features: ['50 TrustTag verifications', 'Team dashboard', 'Bulk verification tools', 'Custom branding', 'API access', 'Dedicated support', 'Analytics & reporting', 'White-label options'],
    popular: false,
    isEnterprise: true
  }
];

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState('bundle3');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    companyName: ''
  });
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const selectedPlanDetails = pricingPlans.find(plan => plan.id === selectedPlan);
  const subtotal = selectedPlanDetails?.price || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleInputChange = (field: string, value: string, section: 'billing' | 'card') => {
    if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [field]: value }));
    } else {
      setCardInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/create-trust-tag" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to TrustTag Creation
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
          <p className="text-gray-600 mt-2">Single TrustTag – $7, 3 TrustTags Pack – $18 (save $3), 5 TrustTags Pack – $30 (save $5)</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Plan Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Select Your Plan</Label>
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                    {pricingPlans.map(plan => (
                      <div key={plan.id} className={`relative flex items-center space-x-2 p-4 border rounded-lg ${plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                        {plan.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {plan.isEnterprise && (
                          <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white">
                            <Building className="w-3 h-3 mr-1" />
                            Business
                          </Badge>
                        )}
                        <RadioGroupItem value={plan.id} id={plan.id} />
                        <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{plan.name}</p>
                              <p className="text-sm text-gray-500">{plan.description}</p>
                              {plan.savings && (
                                <p className="text-sm text-green-600 font-medium">Save {plan.savings}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-lg">${plan.price}</span>
                              {plan.originalPrice && (
                                <p className="text-sm text-gray-400 line-through">${plan.originalPrice}</p>
                              )}
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator />

                {/* Selected Plan Details */}
                {selectedPlanDetails && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">{selectedPlanDetails.name}</h4>
                    <ul className="space-y-2">
                      {selectedPlanDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Badge className="w-full justify-center bg-green-100 text-green-800 border-green-200">
                  <Lock className="w-4 h-4 mr-2" />
                  Secure 256-bit SSL Encryption
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Enter your billing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPlanDetails?.isEnterprise && (
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={billingInfo.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value, 'billing')}
                      placeholder="Your Company Name"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={billingInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value, 'billing')}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={billingInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value, 'billing')}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value, 'billing')}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={(value) => handleInputChange('country', value, 'billing')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={billingInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value, 'billing')}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={billingInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value, 'billing')}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={billingInfo.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value, 'billing')}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="w-5 h-5" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="w-5 h-5" />
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="apple" id="apple" />
                    <Label htmlFor="apple" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="w-5 h-5" />
                      Apple Pay
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={cardInfo.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value, 'card')}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value, 'card')}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={cardInfo.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value, 'card')}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={cardInfo.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value, 'card')}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Terms and Complete Order */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </Label>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!agreeTerms}
                  >
                    Complete Order - ${total.toFixed(2)}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Your payment is secured with 256-bit SSL encryption. You will receive your TrustTag within 24-48 hours after verification completion.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}