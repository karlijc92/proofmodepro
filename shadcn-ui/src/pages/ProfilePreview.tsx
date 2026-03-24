import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAllTrustTags } from "@/data/proofmodeStore";

export default function ProfilePreview() {
  const trustTags = getAllTrustTags();

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
                trustTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="border rounded-md p-4 bg-white"
                  >
                    <p className="font-semibold">{tag.skillName}</p>
                    <p className="text-sm text-gray-600">
                      Score: {tag.scorePercent}%
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {tag.status}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
