import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  proofModeCategories,
  proofModeSkills,
  trustTagRules,
  generateProfileId,
} from "@/data/proofmodeConfig";

declare global {
  interface Window {
    $memberstackDom?: {
      getCurrentMember: () => Promise<{ data: any }>;
      openModal: (type: "LOGIN" | "SIGNUP" | "PROFILE", options?: any) => Promise<void>;
    };
  }
}

function memberIdToProfileNumber(memberId: string) {
  if (!memberId) return 1001;

  const numbersOnly = memberId.replace(/\D/g, "");

  if (numbersOnly) {
    return Number(numbersOnly.slice(0, 6)) || 1001;
  }

  let hash = 0;
  for (let i = 0; i < memberId.length; i++) {
    hash = (hash * 31 + memberId.charCodeAt(i)) % 1000000;
  }

  return hash || 1001;
}

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!window.$memberstackDom) {
        await new Promise((r) => setTimeout(r, 600));
      }

      if (!window.$memberstackDom) {
        if (!cancelled) setLoading(false);
        return;
      }

      const { data } = await window.$memberstackDom.getCurrentMember();

      if (cancelled) return;

      if (!data) {
        setMember(null);
        setLoading(false);
        await window.$memberstackDom.openModal("LOGIN");
        return;
      }

      setMember(data);
      setLoading(false);
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  const proofModeProfileId = useMemo(() => {
    if (!member?.id) return "—";
    return generateProfileId(memberIdToProfileNumber(member.id));
  }, [member]);

  const totalCategories = proofModeCategories.length;
  const totalSkills = proofModeSkills.length;

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
              <div>
                <span className="font-medium">ProofMode Profile ID:</span>{" "}
                {proofModeProfileId}
              </div>
              <div>
                <span className="font-medium">Launch Categories:</span>{" "}
                {totalCategories}
              </div>
              <div>
                <span className="font-medium">Launch Skills:</span>{" "}
                {totalSkills}
              </div>
              <div>
                <span className="font-medium">TrustTag Passing Score:</span>{" "}
                {trustTagRules.passingScorePercent}%
              </div>
              <div>
                <span className="font-medium">Minimum Evidence Uploads:</span>{" "}
                {trustTagRules.minimumEvidenceUploads}
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
