import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Brain, Award, Globe, Shield, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Upload,
      title: "Upload Work Samples",
      description: "Share photos, videos, files, or descriptions of your work. No formal documents required.",
      badge: "Easy",
      color: "text-blue-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your work, checks authenticity, and evaluates skill level.",
      badge: "Smart",
      color: "text-indigo-600"
    },
    {
      icon: Award,
      title: "Earn TrustTags™",
      description: "Get timestamped, verifiable certificates that prove your capabilities to the world.",
      badge: "Verified",
      color: "text-green-600"
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Your TrustTags are recognized worldwide by employers, clients, and platforms.",
      badge: "Worldwide",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. You control who sees your TrustTags.",
      badge: "Protected",
      color: "text-red-600"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Get verified in minutes, not months. Perfect for urgent job applications.",
      badge: "Fast",
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700">
            Why Choose ProofModePro
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Modern Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ProofModePro combines cutting-edge AI with blockchain technology to create the most trusted skill verification platform in the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className={`w-12 h-12 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Verified Professionals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">180+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">2 Min</div>
              <div className="text-gray-600">Average Verification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}