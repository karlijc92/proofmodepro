import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Users, Handshake, ArrowLeft, CheckCircle, Globe, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Partnership() {
  const [formData, setFormData] = useState({
    organizationType: '',
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    interestedIn: '',
    expectedVolume: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    alert('Thank you for your interest! We will contact you within 24 hours.');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Partnership Opportunities
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Join ProofMode in revolutionizing skill verification. Partner with us to help millions of people 
            showcase their abilities and get recognized for their talents.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Blockchain secured verification</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>AI-powered assessments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="w-5 h-5 text-blue-500" />
              <span>Global recognition</span>
            </div>
          </div>
        </div>

        {/* Partnership Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 hover:border-blue-300 transition-colors">
            <CardHeader className="text-center">
              <Building className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Enterprise Partners</CardTitle>
              <CardDescription>
                Integrate TrustTag verification into your HR platform, job board, or recruitment system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  API integration support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  White-label solutions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Custom verification workflows
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Volume pricing discounts
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-indigo-300 transition-colors">
            <CardHeader className="text-center">
              <Users className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <CardTitle className="text-xl">NGO & Training Organizations</CardTitle>
              <CardDescription>
                Help your beneficiaries and students get verified credentials that employers trust
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Discounted rates for nonprofits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Bulk TrustTag packages
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Training program integration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Impact measurement tools
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-purple-300 transition-colors">
            <CardHeader className="text-center">
              <Handshake className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Government & International</CardTitle>
              <CardDescription>
                Scale skill verification for workforce development and international mobility programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Multi-language support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Compliance & security
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Custom skill frameworks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Analytics & reporting
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Partnership Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Partner With Us</CardTitle>
            <CardDescription>
              Tell us about your organization and how you'd like to work together
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="organizationType">Organization Type *</Label>
                  <Select onValueChange={(value) => handleInputChange('organizationType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise / Corporation</SelectItem>
                      <SelectItem value="ngo">NGO / Non-profit</SelectItem>
                      <SelectItem value="training">Training Organization</SelectItem>
                      <SelectItem value="government">Government Agency</SelectItem>
                      <SelectItem value="international">International Organization</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    placeholder="Your organization name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@organization.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourorganization.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestedIn">What are you interested in? *</Label>
                <Select onValueChange={(value) => handleInputChange('interestedIn', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api-integration">API Integration</SelectItem>
                    <SelectItem value="white-label">White-label Solution</SelectItem>
                    <SelectItem value="bulk-trusttags">Bulk TrustTag Packages</SelectItem>
                    <SelectItem value="custom-skills">Custom Skill Assessments</SelectItem>
                    <SelectItem value="workforce-programs">Workforce Development Programs</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedVolume">Expected Volume</Label>
                <Select onValueChange={(value) => handleInputChange('expectedVolume', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How many people would use TrustTags?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-100">1-100 people</SelectItem>
                    <SelectItem value="100-1000">100-1,000 people</SelectItem>
                    <SelectItem value="1000-10000">1,000-10,000 people</SelectItem>
                    <SelectItem value="10000+">10,000+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Tell us more about your needs *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your organization, your goals, and how you'd like to use TrustTag verification..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Submit Partnership Request
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Have Questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our partnership team is here to help you find the right solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600">
            <span>📧 partnerships@proofmodepro.com</span>
            <span>📞 +1 (555) 123-4567</span>
            <span>🌐 Available in 50+ countries</span>
          </div>
        </div>
      </div>
    </div>
  );
}