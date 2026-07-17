import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  getAllTrustTagsForCurrentUser,
  SupabaseTrustTagRow,
} from "@/data/proofmodeStore";

type ProfileTab =
  | "overview"
  | "trusttags"
  | "job-tools"
  | "student"
  | "business"
  | "organization"
  | "subscription";

const tabs: { id: ProfileTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "trusttags", label: "TrustTags" },
  { id: "job-tools", label: "Job Tools" },
  { id: "student", label: "Student" },
  { id: "business", label: "Business" },
  { id: "organization", label: "Organization" },
  { id: "subscription", label: "Subscription" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [trustTags, setTrustTags] = useState<SupabaseTrustTagRow[]>([]);

  useEffect(() => {
    getAllTrustTagsForCurrentUser()
      .then(setTrustTags)
      .catch((error) => {
        console.error("Failed to load TrustTags:", error);
        setTrustTags([]);
      });
  }, []);

  const trustTagCount = trustTags.length;
  const verifiedSkillCount = new Set(
    trustTags.map((record) => record.skill_name).filter(Boolean)
  ).size;
