import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TrustTagCertificate from "@/components/TrustTagCertificate";
import { getTrustTagsByEmail } from "@/lib/airtable";

declare global {
  interface Window {
    MemberStack?: any;
  }
}

interface TrustTag {
  tagId: string;
  certificateType: string;
  dateIssued: string;
  fullName: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [loadingMember, setLoadingMember] = useState(true);
  const [trustTags, setTrustTags] = useState<TrustTag[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const certificateRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 🔐 Load real Memberstack session
  useEffect(() => {
    let cancelled = false;

    async function loadMember() {
      try {
        const ms = window.MemberStack;
        if (!ms) throw new Error("Memberstack not loaded");

        const result = await ms.getCurrentMember();
        const member = result?.data;

        if (!member?.email) {
          navigate("/login", { replace: true });
          return;
        }

        if (!cancelled) {
          setEmail(member.email);
        }
      } catch {
        navigate("/login", { replace: true });
      } finally {
        if (!cancelled) setLoadingMember(false);
      }
    }

    loadMember();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // 📄 Load TrustTags once email is confirmed
  useEffect(() => {
    if (!email) return;

    async function loadTrustTags() {
      try {
        const records = await getTrustTagsByEmail(email);
        setTrustTags(records || []);
      } catch (err) {
        console.error("Failed to load TrustTags", err);
      } finally {
        setIsLoadingTags(false);
      }
    }

    loadTrustTags();
  }, [email]);

  const handleLogout = async () => {
    await window.MemberStack.logout();
    navigate("/");
  };

  const downloadCertificate = async (tag: TrustTag) => {
    setIsDownloading(tag.tagId);
    try {
      const element = certificateRefs.current[tag.tagId];
      if (!element) return;

      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().from(element).save(`TrustTag-${tag.tagId}.pdf`);
    } catch (error) {
      console.error("Certificate download failed", error);
    } finally {
      setIsDownloading(null);
    }
  };

  if (loadingMember) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-6 py-12">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">My Profile</CardTitle>
            <CardDescription>Logged in as {email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogout} variant="outline">
              Log Out
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-8 mt-10 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800">My TrustTags</h2>

          {isLoadingTags ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2 text-lg">Loading TrustTags...</span>
            </div>
          ) : trustTags.length > 0 ? (
            trustTags.map((tag) => (
              <Card key={tag.tagId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                  <div>
                    <CardTitle>{tag.certificateType}</CardTitle>
                    <CardDescription>
                      Issued: {tag.dateIssued} | ID: {tag.tagId}
                    </CardDescription>
                  </div>
                </div>

                <Button
                  onClick={() => downloadCertificate(tag)}
                  disabled={isDownloading === tag.tagId}
                >
                  {isDownloading === tag.tagId
                    ? "Downloading..."
                    : "Download"}
                </Button>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-dashed">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">No TrustTags yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Once your verification is approved, it will appear here.
              </p>
            </div>
          )}

          {/* Hidden certificate render targets */}
          <div className="absolute -left-[9999px] -top-[9999px]">
            {trustTags.map((tag) => (
              <div key={tag.tagId} style={{ width: "1123px" }}>
                <TrustTagCertificate
                  ref={(el) =>
                    (certificateRefs.current[tag.tagId] = el)
                  }
                  fullName={tag.fullName}
                  certificateType={tag.certificateType}
                  tagId={tag.tagId}
                  dateIssued={tag.dateIssued}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
