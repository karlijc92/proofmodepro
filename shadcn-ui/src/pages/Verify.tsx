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
import { Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import { getTrustTagById } from "@/data/proofmodeStore";

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const tagId = searchParams.get("tagId");

  const [tagData, setTagData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tagId) {
      setLoading(false);
      return;
    }

    const record = getTrustTagById(tagId);
    setTagData(record || null);
    setLoading(false);
  }, [tagId]);

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return "success";
      case "rejected":
        return "destructive";
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
                Verify TrustTag ID: <strong>{tagId || "N/A"}</strong>
              </CardDescription>
            </CardHeader>

            <CardContent>
              {loading && (
                <div className="flex items-center justify-center p-10">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              )}

              {!tagId && !loading && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>No Tag ID Provided</AlertTitle>
                  <AlertDescription>
                    Add ?tagId=YOUR-ID to the URL
                  </AlertDescription>
                </Alert>
              )}

              {tagId && !tagData && !loading && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Not Found</AlertTitle>
                  <AlertDescription>
                    This TrustTag does not exist
                  </AlertDescription>
                </Alert>
              )}

              {tagData && !loading && (
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-gray-500">Skill:</span>{" "}
                    <span className="font-semibold">{tagData.skillName}</span>
                  </div>

                  <div>
                    <span className="text-gray-500">TrustTag ID:</span>{" "}
                    {tagData.trustTagId}
                  </div>

                  <div>
                    <span className="text-gray-500">Score:</span>{" "}
                    {tagData.assessmentScorePercent}%
                  </div>

                  <div>
                    <span className="text-gray-500">Evidence Count:</span>{" "}
                    {tagData.evidenceCount}
                  </div>

                  <div>
                    <span className="text-gray-500">Status:</span>{" "}
                    <Badge variant={getStatusVariant(tagData.status)}>
                      {tagData.status}
                    </Badge>
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
