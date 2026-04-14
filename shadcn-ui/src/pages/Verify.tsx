import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ShieldCheck, ShieldX, BadgeCheck } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getTrustTagById } from "@/data/proofmodeStore";

type VerificationState = "idle" | "found" | "not_found";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const initialQueryTagId = searchParams.get("tagId")?.trim() ?? "";

  const [trustTagId, setTrustTagId] = useState(initialQueryTagId);
  const [searchedId, setSearchedId] = useState("");
  const [verificationState, setVerificationState] =
    useState<VerificationState>("idle");

  const normalizedInput = useMemo(() => trustTagId.trim(), [trustTagId]);

  const verifiedRecord = useMemo(() => {
    if (!searchedId) return null;
    return getTrustTagById(searchedId);
  }, [searchedId]);

  useEffect(() => {
    if (!initialQueryTagId) return;

    setTrustTagId(initialQueryTagId);
    setSearchedId(initialQueryTagId);

    const record = getTrustTagById(initialQueryTagId);
    setVerificationState(record ? "found" : "not_found");
  }, [initialQueryTagId]);

  const handleVerify = () => {
    const cleanedId = normalizedInput;

    if (!cleanedId) {
      setSearchedId("");
      setVerificationState("idle");
      return;
    }

    const record = getTrustTagById(cleanedId);

    setSearchedId(cleanedId);
    setVerificationState(record ? "found" : "not_found");
  };

  const renderResult = () => {
    if (verificationState === "idle") {
      return (
        <Card className="border-border/60 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="font-medium">Enter a TrustTag ID to verify it.</p>
                <p className="text-sm text-muted-foreground">
                  You can paste a TrustTag ID directly or open this page using a
                  verification link with a tag ID already included.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (verificationState === "not_found" || !verifiedRecord) {
      return (
        <Card className="border-destructive/30 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <ShieldX className="mt-0.5 h-5 w-5 text-destructive" />
              <div className="space-y-1">
                <p className="font-medium">TrustTag not found</p>
                <p className="text-sm text-muted-foreground">
                  We could not find a TrustTag matching{" "}
                  <span className="font-medium text-foreground">
                    {searchedId}
                  </span>
                  . Check the ID and try again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="border-primary/20 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">TrustTag Verified</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                TrustTag ID
              </p>
              <p className="mt-1 break-all font-medium">
                {verifiedRecord.trustTagId}
              </p>
            </div>

            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Skill
              </p>
              <p className="mt-1 font-medium">{verifiedRecord.skillName}</p>
            </div>

            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Status
              </p>
              <p className="mt-1 font-medium capitalize">
                {verifiedRecord.status}
              </p>
            </div>

            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Assessment Score
              </p>
              <p className="mt-1 font-medium">
                {verifiedRecord.assessmentScorePercent}%
              </p>
            </div>

            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Evidence Count
              </p>
              <p className="mt-1 font-medium">{verifiedRecord.evidenceCount}</p>
            </div>

            <div className="rounded-lg border bg-background p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Expires
              </p>
              <p className="mt-1 font-medium">
                {new Date(verifiedRecord.expiresAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Profile ID
            </p>
            <p className="mt-1 break-all text-sm font-medium">
              {verifiedRecord.profileId}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Verify a TrustTag
            </h1>
            <p className="text-lg text-muted-foreground">
              Confirm whether a TrustTag has been issued and saved in the current
              ProofMode verification system.
            </p>
          </div>

          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={trustTagId}
                    onChange={(event) => setTrustTagId(event.target.value)}
                    placeholder="Enter TrustTag ID"
                    className="pl-9"
                  />
                </div>

                <Button onClick={handleVerify} className="sm:min-w-32">
                  Verify
                </Button>
              </div>
            </CardContent>
          </Card>

          {renderResult()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Verify;
