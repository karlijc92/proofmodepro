import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllTrustTags, clearTrustTagStore } from "@/data/proofmodeStore";

function formatStatus(status: string) {
  switch (status) {
    case "pending_review":
      return "Pending Review";
    case "verified":
      return "Verified";
    case "needs_more_evidence":
      return "Needs More Evidence";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

export default function ProfilePreview() {
  const trustTags = getAllTrustTags();

  const handleClearPreviewData = () => {
    clearTrustTagStore();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your TrustTags</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {trustTags.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No TrustTags found yet. Complete an assessment to create one.
                </p>
              ) : (
                <>
                  {trustTags.map((tag) => (
                    <div
                      key={tag.trustTagId}
                      className="border rounded-md p-4 bg-white"
                    >
                      <p className="font-semibold">{tag.skillName}</p>
                      <p className="text-sm text-gray-600">
                        TrustTag ID: {tag.trustTagId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Score: {tag.assessmentScorePercent}%
                      </p>
                      <p className="text-sm text-gray-600">
                        Evidence Items: {tag.evidenceCount}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: {formatStatus(tag.status)}
                      </p>
                    </div>
                  ))}

                  <div className="pt-2">
                    <Button variant="outline" onClick={handleClearPreviewData}>
                      Clear Preview Data
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
