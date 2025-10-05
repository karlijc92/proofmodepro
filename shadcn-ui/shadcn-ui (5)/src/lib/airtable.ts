// Airtable integration for TrustTag platform
// Note: This requires VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID environment variables

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.warn('Airtable API key or Base ID not configured. Set VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID environment variables.');
}

interface TrustTagPurchase {
  userEmail: string;
  packageType: string;
  numberOfTags: number;
  totalAmount: number | string;
  selectedSkills: string;
}

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

class AirtableService {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;
    this.headers = {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    };
  }

  async createTrustTagPurchase(data: TrustTagPurchase): Promise<{ success: boolean; record?: AirtableRecord; error?: string }> {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return {
        success: false,
        error: 'Airtable not configured. Please set environment variables.'
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/TrustTag%20Purchases`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          fields: {
            'User Email': data.userEmail,
            'Package Type': data.packageType,
            'Number of Tags': data.numberOfTags,
            'Total Amount': typeof data.totalAmount === 'string' ? data.totalAmount : data.totalAmount,
            'Selected Skills': data.selectedSkills,
            'Purchase Date': new Date().toISOString(),
            'Status': 'Pending'
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        record: result
      };
    } catch (error) {
      console.error('Error creating TrustTag purchase:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getTrustTagPurchases(userEmail?: string): Promise<{ success: boolean; records?: AirtableRecord[]; error?: string }> {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return {
        success: false,
        error: 'Airtable not configured. Please set environment variables.'
      };
    }

    try {
      let url = `${this.baseUrl}/TrustTag%20Purchases`;
      
      if (userEmail) {
        const filterFormula = `{User Email} = "${userEmail}"`;
        url += `?filterByFormula=${encodeURIComponent(filterFormula)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        records: result.records
      };
    } catch (error) {
      console.error('Error fetching TrustTag purchases:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async updateTrustTagPurchase(recordId: string, updates: Partial<TrustTagPurchase>): Promise<{ success: boolean; record?: AirtableRecord; error?: string }> {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return {
        success: false,
        error: 'Airtable not configured. Please set environment variables.'
      };
    }

    try {
      const fields: Record<string, any> = {};
      
      if (updates.userEmail) fields['User Email'] = updates.userEmail;
      if (updates.packageType) fields['Package Type'] = updates.packageType;
      if (updates.numberOfTags) fields['Number of Tags'] = updates.numberOfTags;
      if (updates.totalAmount) fields['Total Amount'] = updates.totalAmount;
      if (updates.selectedSkills) fields['Selected Skills'] = updates.selectedSkills;

      const response = await fetch(`${this.baseUrl}/TrustTag%20Purchases/${recordId}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ fields })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        record: result
      };
    } catch (error) {
      console.error('Error updating TrustTag purchase:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

// Export singleton instance
export const airtable = new AirtableService();
export default airtable;