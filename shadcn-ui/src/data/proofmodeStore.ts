import { ProofModeTrustTagRecord } from "@/data/proofmodeRecords";

const STORAGE_KEY = "proofmode_trusttags";

function loadStore(): ProofModeTrustTagRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStore(store: ProofModeTrustTagRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function addTrustTagRecord(record: ProofModeTrustTagRecord) {
  const store = loadStore();
  store.push(record);
  saveStore(store);
  return record;
}

export function getAllTrustTags() {
  return loadStore();
}

export function getTrustTagsForProfile(profileId: string) {
  return loadStore().filter((record) => record.profileId === profileId);
}

export function getTrustTagById(trustTagId: string) {
  return loadStore().find((record) => record.trustTagId === trustTagId);
}

export function clearTrustTagStore() {
  localStorage.removeItem(STORAGE_KEY);
}
