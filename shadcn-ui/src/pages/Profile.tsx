import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    $memberstackDom?: {
      getCurrentMember: () => Promise<{ data: any }>;
      openModal: (type: "LOGIN" | "SIGNUP" | "PROFILE", options?: any) => Promise<void>;
    };
  }
}

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // If Memberstack isn't loaded yet, wait a moment.
      if (!window.$memberstackDom) {
        // Small delay then try again
        await new Promise((r) => setTimeout(r, 600));
      }

      // If still not available, fail gracefully
      if (!window.$memberstackDom) {
        if (!cancelled) setLoading(false);
        return;
      }

      const { data } = await window.$memberstackDom.getCurrentMember();

      if (cancelled) return;

      // Not logged in → force login modal, and do NOT show mock profile
      if (!data) {
        setMember(null);
        setLoading(false);
        await window.$memberstackDom.openModal("LOGIN");
        return;
      }

      // Logged in
      setMember(data);
      setLoading(false);
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : !window.$memberstackDom ? (
          <div className="rounded-lg border p-6">
            <h1 className="text-xl font-semibold">Memberstack not loaded</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your Memberstack script isn’t loading on this page. Once it loads, this page will automatically show the login modal for logged-out users.
            </p>
          </div>
        ) : !member ? (
          <div className="rounded-lg border p-6">
            <h1 className="text-xl font-semibold">Please log in</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              If the login popup didn’t appear, click below.
            </p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => window.$memberstackDom?.openModal("LOGIN")}>
                Open Login
              </Button>
              <Button
                variant="outline"
                onClick={() => window.$memberstackDom?.openModal("SIGNUP")}
              >
                Open Signup
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border p-6">
            <h1 className="text-2xl font-semibold">Your Profile</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              You’re logged in.
            </p>

            <div className="mt-6 grid gap-3 text-sm">
              <div>
                <span className="font-medium">Email:</span>{" "}
                {member?.email || "—"}
              </div>
              <div>
                <span className="font-medium">Member ID:</span>{" "}
                {member?.id || "—"}
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={() => window.$memberstackDom?.openModal("PROFILE")}>
                Manage Account
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
