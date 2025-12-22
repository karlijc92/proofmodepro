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
      return res.status(500).json({ error: "Server env vars not set" });
    }

    const base = new Airtable({ apiKey }).base(baseId);
    const trustTagsTable = base("TrustTags");

    const records = await trustTagsTable
      .select({
        filterByFormula: `LOWER({Email}) = LOWER('${email}')`,
        sort: [{ field: "Date Issued", direction: "desc" }],
      })
      .all();

    const results = records.map((record) => ({
      id: record.id,
      fullName: record.fields["Full Name"] as string,
      certificateType: record.fields["Certificate Type"] as string,
      tagId: record.fields["Tag ID"] as string,
      dateIssued: record.fields["Date Issued"] as string,
      status: record.fields["Status"] as string,
    }));

    return res.status(200).json({ trustTags: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
