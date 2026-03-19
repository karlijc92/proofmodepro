import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Image as ImageIcon, Video, ArrowRight, SkipForward } from "lucide-react";

type UploadedItem = {
  id: string;
  name: string;
  typeLabel: string;
  sizeLabel: string;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getTypeLabel(file: File) {
  if (file.type.startsWith("image/")) return "Image";
  if (file.type.startsWith("video/")) return "Video";
  return "Document";
}

function getFileIcon(typeLabel: string) {
  if (typeLabel === "Image") return <ImageIcon className="h-4 w-4" />;
  if (typeLabel === "Video") return <Video className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

export default function ProofUploadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [uploadedItems, setUploadedItems] = useState<UploadedItem[]>([]);

  const selectedSkillCodes = useMemo(() => {
    return (id || "")
      .split(",")
      .map((code) => code.trim())
      .filter(Boolean);
  }, [id]);

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const mapped = files.map((file, index) => ({
      id: `${file.name}-${file.size}-${index}-${Date.now()}`,
      name: file.name,
      typeLabel: getTypeLabel(file),
      sizeLabel: formatFileSize(file.size),
    }));

    setUploadedItems((prev) => [...prev, ...mapped]);
  };

  const handleRemoveItem = (itemId: string) => {
    setUploadedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleContinueToAssessment = () => {
    navigate(`/assessment/${id}`, {
      state: {
        uploadedEvidence: uploadedItems,
      },
    });
  };

  const handleSkipForNow = () => {
    navigate(`/assessment/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Upload Proof of Work (Optional)</CardTitle>
              <CardDescription>
                Add photos, documents, videos, or work samples before starting your assessment.
                You can also skip this step for now.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="h-10 w-10 mb-3 text-gray-500" />
                  <h2 className="text-lg font-semibold">Upload work samples</h2>
                  <p className="text-sm text-gray-600 mt-2 max-w-xl">
                    This can include project photos, finished work, certificates, documents,
                    videos, screenshots, or other proof related to your selected skill.
                  </p>

                  <div className="mt-4">
                    <Label
                      htmlFor="proof-upload-input"
                      className="inline-flex cursor-pointer items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                    >
                      Choose Files
                    </Label>
                    <input
                      id="proof-upload-input"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.mp4,.mov,.avi"
                      className="hidden"
                      onChange={handleFilesSelected}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white border p-4">
                <h3 className="font-semibold mb-2">Selected skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSkillCodes.length > 0 ? (
                    selectedSkillCodes.map((code) => (
                      <span
                        key={code}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                      >
                        {code}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No skill selected</span>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-white border p-4">
                <h3 className="font-semibold mb-3">Uploaded items</h3>

                {uploadedItems.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No files uploaded yet. This step is optional, so you can skip it if needed.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {uploadedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-md border p-3"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(item.typeLabel)}
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.typeLabel} • {item.sizeLabel}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
              <Button variant="outline" onClick={handleSkipForNow} className="w-full sm:w-auto">
                <SkipForward className="mr-2 h-4 w-4" />
                Skip for Now
              </Button>

              <Button onClick={handleContinueToAssessment} className="w-full sm:w-auto">
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue to Assessment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
