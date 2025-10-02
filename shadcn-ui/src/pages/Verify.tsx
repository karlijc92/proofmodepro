import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, AlertCircle, Calendar, User, Award, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Verify() {
  const [trustTagId, setTrustTagId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!trustTagId.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock verification result
      setVerificationResult({
        isValid: true,
        trustTag: {
          id: trustTagId,
          holderName: 'Sarah Johnson',
          skills: ['React Development', 'JavaScript', 'Node.js'],
          issueDate: '2024-01-15',
          expiryDate: '2025-01-15',
          verificationLevel: 'Premium',
          assessmentScore: 92,
          workSamplesReviewed: true,
          blockchainVerified: true
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">TrustTag Verification</h1>
          <p className="text-gray-600 mt-2">Verify the authenticity of any TrustTag certificate</p>
        </div>

        {/* Verification Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Enter TrustTag ID
            </CardTitle>
            <CardDescription>
              Enter the unique TrustTag ID to verify its authenticity and view details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trustTagId">TrustTag ID</Label>
              <Input
                id="trustTagId"
                placeholder="e.g., TT-2024-ABC123-DEF456"
                value={trustTagId}
                onChange={(e) => setTrustTagId(e.target.value)}
                className="text-lg"
              />
              <p className="text-sm text-gray-500 mt-1">
                The TrustTag ID can be found on the certificate or shared link
              </p>
            </div>
            <Button 
              onClick={handleVerify}
              disabled={!trustTagId.trim() || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isLoading ? 'Verifying...' : 'Verify TrustTag'}
              <CheckCircle className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Verification Result */}
        {verificationResult && (
          <Card className={`border-2 ${verificationResult.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${verificationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                {verificationResult.isValid ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    Verified TrustTag
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    Invalid TrustTag
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {verificationResult.isValid ? (
                <>
                  {/* Holder Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Certificate Holder</p>
                          <p className="text-gray-600">{verificationResult.trustTag.holderName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Issue Date</p>
                          <p className="text-gray-600">{new Date(verificationResult.trustTag.issueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Expiry Date</p>
                          <p className="text-gray-600">{new Date(verificationResult.trustTag.expiryDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Verification Level</p>
                          <Badge className="bg-blue-100 text-blue-800">
                            {verificationResult.trustTag.verificationLevel}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Assessment Score</p>
                          <p className="text-gray-600">{verificationResult.trustTag.assessmentScore}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Blockchain Verified</p>
                          <Badge className="bg-green-100 text-green-800">
                            {verificationResult.trustTag.blockchainVerified ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verified Skills */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Verified Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {verificationResult.trustTag.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Verification Features */}
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">AI Assessment Completed</span>
                    </div>
                    {verificationResult.trustTag.workSamplesReviewed && (
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Work Samples Reviewed</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Blockchain Timestamped</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Globally Recognized</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Full Certificate
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Blockchain Record
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-red-800 mb-2">TrustTag Not Found</h3>
                  <p className="text-red-600">
                    The TrustTag ID you entered could not be verified. Please check the ID and try again.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About TrustTag Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">What We Verify</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Certificate authenticity</li>
                  <li>• Holder identity</li>
                  <li>• Assessment scores</li>
                  <li>• Skill verification status</li>
                  <li>• Expiry dates</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Security Features</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Blockchain timestamping</li>
                  <li>• Cryptographic signatures</li>
                  <li>• Tamper-proof records</li>
                  <li>• Real-time verification</li>
                  <li>• Global accessibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}