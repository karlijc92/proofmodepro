import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Award, Settings, Share2, Download, Eye, Calendar, CheckCircle, ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [user] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    location: 'San Francisco, CA',
    portfolio: 'https://sarahjohnson.dev',
    joinDate: '2024-01-15'
  });

  const [trustTags] = useState([
    {
      id: 'TT-2024-ABC123-DEF456',
      skills: ['React Development', 'JavaScript', 'Node.js'],
      level: 'Premium',
      score: 92,
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'Active',
      views: 156
    },
    {
      id: 'TT-2024-GHI789-JKL012',
      skills: ['Python', 'Data Analysis', 'Machine Learning'],
      level: 'Standard',
      score: 88,
      issueDate: '2024-02-20',
      expiryDate: '2024-11-20',
      status: 'Active',
      views: 89
    },
    {
      id: 'TT-2024-MNO345-PQR678',
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
      level: 'Basic',
      score: 85,
      issueDate: '2024-03-10',
      expiryDate: '2024-12-10',
      status: 'Expiring Soon',
      views: 234
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New TrustTag
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-xl">SJ</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <Badge className="mt-2 bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified User
                  </Badge>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>{trustTags.length} TrustTags</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{trustTags.reduce((sum, tag) => sum + tag.views, 0)} Profile Views</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export TrustTags
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="trusttags" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trusttags">My TrustTags</TabsTrigger>
                <TabsTrigger value="profile">Profile Settings</TabsTrigger>
                <TabsTrigger value="account">Account Settings</TabsTrigger>
              </TabsList>

              {/* TrustTags Tab */}
              <TabsContent value="trusttags" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">My TrustTags</h3>
                  <Link to="/create-trust-tag">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-6">
                  {trustTags.map((trustTag) => (
                    <Card key={trustTag.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{trustTag.skills.join(', ')}</CardTitle>
                            <CardDescription>ID: {trustTag.id}</CardDescription>
                          </div>
                          <div className="text-right">
                            <Badge 
                              className={`${
                                trustTag.status === 'Active' ? 'bg-green-100 text-green-800' :
                                trustTag.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {trustTag.status}
                            </Badge>
                            <p className="text-sm text-gray-500 mt-1">{trustTag.level} Level</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Score</p>
                            <p className="text-2xl font-bold text-blue-600">{trustTag.score}%</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Views</p>
                            <p className="text-lg font-semibold text-gray-700">{trustTag.views}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Issued</p>
                            <p className="text-sm text-gray-600">{new Date(trustTag.issueDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Expires</p>
                            <p className="text-sm text-gray-600">{new Date(trustTag.expiryDate).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {trustTag.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Certificate
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Profile Settings Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your public profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={user.location} />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={user.bio} rows={3} />
                    </div>
                    
                    <div>
                      <Label htmlFor="portfolio">Portfolio Website</Label>
                      <Input id="portfolio" defaultValue={user.portfolio} />
                    </div>
                    
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Settings Tab */}
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences and security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    
                    <div>
                      <Label htmlFor="password">New Password</Label>
                      <Input id="password" type="password" placeholder="Leave blank to keep current password" />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Update Account
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-800">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}