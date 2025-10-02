import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Brain, Award, Users, User, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Subtle Professional Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:20px_20px]"></div>
      </div>
      
      {/* Floating Professional Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-100 rounded-lg opacity-40 rotate-12 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-20 h-20 bg-indigo-100 rounded-lg opacity-40 -rotate-12 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gray-100 rounded-lg opacity-40 rotate-45 animate-pulse delay-500"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Professional Badge */}
        <Badge className="mb-6 bg-blue-600 text-white px-6 py-2 text-sm font-medium shadow-sm animate-in fade-in slide-in-from-top duration-700">
          <Users className="w-4 h-4 mr-2" />
          Serving 1.5B+ People Worldwide
        </Badge>

        {/* Updated Headlines */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-900 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          Prove Your Skills.
          <br />
          <span className="text-4xl md:text-6xl text-blue-600">Verify Your Knowledge.</span>
          <br />
          <span className="text-4xl md:text-6xl text-indigo-600">Build Trust.</span>
        </h1>

        {/* Updated Value Proposition */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-5xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-400">
          Go beyond a résumé show the world what you can really do. Upload work samples and complete quick AI-powered assessments to validate your expertise. Each success is rewarded with a timestamped 
          <span className="font-semibold text-gray-900"> TrustTag™</span>, a digital proof you can share with employers, clients, or on your portfolio to win more opportunities and get hired faster.
        </p>

        {/* Professional Process Indicators */}
        <div className="flex flex-wrap justify-center gap-8 mb-10 animate-in fade-in slide-in-from-bottom duration-700 delay-600">
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-700">Upload Work Samples</span>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span className="font-medium text-gray-700">AI Assessment</span>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
            <Award className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">Earn TrustTag™</span>
          </div>
        </div>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-800">
          <Link to="/create-trust-tag">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Create Your TrustTag
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button 
              variant="outline"
              size="lg" 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              <User className="mr-2 w-5 h-5" />
              My Profile
            </Button>
          </Link>
        </div>

        {/* Partnership Button */}
        <div className="flex justify-center mb-12 animate-in fade-in slide-in-from-bottom duration-700 delay-900">
          <Link to="/partnership">
            <Button 
              variant="ghost"
              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-6 py-3 font-medium transition-all duration-300"
            >
              <Handshake className="mr-2 w-4 h-4" />
              Partnership Opportunities
            </Button>
          </Link>
        </div>

        {/* Professional Trust Statement */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom duration-700 delay-1000">
          <p className="text-gray-600 text-sm mb-4">
            Perfect for freelancers, skilled workers, professionals without formal credentials, 
            immigrants, refugees, and anyone looking to showcase their real-world abilities
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
            <span>✓ No degree required</span>
            <span>✓ AI verified results</span>
            <span>✓ Globally recognized</span>
          </div>
        </div>
      </div>
    </section>
  );
}