import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  getPendingAssessment,
  clearPendingAssessment,
} from "@/data/proofmodeStore";

import { processProofModeSubmission } from "@/data/proofmodeProcessor";

import { ProofModeAnswerMap } from "@/data/proofmodeScoring";

import { ProofModeEvidenceItem } from "@/data/proofmodeRecords";

import { CheckCircle, AlertCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [createdCount, setCreatedCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const processPendingAssessment = async () => {
      try {
        const pending = await getPendingAssessment();

        if (!pending || !pending.passed) {
          setProcessing(false);
          return;
        }

        let createdRecords = 0;

        for (const skillCode of pending.skillCodes) {
          const answerMap: ProofModeAnswerMap = {};

          pending.answers.forEach((answer) => {
            answerMap[answer.questionId] = answer.answerId;
          });

          const evidenceItems: ProofModeEvidenceItem[] =
            pending.evidenceItems.map((item) => ({
              id: item.id,
              name: item.name,
              uploadedAt: item.uploadedAt,
              type:
                item.typeLabel.toLowerCase() === "image"
                  ? "image"
                  : item.typeLabel.toLowerCase() === "video"
                  ? "video"
                  : "document",
            }));

          const result = await processProofModeSubmission({
            profileId: "",
            skillCode,
            answers: answerMap,
            evidenceItems,
          });

          if (result.record) {
            createdRecords += 1;
          }
        }

        await clearPendingAssessment();

        setCreatedCount(createdRecords);
        setCompleted(true);
      } catch (error) {
        console.error("Payment success processing error:", error);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while finalizing your TrustTag."
        );
      } finally {
        setProcessing(false);
      }
    };

    processPendingAssessment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <Card className="text-center">
            <CardHeader>
              {errorMessage ? (
                <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
              ) : (
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              )}

              <CardTitle className="text-3xl mt-4">
                {processing
                  ? "Finalizing Your TrustTag"
                  : errorMessage
                  ? "Something Went Wrong"
                  : completed
                  ? "TrustTag Created Successfully"
                  : "No Pending Assessment Found"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {processing && (
                <p className="text-gray-600">
                  Please wait while we finalize your verified credential.
                </p>
              )}

              {!processing && errorMessage && (
                <>
                  <p className="text-gray-600">{errorMessage}</p>
                  <p className="text-sm text-gray-500">
                    If you were just charged, contact support at
                    proofmodepro365@gmail.com so we can manually issue your
                    TrustTag.
                  </p>
                  <Button className="w-full" onClick={() => navigate("/contact")}>
                    Contact Support
                  </Button>
                </>
              )}

              {!processing && !errorMessage && completed && (
                <>
                  <p className="text-lg text-gray-700">
                    Your payment was successful and your TrustTag has been created.
                  </p>

                  <p className="text-sm text-gray-500">
                    Generated TrustTags: {createdCount}
                  </p>

                  <Button
                    className="w-full"
                    onClick={() => navigate("/profile-preview")}
                  >
                    View Your Profile
                  </Button>
                </>
              )}

              {!processing && !errorMessage && !completed && (
                <>
                  <p className="text-gray-600">
                    We could not find a pending assessment to process.
                  </p>

                  <Button
                    className="w-full"
                    onClick={() => navigate("/create-trust-tag")}
                  >
                    Return to Assessments
                  </Button>
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
