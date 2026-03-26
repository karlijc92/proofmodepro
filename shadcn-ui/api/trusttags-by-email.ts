import type { VercelRequest, VercelResponse } from "@vercel/node";
import Airtable from "airtable";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const email = (req.query.email as string | undefined)?.trim();

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      return res.status(500).json({ error: "Server not configured" });
    }

    const base = new Airtable({ apiKey }).base(baseId);

    const records = await base("TrustTags")
      .select({
        filterByFormula: `LOWER({Email}) = LOWER("${email}")`,
        sort: [{ field: "Date Issued", direction: "desc" }],
      })
      .all();

    const trustTags = records.map((record) => ({
      trustTagId: record.get("Tag ID") as string,
      fullName: record.get("Full Name") as string,
      skillName: record.get("Certificate Type") as string,
      dateIssued: record.get("Date Issued") as string,
      status: record.get("Status") as string,
    }));

    return res.status(200).json({ trustTags });
  } catch (error) {
    console.error("TrustTag fetch error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
