import { Link } from 'react-router-dom';

export default function Footer() {
  const footerLinks = [
    { name: 'Verify', path: '/verify' },
    { name: 'Partners', path: '/partnership' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <span className="font-bold text-xl">ProofModePro</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Revolutionizing skill verification with AI-powered assessments and blockchain-secured TrustTags. 
              Help millions prove their abilities and get hired faster.
            </p>
            <div className="text-sm text-gray-500">
              © 2024 ProofModePro. All rights reserved.
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div>topleadsourceindy@gmail.com</div>
              <div>(517) 243-1151</div>
              <div>Available in 50+ countries</div>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {footerLinks.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  to={link.path}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="text-gray-600 ml-6">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}