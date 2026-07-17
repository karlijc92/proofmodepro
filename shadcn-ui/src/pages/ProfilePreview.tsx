import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getAllTrustTagsForCurrentUser,
  SupabaseTrustTagRow,
} from "@/data/proofmodeStore";

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

function formatDate(value?: string | null) {
  if (!value) return "Not set yet";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not set yet";
  }

  return date.toLocaleDateString();
}

export default function ProfilePreview() {
  const [trustTags, setTrustTags] = useState<SupabaseTrustTagRow[]>([]);
  const [storageChecked, setStorageChecked] = useState(false);

  useEffect(() => {
    getAllTrustTagsForCurrentUser()
      .then((records) => {
        setTrustTags(records);
        setStorageChecked(true);
      })
      .catch((error) => {
        console.error("Failed to load TrustTags:", error);
        setTrustTags([]);
        setStorageChecked(true);
      });
  }, []);

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
                      key={tag.id}
                      className="border rounded-md p-4 bg-white"
                    >
                      <p className="font-semibold">{tag.skill_name}</p>

                      <p className="text-sm text-gray-600">
                        Verification Code: {tag.verification_code}
                      </p>

                      <p className="text-sm text-gray-600">
                        Score: {tag.score}%
                      </p>

                      <p className="text-sm text-gray-600">
                        Issued: {formatDate(tag.issued_at)}
                      </p>

                      <p className="text-sm text-gray-600">
                        Expires: {formatDate(tag.expires_at)}
                      </p>

                      <p className="text-sm text-gray-500">
                        Status: {formatStatus(tag.status)}
                      </p>
                    </div>
                  ))}
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
