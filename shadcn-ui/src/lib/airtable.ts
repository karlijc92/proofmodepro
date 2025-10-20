import Airtable from 'airtable';

// Ensure your .env file has VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID
const airtable = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID as string);

const trustTagsTable = airtable('TrustTags');

export const getTrustTagById = async (tagId: string) => {
  const records = await trustTagsTable
    .select({
      maxRecords: 1,
      filterByFormula: `{Tag ID} = '${tagId}'`,
    })
    .firstPage();

  if (records.length > 0) {
    const record = records[0];
    return {
      id: record.id,
      fullName: record.fields['Full Name'],
      certificateType: record.fields['Certificate Type'],
      status: record.fields['Status'],
      dateIssued: record.fields['Date Issued'],
    };
  }
  return null;
};

export const getTrustTagsByEmail = async (email: string) => {
  const records = await trustTagsTable
    .select({
      filterByFormula: `LOWER({Email}) = LOWER('${email}')`,
      sort: [{ field: 'Date Issued', direction: 'desc' }],
    })
    .all();

  return records.map((record) => ({
    id: record.id,
    fullName: record.fields['Full Name'] as string,
    certificateType: record.fields['Certificate Type'] as string,
    tagId: record.fields['Tag ID'] as string,
    dateIssued: record.fields['Date Issued'] as string,
  }));
};