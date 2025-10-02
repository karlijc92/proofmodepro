import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-1 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-bold text-blue-400">ProofModePro</h3>
            <p className="text-gray-300 leading-relaxed">
              Revolutionizing skill verification for the global workforce. Prove your skills, verify your knowledge, build trust.
            </p>
            <Badge className="bg-blue-600 text-white">
              <Globe className="w-3 h-3 mr-1" />
              Global Platform
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}