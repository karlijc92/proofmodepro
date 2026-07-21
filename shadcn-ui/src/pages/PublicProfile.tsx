import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  getPublicProfileBySlug,
  ProofModePublicProfile,
} from "@/data/proofmodeProfileStore";

export default function PublicProfile() {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<ProofModePublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    getPublicProfileBySlug(slug)
      .then(function (data) {
        if (!data) {
          setNotFound(true);
        } else {
          setProfile(data);
        }
      })
      .catch(function (error) {
        console.error("Failed to load public profile:", error);
        setNotFound(true);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-10">
        {loading && <p className="text-sm text-muted-foreground">Loading profile...</p>}

        {!loading && notFound && (
          <div className="rounded-2xl border bg-card p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">Profile Not Found</h1>
            <p className="mt-2 text-muted-foreground">This profile does not exist or is not currently public.</p>
          </div>
        )}

        {!loading && profile && (
          <div className="mx-auto max-w-3xl">
            <section className="rounded-2xl border bg-card p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-foreground">{profile.fullName || "ProofMode User"}</h1>

              {profile.headline && <p className="mt-2 text-lg font-medium text-primary">{profile.headline}</p>}

              {profile.bio && <p className="mt-4 text-muted-foreground">{profile.bio}</p>}

              {profile.resumeSummary && (
                <div className="mt-6 border-t pt-4">
                  <h2 className="font-semibold text-foreground">Summary</h2>
                  <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{profile.resumeSummary}</p>
                </div>
              )}
            </section>

            <section className="mt-6 rounded-2xl border bg-card p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">Verified TrustTags</h2>

              {profile.trustTags.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">No verified TrustTags yet.</p>
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {profile.trustTags.map(function (tag) {
                    return (
                      <div key={tag.verificationCode} className="rounded-xl border bg-background p-4 text-sm">
                        <p className="font-semibold text-foreground">{tag.skillName}</p>
                        <p className="mt-1 text-muted-foreground">Score: {tag.score}%</p>
                        <p className="mt-1 text-muted-foreground">Issued: {new Date(tag.issuedAt).toLocaleDateString()}</p>
                        <a href={tag.verificationUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-primary underline">Verify this TrustTag</a>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Powered by <Link to="/" className="font-medium text-primary underline">ProofMode</Link>
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
