import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Brain, CheckCircle, Award } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Upload,
      title: "Upload Work Samples",
      description: "Share photos, videos, files, or descriptions of your work. No formal documents needed - just real examples of what you've done.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      step: "02",
      icon: Brain,
      title: "Take AI Assessment",
      description: "Complete a quick AI-powered assessment tailored to your field. Our system analyzes your work and tests your knowledge in real-time.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      step: "03",
      icon: CheckCircle,
      title: "Get Verified",
      description: "Our AI validates your skills, checks authenticity, and evaluates your expertise level. The entire process takes just minutes.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      step: "04",
      icon: Award,
      title: "Earn Your TrustTag™",
      description: "Receive a timestamped, blockchain-verified TrustTag that proves your skills. Share it with employers, clients, or on your portfolio.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-700">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How ProofModePro Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get verified in 4 simple steps. No degrees, no lengthy applications, no waiting months for approval.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-2 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg group">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-center">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow Arrows */}
        <div className="hidden lg:block relative mt-8">
          <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300"></div>
          <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-300 to-green-300"></div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200 mb-6">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700 font-medium">Average completion time: 5-10 minutes</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who have already proven their skills and advanced their careers with ProofModePro TrustTags.
          </p>
        </div>
      </div>
    </section>
  );
}