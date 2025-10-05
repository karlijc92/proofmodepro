import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">ProofMode Privacy Policy</h1>
          
          <div className="text-gray-600 mb-6">
            <p><strong>Effective Date:</strong> October 4, 2025</p>
            <p><strong>Last Updated:</strong> October 4, 2025</p>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              ProofMode ("the Platform") respects your privacy and is committed to protecting the personal information you share when using our website and verification services.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="mb-3">We collect only the information needed to operate and improve our services, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Basic account details such as your name, email, and password.</li>
                <li>Information you choose to provide for verification or profile purposes.</li>
                <li>Payment information processed securely through third-party payment providers.</li>
              </ul>
              <p className="mt-3">We do not collect or store sensitive financial data such as full credit card numbers.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Information</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage user accounts.</li>
                <li>Provide verification and credentialing services.</li>
                <li>Maintain platform security and prevent misuse.</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or share your information with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Protection</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your information is stored securely and protected using reasonable administrative, technical, and physical safeguards.</li>
                <li>Access is limited to authorized personnel who need it to operate the service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Retention and Deletion</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We keep your information only as long as necessary to provide our services or as required by law.</li>
                <li>You may request account deletion at any time, and associated information will be removed within a reasonable period.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Policy Updates</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We may update this Privacy Policy as our services or legal requirements change. Updates will be posted on this page with a new effective date.</li>
                <li>Continued use of ProofMode after updates means you accept the revised terms.</li>
              </ul>
            </section>

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Summary</h3>
              <p className="text-blue-800">
                ProofMode collects only basic user data to provide its services, keeps it secure, and never sells it.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}