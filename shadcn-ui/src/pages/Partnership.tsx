import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building2, Globe2, Handshake, Loader2, Users } from 'lucide-react';

import { supabase } from '@/lib/supabase';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const partnerTypes = [
  { key: 'enterprise', label: 'Enterprise Partners', shortDescription: 'Integrate ProofModePro verification into your platform or workflow.', icon: Building2 },
  { key: 'ngo', label: 'NGO & Training Orgs', shortDescription: 'Help your learners, trainees, or beneficiaries get verified credentials.', icon: Users },
  { key: 'government', label: 'Government & International', shortDescription: 'Scale skill verification for workforce programs.', icon: Globe2 },
] as const;

type PartnerTypeKey = 'enterprise' | 'ngo' | 'government';

type FormState = {
  partnershipType: PartnerTypeKey;
  name: string;
  email: string;
  organization: string;
  role: string;
  website: string;
  message: string;
};

function normalizePartnerType(value: string | null): PartnerTypeKey {
  if (!value) return 'enterprise';
  return value.toLowerCase() as PartnerTypeKey;
}

export default function PartnershipPage() {
  const [searchParams] = useSearchParams();

  const requestedType = useMemo(() => {
    return normalizePartnerType(searchParams.get('type'));
  }, [searchParams]);

  const [formData, setFormData] = useState<FormState>({
    partnershipType: requestedType,
    name: '',
    email: '',
    organization: '',
    role: '',
    website: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (formData.name.length < 2) return 'Enter name';
    if (!formData.email.includes('@')) return 'Enter valid email';
    if (formData.organization.length < 2) return 'Enter organization';
    if (formData.role.length < 2) return 'Enter role';
    if (formData.message.length < 10) return 'Enter message';
    return '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('');
    setStatusType('');

    const validationError = validateForm();
    if (validationError) {
      setStatusType('error');
      setStatusMessage(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        role: formData.role,
        website: formData.website,
        partnership_type: formData.partnershipType,
        message: formData.message,
      };

      const { error } = await supabase
        .from('partnership_inquiries')
        .insert([payload]);

      if (error) throw error;

      // ✅ EMAIL SEND (this is the ONLY addition)
      await fetch('/api/send-partnership-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setStatusType('success');
      setStatusMessage('Submitted successfully');

      setFormData({
        partnershipType: 'enterprise',
        name: '',
        email: '',
        organization: '',
        role: '',
        website: '',
        message: '',
      });

    } catch (error) {
      setStatusType('error');
      setStatusMessage('Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">

          <Input placeholder="Name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} />
          <Input placeholder="Email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
          <Input placeholder="Organization" value={formData.organization} onChange={(e) => updateField('organization', e.target.value)} />
          <Input placeholder="Role" value={formData.role} onChange={(e) => updateField('role', e.target.value)} />
          <Input placeholder="Website" value={formData.website} onChange={(e) => updateField('website', e.target.value)} />

          <Textarea
            rows={5}
            value={formData.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder="Message"
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>

          {statusMessage && <p>{statusMessage}</p>}

        </form>
      </main>

      <Footer />
    </div>
  );
}
