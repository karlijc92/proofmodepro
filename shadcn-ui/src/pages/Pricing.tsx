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
          <h1 className="text-4xl font-bold mb-4">Turn Your Skills Into Proof</h1>
          <p className="text-gray-600 mb-10">
            Get verified, get trusted, and get hired faster — even without traditional credentials.
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
                <p className="text-sm mb-4">
                  Prove one skill you already have and turn it into a verified credential employers can trust.
                </p>

                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ 1 verified skill certification</li>
                  <li>✔ unique TrustTag ID employers can check</li>
                  <li>✔ public verification page</li>
                  <li>✔ lifetime access — no expiration</li>
                </ul>

                <a href="https://buy.stripe.com/3cI14ogoZ8cyaWW1VteME06">
                  <Button className="w-full">Unlock Your TrustTag</Button>
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
                <p className="text-sm mb-4">
                  Show multiple skills and increase your chances of getting hired across different roles.
                </p>

                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ verify 3 different skills</li>
                  <li>✔ stronger profile for employers</li>
                  <li>✔ better value than single purchases</li>
                  <li>✔ lifetime access</li>
                </ul>

                <a href="https://buy.stripe.com/14A7sM7St3Wi9SS1VteME07">
                  <Button className="w-full">Get 3 TrustTags</Button>
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
                <p className="text-sm mb-4">
                  Build a complete, powerful profile that shows everything you can do.
                </p>

                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ verify 5 skills</li>
                  <li>✔ best value per TrustTag</li>
                  <li>✔ stand out instantly to employers</li>
                  <li>✔ lifetime access</li>
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
                <p className="text-sm mb-4">
                  Keep growing your verified profile over time and stay competitive in the job market.
                </p>

                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ ongoing access to new TrustTags</li>
                  <li>✔ continuously build your profile</li>
                  <li>✔ ideal for freelancers and job seekers</li>
                  <li>✔ stay relevant as your skills grow</li>
                </ul>

                <a href="https://buy.stripe.com/5kQ6oIa0BeAWaWW8jReME09">
                  <Button className="w-full">Start Career Plan</Button>
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
                <p className="text-sm mb-4">
                  Quickly verify workers, reduce hiring risk, and build trust with your team and clients.
                </p>

                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li>✔ verify multiple workers</li>
                  <li>✔ confirm real skills before hiring</li>
                  <li>✔ reduce risk and bad hires</li>
                  <li>✔ scale trusted workforce quickly</li>
                </ul>

                <a href="https://buy.stripe.com/eVq8wQfkV9gC2qqeIfeME0a">
                  <Button className="w-full">Start Business Plan</Button>
                </a>
              </CardContent>
            </Card>

          </div>

          <p className="text-xs text-gray-500 mt-10">
            All purchases are final. Due to the nature of digital verification services, no refunds will be issued.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
