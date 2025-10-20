import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function RefundPolicyPage() {
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
                Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700">
              <div className="text-center text-lg font-medium">
                Last Updated: October 20, 2025
              </div>
              
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                 <div className="flex">
                    <div className="flex-shrink-0">
                       <AlertTriangle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                       <p className="text-sm text-yellow-800">
                          Please read this policy carefully. All sales are final.
                       </p>
                    </div>
                 </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 pt-4 border-t mt-6">
                All Sales Are Final
              </h2>
              <p>
                At TrustTag, we are committed to providing high-quality digital verification services. Due to the nature of our digital products and services, which are delivered instantly and cannot be returned, we operate under a strict **NO REFUND** policy.
              </p>
              <p>
                Once a purchase is made for any of our TrustTag plans or services, it is final and non-refundable. By completing your purchase, you acknowledge and agree that you will not be entitled to a refund for any reason, including but not limited to dissatisfaction with the service, accidental purchase, or failure to use the service.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 pt-4">
                No Exceptions
              </h3>
              <p>
                This no-refund policy applies to all purchases without exception. We do not offer prorated refunds or credits for partially used service periods.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 pt-4">
                Contact Us
              </h3>
              <p>
                If you have any questions about our Refund Policy, please contact us through the form on our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a> before making a purchase. We are here to help you understand our services and ensure they are the right fit for your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}