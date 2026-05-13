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

import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [createdCount, setCreatedCount] = useState(0);

  useEffect(() => {
    const processPendingAssessment = async () => {
      try {
        const pending = getPendingAssessment();

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

          const result = processProofModeSubmission({
            profileId: "",
            skillCode,
            answers: answerMap,
            evidenceItems,
          });

          if (result.record) {
            createdRecords += 1;
          }
        }

        clearPendingAssessment();

        setCreatedCount(createdRecords);
        setCompleted(true);
      } catch (error) {
        console.error("Payment success processing error:", error);
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
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />

              <CardTitle className="text-3xl mt-4">
                {processing
                  ? "Finalizing Your TrustTag"
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

              {!processing && completed && (
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

              {!processing && !completed && (
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
