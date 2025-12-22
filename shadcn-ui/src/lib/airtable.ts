export type TrustTag = {
  id: string;
  fullName: string;
  certificateType: string;
  tagId: string;
  dateIssued: string;
  status?: string;
};

export async function getTrustTagsByEmail(email: string): Promise<TrustTag[]> {
  const safeEmail = email.trim();
  if (!safeEmail) return [];

  const res = await fetch(
    `/api/trusttags-by-email?email=${encodeURIComponent(safeEmail)}`
  );

  if (!res.ok) {
    console.error("Failed to fetch TrustTags:", res.status);
    return [];
  }

  const data = await res.json();
  return (data?.trustTags as TrustTag[]) || [];
}

// Optional placeholder so imports elsewhere don't break (we'll wire this next)
export async function getTrustTagById(_tagId: string) {
  throw new Error("getTrustTagById not wired yet. We'll add server API next.");
}
