import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">TrustTag</span>
            </div>
            <p className="mt-4 text-gray-300 max-w-md">
              Verify your skills with blockchain-backed credentials. Build trust, showcase expertise, and advance your career with TrustTag.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/contact" className="text-base text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:proofmodepro365@gmail.com" className="text-base text-gray-300 hover:text-white">
                  proofmodepro365@gmail.com
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Legal & Platform
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/pricing" className="text-base text-gray-300 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-base text-gray-300 hover:text-white">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-base text-gray-300 hover:text-white">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8 space-y-4">
           <p className="text-sm text-gray-400 text-center max-w-4xl mx-auto">
                <strong>Disclaimer:</strong> ProofMode provides digital verification tools for informational purposes only. Certificates and TrustTags are user-submitted and not official credentials. ProofMode does not guarantee or assume responsibility for the accuracy of user-provided data.
            </p>
            <p className="text-sm text-gray-400 text-center">
                Use of this service constitutes agreement to our <Link to="/terms" className="font-medium text-gray-300 hover:text-white underline">Terms of Use</Link> and <Link to="/privacy" className="font-medium text-gray-300 hover:text-white underline">Privacy Policy</Link>.
            </p>
          <p className="text-base text-gray-400 text-center mt-8">
            © 2024 TrustTag. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}