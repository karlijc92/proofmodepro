import { proofModeSampleRecords } from "@/data/proofmodeRecords";

export function findTrustTagById(trustTagId: string) {
  return proofModeSampleRecords.find(
    (record) => record.trustTagId.toLowerCase() === trustTagId.toLowerCase()
  );
}

export function getVerifiedTrustTags() {
  return proofModeSampleRecords.filter(
    (record) => record.status === "verified"
  );
}

export function getTrustTagsForProfile(profileId: string) {
  return proofModeSampleRecords.filter(
    (record) => record.profileId === profileId
  );
}

export function trustTagExists(trustTagId: string) {
  return proofModeSampleRecords.some(
    (record) => record.trustTagId.toLowerCase() === trustTagId.toLowerCase()
  );
}
