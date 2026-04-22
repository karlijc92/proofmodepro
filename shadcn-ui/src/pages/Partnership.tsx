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
  {
    key: 'enterprise',
    label: 'Enterprise Partners',
    shortDescription: 'Integrate ProofModePro verification into your platform or workflow.',
    icon: Building2,
    headline: 'Enterprise verification for hiring, staffing, workforce platforms, and ecosystems',
    description:
      'ProofModePro helps enterprise partners verify real-world skills in a fast, structured, and scalable way. This is ideal for talent platforms, staffing firms, employers, workforce technology companies, marketplaces, and organizations that want stronger trust, cleaner screening, and more confidence in skill-based decisions.',
    offers: [
      'Skill verification pathways for real-world workers and applicants',
      'TrustTag-based credentialing that can support trust, screening, and visibility',
      'Partnership options for platform integration, workforce onboarding, or candidate pipelines',
      'Scalable verification support without requiring traditional credentials alone',
    ],
    useCases: [
      'Hiring and candidate screening',
      'Marketplace trust and provider credibility',
      'Workforce quality assurance',
      'Skilled labor pipeline development',
    ],
  },
  {
    key: 'ngo',
    label: 'NGO & Training Orgs',
    shortDescription: 'Help your learners, trainees, or beneficiaries get verified credentials.',
    icon: Users,
    headline: 'Verification support for nonprofits, training programs, workforce initiatives, and social impact organizations',
    description:
      'ProofModePro helps NGOs, workforce development groups, academies, bootcamps, and training organizations give their participants a stronger way to demonstrate verified skills. This can support job placement, program credibility, learner outcomes, and trust with employers or funders.',
    offers: [
      'TrustTag verification for trainees, graduates, and beneficiaries',
      'A structured way to help nontraditional talent show practical capability',
      'Support for job-readiness, placement, and workforce transition efforts',
      'Partnership opportunities for cohort-based or program-based verification',
    ],
    useCases: [
      'Graduate verification',
      'Training-to-employment pathways',
      'Program outcome support',
      'Workforce readiness and placement initiatives',
    ],
  },
  {
    key: 'government',
    label: 'Government & International',
    shortDescription: 'Scale skill verification for workforce programs, mobility, and economic development.',
    icon: Globe2,
    headline: 'Scalable verification for workforce systems, public programs, and international mobility initiatives',
    description:
      'ProofModePro can support public-sector and international programs that need a modern way to validate practical skills at scale. This may include workforce initiatives, migration support, economic mobility programs, retraining efforts, refugee and newcomer pathways, and broader labor-market access programs.',
    offers: [
      'Skill verification pathways designed for scale and broad workforce access',
      'Support for practical credential visibility across diverse populations',
      'Options for pilot programs, workforce collaborations, and strategic partnerships',
      'A modern trust layer for skill recognition beyond paper credentials alone',
    ],
    useCases: [
      'Public workforce programs',
      'International workforce mobility',
      'Reskilling and transition initiatives',
      'Economic development and labor access efforts',
    ],
  },
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

const partnerTypeAliases: Record<string, PartnerTypeKey> = {
  enterprise: 'enterprise',
  employer: 'enterprise',
  employers: 'enterprise',
  hiring: 'enterprise',
  staffing: 'enterprise',
  platform: 'enterprise',
  platforms: 'enterprise',
  business: 'enterprise',

  ngo: 'ngo',
  nonprofit: 'ngo',
  nonprofits: 'ngo',
  training: 'ngo',
  academy: 'ngo',
  academies: 'ngo',
  bootcamp: 'ngo',
  bootcamps: 'ngo',
  workforce: 'ngo',
  education: 'ngo',

  government: 'government',
  gov: 'government',
  public: 'government',
  'public-sector': 'government',
  publicsector: 'government',
  international: 'government',
  mobility: 'government',
};

function normalizePartnerType(value: string | null): PartnerTypeKey {
  if (!value) return 'enterprise';
  const normalized = value.trim().toLowerCase();
  return partnerTypeAliases[normalized] ?? 'enterprise';
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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      partnershipType: requestedType,
    }));
    setStatusMessage('');
    setStatusType('');
  }, [requestedType]);

  const activePartner =
    partnerTypes.find((partner) => partner.key === formData.partnershipType) ??
    partnerTypes[0];

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) return 'Please enter your full name.';
    if (!formData.email.includes('@')) return 'Please enter a valid email address.';
    if (formData.organization.trim().length < 2) return 'Please enter your organization name.';
    if (formData.role.trim().length < 2) return 'Please enter your role.';
    if (formData.message.trim().length < 10) return 'Please enter a longer message.';
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
        name: formData.name.trim(),
        email: formData.email.trim(),
        organization: formData.organization.trim(),
        role: formData.role.trim(),
        website: formData.website.trim(),
        partnership_type: formData.partnershipType,
        message: formData.message.trim(),
      };

      const { error } = await supabase
        .from('partnership_inquiries')
        .insert([payload]);

      if (error) throw error;

      // email send (no UI change)
      await fetch('/api/send-partnership-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setStatusType('success');
      setStatusMessage('Your inquiry was submitted successfully.');

      setFormData((prev) => ({
        ...prev,
        name: '',
        email: '',
        organization: '',
        role: '',
        website: '',
        message: '',
      }));
    } catch (error) {
      console.error(error);
      setStatusType('error');
      setStatusMessage('Submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Partnerships</h1>
            <p className="text-lg text-muted-foreground">
              Explore how ProofModePro can support employers, organizations, and institutions.
            </p>
          </div>

          {/* TOP CARDS (RESTORED) */}
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTypes.map((partner) => {
              const Icon = partner.icon;
              return (
                <div key={partner.key}>
                  <Card className="h-full hover:shadow-md">
                    <CardHeader>
                      <Icon className="h-8 w-8 mb-3 text-primary" />
                      <CardTitle>{partner.label}</CardTitle>
                      <CardDescription>{partner.shortDescription}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* DETAIL + FORM (RESTORED) */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{activePartner.label}</CardTitle>
                <CardDescription>{activePartner.headline}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{activePartner.description}</p>
                {activePartner.offers.map((o) => <p key={o}>• {o}</p>)}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Partnership Details</CardTitle>
              </CardHeader>
              <CardContent>

                {statusMessage && <div>{statusMessage}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input value={formData.name} onChange={(e)=>updateField('name',e.target.value)} placeholder="Name"/>
                  <Input value={formData.email} onChange={(e)=>updateField('email',e.target.value)} placeholder="Email"/>
                  <Input value={formData.organization} onChange={(e)=>updateField('organization',e.target.value)} placeholder="Organization"/>
                  <Input value={formData.role} onChange={(e)=>updateField('role',e.target.value)} placeholder="Role"/>
                  <Input value={formData.website} onChange={(e)=>updateField('website',e.target.value)} placeholder="Website"/>
                  <Textarea value={formData.message} onChange={(e)=>updateField('message',e.target.value)} placeholder="Message"/>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin"/> : 'Submit'}
                  </Button>
                </form>

              </CardContent>
            </Card>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
