import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, Shield, Calendar, User, Award, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface VerificationResult {
  isValid: boolean;
  trustTagId: string;
  skill: string;
  holderName: string;
  issueDate: string;
  score: number;
  verificationDate: string;
  blockchainHash: string;
}

export default function Verify() {
  const [trustTagId, setTrustTagId] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock verification result
      const mockResult: VerificationResult = {
        isValid: trustTagId.length > 5,
        trustTagId: trustTagId,
        skill: 'Web Development',
        holderName: 'Sarah Johnson',
        issueDate: '2024-01-15',
        score: 87,
        verificationDate: new Date().toISOString(),
        blockchainHash: '0x' + Math.random().toString(16).substr(2, 40)
      };
      
      setVerificationResult(mockResult);
      setIsLoading(false);
    }, 1500);
  };

  const sampleTrustTags = [
    { id: 'TT-WD2024001', skill: 'Web Development', holder: 'Sarah Johnson' },
    { id: 'TT-DA2024002', skill: 'Data Analysis', holder: 'Michael Chen' },
    { id: 'TT-GD2024003', skill: 'Graphic Design', holder: 'Elena Rodriguez' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Verify TrustTag
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Instantly verify the authenticity of any TrustTag certificate. 
            Enter the TrustTag ID to confirm skills and credentials.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Verification Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                TrustTag Verification
              </CardTitle>
              <CardDescription>
                Enter a TrustTag ID to verify its authenticity and view credential details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <Label htmlFor="trustTagId">TrustTag ID</Label>
                  <div className="flex gap-4">
                    <Input
                      id="trustTagId"
                      value={trustTagId}
                      onChange={(e) => setTrustTagId(e.target.value)}
                      placeholder="Enter TrustTag ID (e.g., TT-WD2024001)"
                      className="flex-1"
                      required
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !trustTagId}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <Search className="w-4 h-4 mr-2" />
                      )}
                      Verify
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Verification Result */}
          {verificationResult && (
            <Card className={`mb-8 border-2 ${
              verificationResult.isValid 
                ? 'border-green-200 bg-green-50' 
                : 'border-red-200 bg-red-50'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center ${
                  verificationResult.isValid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {verificationResult.isValid ? (
                    <CheckCircle className="w-6 h-6 mr-2" />
                  ) : (
                    <XCircle className="w-6 h-6 mr-2" />
                  )}
                  {verificationResult.isValid ? 'Valid TrustTag' : 'Invalid TrustTag'}
                </CardTitle>
                <CardDescription className={
                  verificationResult.isValid ? 'text-green-700' : 'text-red-700'
                }>
                  {verificationResult.isValid 
                    ? 'This TrustTag has been verified and is authentic'
                    : 'This TrustTag ID was not found or is invalid'
                  }
                </CardDescription>
              </CardHeader>
              
              {verificationResult.isValid && (
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600">Skill Verified</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {verificationResult.skill}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-600">Certificate Holder</div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium">{verificationResult.holderName}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-600">Assessment Score</div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-2 text-green-600" />
                          <span className="font-semibold text-green-600">{verificationResult.score}%</span>
                          <Badge className="ml-2 bg-green-100 text-green-800">Verified</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600">Issue Date</div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{new Date(verificationResult.issueDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-600">TrustTag ID</div>
                        <div className="font-mono text-sm bg-white p-2 rounded border">
                          {verificationResult.trustTagId}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-600">Blockchain Hash</div>
                        <div className="font-mono text-xs bg-white p-2 rounded border break-all">
                          {verificationResult.blockchainHash}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-green-700">
                        ✓ Verified on blockchain • ✓ AI assessment completed • ✓ Work samples reviewed
                      </div>
                      <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Blockchain
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Sample TrustTags */}
          <Card>
            <CardHeader>
              <CardTitle>Try Sample Verifications</CardTitle>
              <CardDescription>
                Click on any sample TrustTag ID below to see the verification process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {sampleTrustTags.map((sample) => (
                  <div
                    key={sample.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setTrustTagId(sample.id)}
                  >
                    <div className="font-mono text-sm text-blue-600 mb-2">{sample.id}</div>
                    <div className="font-medium text-gray-900">{sample.skill}</div>
                    <div className="text-sm text-gray-600">{sample.holder}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}