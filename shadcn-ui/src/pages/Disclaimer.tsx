import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DisclaimerPage() {
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
                Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700 pt-6">
              <div className="text-center text-sm text-gray-500">
                Last Updated: October 20, 2025
              </div>
              <p>
                ProofMode provides digital verification tools for informational purposes only. The certificates and TrustTags available on our platform are based on user-submitted data and are not official credentials issued or endorsed by any formal institution unless explicitly stated.
              </p>
              <p>
                ProofMode does not guarantee, and assumes no responsibility for, the accuracy, completeness, or authenticity of the information provided by users. Users of this service are solely responsible for verifying the details of any credential with the issuing party.
              </p>
              <p>
                Use of this service constitutes your agreement to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Use</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}