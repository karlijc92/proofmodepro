import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

export default function Terms() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">ProofMode Terms & Conditions</h1>
          
          <div className="text-gray-600 mb-6">
            <p><strong>Effective Date:</strong> October 4, 2025</p>
            <p><strong>Last Updated:</strong> October 4, 2025</p>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              Welcome to ProofMode ("the Platform"). By using our website or services, you agree to the following terms.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Use of the Platform</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>ProofMode provides digital verification and credentialing services.</li>
                <li>You agree to use the Platform lawfully and for its intended purpose only.</li>
                <li>You are responsible for all information and materials you submit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate information when creating an account and keep your login details secure.</li>
                <li>We may suspend or remove accounts that misuse the service or violate these terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Payments and Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All payments made through ProofMode are final and non-refundable.</li>
                <li>Once a verification or TrustTag order is submitted, it cannot be canceled or refunded.</li>
                <li>Please review all information carefully before completing your purchase.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Verification Content</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>By submitting materials for verification, you confirm that you own or have permission to use them.</li>
                <li>ProofMode is not responsible for errors or outcomes based on user-submitted content.</li>
                <li>Verified results or "TrustTags" are informational only and do not guarantee employment, licensing, or certification.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Platform is provided "as is," without warranties of any kind.</li>
                <li>ProofMode is not liable for indirect, incidental, or consequential damages resulting from use of the service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Privacy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of the Platform is also governed by our Privacy Policy.</li>
                <li>We handle user data responsibly and in compliance with Michigan law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We may update these Terms at any time. Updates will be posted here with a new effective date.</li>
                <li>Continued use of the Platform means you accept the revised Terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Governing Law</h2>
              <p>These Terms are governed by the laws of the State of Michigan, United States.</p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}