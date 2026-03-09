export const proofModeCategories = [
  {
    key: "skilled_trades",
    label: "Skilled Trades",
  },
  {
    key: "automotive",
    label: "Automotive",
  },
  {
    key: "it_tech",
    label: "IT / Tech",
  },
  {
    key: "digital_freelance",
    label: "Digital Freelance",
  },
  {
    key: "finance_bookkeeping",
    label: "Finance & Bookkeeping",
  },
];

export const proofModeSkills = [
  // Skilled Trades
  { name: "Carpentry", code: "CARP", category: "skilled_trades" },
  { name: "Welding", code: "WELD", category: "skilled_trades" },
  { name: "Plumbing Repair", code: "PLMB", category: "skilled_trades" },
  { name: "Electrical Fixture Installation", code: "ELEC", category: "skilled_trades" },
  { name: "Concrete Work", code: "CONC", category: "skilled_trades" },

  // Automotive
  { name: "Oil Change & Basic Maintenance", code: "OILM", category: "automotive" },
  { name: "Brake Replacement", code: "BRKE", category: "automotive" },
  { name: "Tire Installation & Balancing", code: "TIRE", category: "automotive" },
  { name: "Engine Diagnostics", code: "ENGD", category: "automotive" },
  { name: "Battery Replacement", code: "BATT", category: "automotive" },

  // IT / Tech
  { name: "Computer Hardware Repair", code: "HARD", category: "it_tech" },
  { name: "Laptop Repair", code: "LAPR", category: "it_tech" },
  { name: "Network Setup", code: "NETW", category: "it_tech" },
  { name: "WiFi Installation", code: "WIFI", category: "it_tech" },
  { name: "Software Troubleshooting", code: "SOFT", category: "it_tech" },

  // Digital Freelance
  { name: "Website Setup", code: "WEBB", category: "digital_freelance" },
  { name: "Graphic Design", code: "GRPH", category: "digital_freelance" },
  { name: "Video Editing", code: "VIDE", category: "digital_freelance" },
  { name: "Social Media Management", code: "SOCM", category: "digital_freelance" },
  { name: "Google Analytics Setup", code: "ANLY", category: "digital_freelance" },

  // Finance & Bookkeeping
  { name: "Bookkeeping", code: "BOOK", category: "finance_bookkeeping" },
  { name: "QuickBooks Management", code: "QKBS", category: "finance_bookkeeping" },
  { name: "Payroll Processing", code: "PAYR", category: "finance_bookkeeping" },
  { name: "Invoice Management", code: "INVC", category: "finance_bookkeeping" },
  { name: "Basic Accounting Principles", code: "ACCT", category: "finance_bookkeeping" },
];

export const trustTagRules = {
  questionCount: 20,
  passingScorePercent: 75,
  minimumEvidenceUploads: 2,
  validMonths: 12,
};

export const trustTagLevels = {
  verified: { min: 75, max: 89 },
  advanced: { min: 90, max: 94 },
  expert: { min: 95, max: 100 },
};

export function generateProfileId(number: number) {
  return `PM-${number}`;
}

export function generateTrustTagId(skillCode: string, profileId: string, sequence: number) {
  const cleanProfile = profileId.replace("-", "");
  const seq = sequence.toString().padStart(2, "0");
  return `TT-${skillCode}-${cleanProfile}-${seq}`;
}
