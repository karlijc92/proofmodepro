import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
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
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700 pt-6">
              <div className="text-center text-sm text-gray-500">
                Last Updated: October 20, 2025
              </div>
              <p>
                ProofMode respects your privacy and is committed to protecting your personal information. We collect only the data you provide when using our services, such as your name, email, and uploaded verification materials. This information is used solely to create and manage your TrustTags, process payments, and improve platform performance.
              </p>
              <p>
                We never sell or share your data with third parties except as required by law or to operate essential services (such as payment or hosting providers). All data is transmitted securely and stored in compliance with applicable privacy regulations.
              </p>
              <p>
                By using ProofMode, you consent to this Privacy Policy and the collection and use of your information as described.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}