import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get Verified with TrustTags</h1>
          <p className="text-gray-600 mb-10">
            Turn your real-world skills into verified, employer-trusted credentials.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Single */}
            <Card>
              <CardHeader>
                <CardTitle>Single TrustTag</CardTitle>
                <CardDescription>
                  <span className="line-through text-gray-400">$29</span> <span className="text-2xl font-bold">$19</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ 1 Verified Skill Certification</li>
                  <li>✔ Employer Verification ID</li>
                  <li>✔ Public Verification Page</li>
                  <li>✔ Lifetime Access</li>
                </ul>

                <a href="https://buy.stripe.com/3cI14ogoZ8cyaWW1VteME06">
                  <Button className="w-full">Unlock TrustTag</Button>
                </a>
              </CardContent>
            </Card>

            {/* 3 Bundle */}
            <Card>
              <CardHeader>
                <CardTitle>3 TrustTags</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">$49</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ 3 Verified Skill Certifications</li>
                  <li>✔ Save vs single purchases</li>
                  <li>✔ Ideal for multi-skill workers</li>
                  <li>✔ Lifetime Access</li>
                </ul>

                <a href="https://buy.stripe.com/14A7sM7St3Wi9SS1VteME07">
                  <Button className="w-full">Get Bundle</Button>
                </a>
              </CardContent>
            </Card>

            {/* 5 Bundle */}
            <Card>
              <CardHeader>
                <CardTitle>5 TrustTags</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">$75</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ 5 Verified Skill Certifications</li>
                  <li>✔ Best value per TrustTag</li>
                  <li>✔ Build a full verified profile</li>
                  <li>✔ Lifetime Access</li>
                </ul>

                <a href="https://buy.stripe.com/14A14o0q1eAW0ii0RpeME08">
                  <Button className="w-full">Best Value</Button>
                </a>
              </CardContent>
            </Card>

            {/* Career Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Career Plan</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">$13/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ Ongoing skill verification access</li>
                  <li>✔ Continuous profile growth</li>
                  <li>✔ Ideal for freelancers & workers</li>
                </ul>

                <a href="https://buy.stripe.com/5kQ6oIa0BeAWaWW8jReME09">
                  <Button className="w-full">Start Plan</Button>
                </a>
              </CardContent>
            </Card>

            {/* Business Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Business Plan</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">$50/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ Verify multiple workers</li>
                  <li>✔ Hiring trust validation</li>
                  <li>✔ Scale workforce verification</li>
                </ul>

                <a href="https://buy.stripe.com/eVq8wQfkV9gC2qqeIfeME0a">
                  <Button className="w-full">Start Business Plan</Button>
                </a>
              </CardContent>
            </Card>

          </div>

          {/* Policy */}
          <p className="text-xs text-gray-500 mt-10">
            All purchases are final. Due to the nature of digital verification services, no refunds will be issued.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
