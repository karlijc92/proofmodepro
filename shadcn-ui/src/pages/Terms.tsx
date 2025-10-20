import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <BackButton />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 text-center">
                Terms of Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700 pt-6">
              <div className="text-center text-sm text-gray-500">
                Last Updated: October 20, 2025
              </div>
              <p>
                By accessing or using ProofMode, you agree to these Terms of Use. ProofMode provides digital verification tools and user-generated TrustTags “as-is,” without warranty or guarantee of accuracy. Users are responsible for the truthfulness of any data or documents they submit.
              </p>
              <p>
                ProofMode and its affiliates are not liable for any loss, claim, or damages arising from reliance on information within the platform. Use of ProofMode constitutes acceptance of these terms and of our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}