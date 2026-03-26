import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const email = (req.query.email as string | undefined)?.trim();

    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: "Supabase not configured" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("trusttags")
      .select("*")
      .ilike("email", email)
      .order("date_issued", { ascending: false });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Database error" });
    }

    const trustTags = (data || []).map((tag) => ({
      trustTagId: tag.tag_id,
      fullName: tag.full_name,
      skillName: tag.skill_name,
      dateIssued: tag.date_issued,
      status: tag.status,
    }));

    return res.status(200).json({ trustTags });
  } catch (error) {
    console.error("Supabase fetch error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
