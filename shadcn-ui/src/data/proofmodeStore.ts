import { ProofModeTrustTagRecord } from "@/data/proofmodeRecords";

let trustTagStore: ProofModeTrustTagRecord[] = [];

export function addTrustTagRecord(record: ProofModeTrustTagRecord) {
  trustTagStore.push(record);
  return record;
}

export function getAllTrustTags() {
  return trustTagStore;
}

export function getTrustTagsForProfile(profileId: string) {
  return trustTagStore.filter((record) => record.profileId === profileId);
}

export function getTrustTagById(trustTagId: string) {
  return trustTagStore.find((record) => record.trustTagId === trustTagId);
}

export function clearTrustTagStore() {
  trustTagStore = [];
}
