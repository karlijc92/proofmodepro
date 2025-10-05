import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Award, Share2, Download, Calendar, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Profile() {
  const [isDownloading, setIsDownloading] = useState(false);

  const userTrustTags = [
    {
      id: 'TT-WD2024001',
      skill: 'Web Development',
      score: 87,
      issueDate: '2024-01-15',
      status: 'verified',
      category: 'Technology'
    },
    {
      id: 'TT-DA2024002',
      skill: 'Data Analysis',
      score: 92,
      issueDate: '2024-02-03',
      status: 'verified',
      category: 'Technology'
    },
    {
      id: 'TT-PM2024003',
      skill: 'Project Management',
      score: 85,
      issueDate: '2024-02-20',
      status: 'verified',
      category: 'Business'
    }
  ];

  const recentActivity = [
    { action: 'TrustTag earned', skill: 'Project Management', date: '2024-02-20' },
    { action: 'TrustTag shared', skill: 'Data Analysis', date: '2024-02-18' },
    { action: 'Assessment completed', skill: 'Data Analysis', date: '2024-02-03' },
    { action: 'TrustTag earned', skill: 'Web Development', date: '2024-01-15' }
  ];

  const handleDownloadAllTrustTags = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate API call to generate and download PDF portfolio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock PDF download
      const pdfContent = `
        TrustTag Portfolio - Sarah Johnson
        Generated: ${new Date().toLocaleDateString()}
        
        Verified Skills:
        ${userTrustTags.map(tag => `
        • ${tag.skill} (${tag.category})
          Score: ${tag.score}%
          ID: ${tag.id}
          Issued: ${new Date(tag.issueDate).toLocaleDateString()}
          Status: Verified ✓
        `).join('\n')}
        
        Total TrustTags: ${userTrustTags.length}
        Average Score: ${Math.round(userTrustTags.reduce((sum, tag) => sum + tag.score, 0) / userTrustTags.length)}%
        
        Blockchain Verification: All TrustTags are secured on blockchain
        ProofModePro.com - Verify at: proofmodepro.com/verify
      `;
      
      // Create and download the file
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TrustTag-Portfolio-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSingleTrustTag = async (trustTag: typeof userTrustTags[0]) => {
    // Create individual TrustTag certificate
    const certificateContent = `
      TRUSTTAG CERTIFICATE
      
      This certifies that
      SARAH JOHNSON
      
      Has successfully demonstrated proficiency in
      ${trustTag.skill.toUpperCase()}
      
      Assessment Score: ${trustTag.score}%
      TrustTag ID: ${trustTag.id}
      Issue Date: ${new Date(trustTag.issueDate).toLocaleDateString()}
      Category: ${trustTag.category}
      
      This certificate is blockchain-verified and can be validated at:
      proofmodepro.com/verify
      
      ProofModePro - Revolutionizing Skill Verification
    `;
    
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TrustTag-${trustTag.skill.replace(/\s+/g, '-')}-${trustTag.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link to="/">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">SJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">Sarah Johnson</h1>
                  <p className="text-gray-600">Full Stack Developer & Data Analyst</p>
                  <p className="text-sm text-gray-500">Member since January 2024</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      3 TrustTags Verified
                    </Badge>
                    <Badge variant="outline">Average Score: 88%</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <Button className="mb-2">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <div className="text-sm text-gray-600">
                    Profile Views: 1,247
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="trusttags" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trusttags">My TrustTags</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="trusttags" className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleDownloadAllTrustTags}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <div className="w-4 h-4 mr-2 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      {isDownloading ? 'Generating...' : 'My TrustTags'}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Award className="w-4 h-4 mr-2" />
                      Export Portfolio
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* TrustTags Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTrustTags.map((trustTag) => (
                  <Card key={trustTag.id} className="border-2 hover:border-blue-300 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{trustTag.category}</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {trustTag.score}%
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{trustTag.skill}</CardTitle>
                      <CardDescription>
                        ID: {trustTag.id}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Issued: {new Date(trustTag.issueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Verified & Blockchain Secured
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <Button size="sm" variant="outline">
                            <Share2 className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadSingleTrustTag(trustTag)}
                            title="Download Certificate"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest TrustTag activities and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.skill}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">TrustTags Earned</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">88%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-purple-600">1,247</div>
                    <div className="text-sm text-gray-600">Profile Views</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Privacy Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Public Profile</div>
                          <div className="text-sm text-gray-600">Allow others to view your TrustTags</div>
                        </div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-gray-600">Receive updates about your TrustTags</div>
                        </div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Share Analytics</div>
                          <div className="text-sm text-gray-600">Show profile view statistics</div>
                        </div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="font-medium text-gray-900 mb-4">Account Actions</h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={handleDownloadAllTrustTags}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export My Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}