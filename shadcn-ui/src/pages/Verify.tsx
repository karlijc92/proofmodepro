import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldCheck, AlertTriangle, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import { getTrustTagById } from "@/data/proofmodeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTagId = searchParams.get("tagId") || "";

  const [tagIdInput, setTagIdInput] = useState(initialTagId);
  const [tagData, setTagData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const runVerification = (rawTagId: string) => {
    const cleanTagId = rawTagId.trim();

    if (!cleanTagId) {
      setTagData(null);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    const record = getTrustTagById(cleanTagId);

    setTagData(record || null);
    setLoading(false);
  };

  useEffect(() => {
    if (initialTagId) {
      runVerification(initialTagId);
    }
  }, [initialTagId]);

  const handleVerify = () => {
    const cleanTagId = tagIdInput.trim();

    if (!cleanTagId) {
      setTagData(null);
      setSearched(false);
      setSearchParams({});
      return;
    }

    setSearchParams({ tagId: cleanTagId });
    runVerification(cleanTagId);
  };

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return "success";
      case "rejected":
        return "destructive";
      case "needs_more_evidence":
      case "pending_review":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <BackButton />

          <Card className="mt-4 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <ShieldCheck className="mr-3 text-blue-600 h-8 w-8" />
                TrustTag Verification
              </CardTitle>
              <CardDescription>
                Verify a worker’s skill certification using their TrustTag ID.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              
              {/* INPUT */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Paste or enter TrustTag ID (e.g. TT-12345)"
                  value={tagIdInput}
                  onChange={(e) => setTagIdInput(e.target.value)}
                />
                <Button onClick={handleVerify}>
                  <Search className="w-4 h-4 mr-2" />
                  Verify
                </Button>
              </div>

              {/* HELP TEXT */}
              {!searched && (
                <div className="text-sm text-gray-500 text-center">
                  Enter a TrustTag ID provided by a worker to confirm their verified skill.
                </div>
              )}

              {/* LOADING */}
              {loading && (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              )}

              {/* NOT FOUND */}
              {!loading && searched && !tagData && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>TrustTag not found</AlertTitle>
                  <AlertDescription>
                    No verified record exists for this TrustTag ID. Double-check the ID or request a valid tag.
                  </AlertDescription>
                </Alert>
              )}

              {/* SUCCESS */}
              {!loading && tagData && (
                <div className="space-y-4 text-sm border rounded-lg p-4 bg-white">
                  
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">
                      {tagData.skillName}
                    </div>
                    <Badge variant={getStatusVariant(tagData.status)}>
                      {tagData.status}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-gray-500">TrustTag ID:</span>{" "}
                    {tagData.trustTagId}
                  </div>

                  <div>
                    <span className="text-gray-500">Assessment Score:</span>{" "}
                    {tagData.assessmentScorePercent}%
                  </div>

                  <div>
                    <span className="text-gray-500">Evidence Submitted:</span>{" "}
                    {tagData.evidenceCount} items
                  </div>

                  <div className="text-xs text-gray-400 pt-2 border-t">
                    Verified through ProofMode assessment and evidence validation.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
