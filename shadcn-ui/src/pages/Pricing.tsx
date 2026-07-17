import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePurchase = async (planId: string) => {
    setErrorMessage(null);
    setLoadingPlan(planId);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      if (!accessToken) {
        setErrorMessage("Please log in before purchasing a plan.");
        setLoadingPlan(null);
        return;
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ planId }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Failed to start checkout");
      }

      window.location.href = result.url;
    } catch (error) {
      console.error("Purchase error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Turn Your Skills Into Proof</h1>
          <p className="text-gray-600 mb-4">
            Get verified, get trusted, and get hired faster — even without traditional credentials.
          </p>

          {errorMessage && (
            <p className="text-sm text-red-600 mb-6">{errorMessage}</p>
          )}

          <div className="grid md:grid-cols-3 gap-6">

            {/* Single */}
            <Card>
              <CardHeader>
                <CardTitle>Single TrustTag</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">$19</span>
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

                <Button
                  className="w-full"
                  disabled={loadingPlan === "single"}
                  onClick={() => handlePurchase("single")}
                >
                  {loadingPlan === "single" ? "Loading..." : "Unlock Your TrustTag"}
                </Button>
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

                <Button
                  className="w-full"
                  disabled={loadingPlan === "triple"}
                  onClick={() => handlePurchase("triple")}
                >
                  {loadingPlan === "triple" ? "Loading..." : "Get 3 TrustTags"}
                </Button>
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

                <Button
                  className="w-full"
                  disabled={loadingPlan === "five"}
                  onClick={() => handlePurchase("five")}
                >
                  {loadingPlan === "five" ? "Loading..." : "Best Value"}
                </Button>
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

                <Button
                  className="w-full"
                  disabled={loadingPlan === "career"}
                  onClick={() => handlePurchase("career")}
                >
                  {loadingPlan === "career" ? "Loading..." : "Start Career Plan"}
                </Button>
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

                <Button
                  className="w-full"
                  disabled={loadingPlan === "business"}
                  onClick={() => handlePurchase("business")}
                >
                  {loadingPlan === "business" ? "Loading..." : "Start Business Plan"}
                </Button>
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
