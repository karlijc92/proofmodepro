import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllTrustTags, clearTrustTagStore } from "@/data/proofmodeStore";
import { ProofModeTrustTagRecord } from "@/data/proofmodeRecords";

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

function formatDate(value?: string) {
  if (!value) return "Not set yet";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not set yet";
  }

  return date.toLocaleDateString();
}

export default function ProfilePreview() {
  const [trustTags, setTrustTags] = useState<ProofModeTrustTagRecord[]>([]);
  const [storageChecked, setStorageChecked] = useState(false);

  useEffect(() => {
    const records = getAllTrustTags();
    setTrustTags(records);
    setStorageChecked(true);
  }, []);

  const handleClearPreviewData = () => {
    clearTrustTagStore();
    setTrustTags([]);
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
              {!storageChecked ? (
                <p className="text-sm text-gray-500">Loading TrustTags...</p>
              ) : trustTags.length === 0 ? (
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

                      {tag.evidenceItems && tag.evidenceItems.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">
                            Evidence Files:
                          </p>

                          <ul className="mt-1 space-y-1">
                            {tag.evidenceItems.map((item) => (
                              <li
                                key={item.id}
                                className="text-sm text-gray-600"
                              >
                                {item.name} — {item.type}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <p className="text-sm text-gray-600 mt-2">
                        Profile ID: {tag.profileId}
                      </p>

                      <p className="text-sm text-gray-600">
                        Issued: {formatDate(tag.issuedAt)}
                      </p>

                      <p className="text-sm text-gray-600">
                        Expires: {formatDate(tag.expiresAt)}
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
