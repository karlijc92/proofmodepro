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
    if (formData.name.trim().length < 2) {
      return 'Please enter your full name.';
    }
    if (!formData.email.includes('@')) {
      return 'Please enter a valid email address.';
    }
    if (formData.organization.trim().length < 2) {
      return 'Please enter your organization name.';
    }
    if (formData.role.trim().length < 2) {
      return 'Please enter your role.';
    }
    if (formData.message.trim().length < 10) {
      return 'Please enter a longer message.';
    }
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

      console.log('Submitting partnership inquiry:', payload);

      const { data, error } = await supabase
        .from('partnership_inquiries')
        .insert([payload])
        .select();

      console.log('Supabase partnership inquiry response:', { data, error });

      if (error) {
        throw error;
      }

      await fetch('/api/send-partnership-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setStatusType('success');
      setStatusMessage('Your inquiry was submitted successfully.');

      setFormData((prev) => ({
        partnershipType: prev.partnershipType,
        name: '',
        email: '',
        organization: '',
        role: '',
        website: '',
        message: '',
      }));
    } catch (error) {
      console.error('Partnership inquiry submission error:', error);
      setStatusType('error');
      setStatusMessage('Submission failed. Please check the browser console and try again.');
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
              Explore how ProofModePro can support employers, organizations, programs,
              and institutions that want stronger skill trust, clearer verification,
              and scalable workforce credibility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnerTypes.map((partner) => {
              const Icon = partner.icon;
              const isActive = activePartner.key === partner.key;

              return (
                <button
                  key={partner.key}
                  type="button"
                  onClick={() => updateField('partnershipType', partner.key)}
                  className="text-left"
                >
                  <Card
                    className={`h-full transition-all ${
                      isActive ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-md'
                    }`}
                  >
                    <CardHeader>
                      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{partner.label}</CardTitle>
                      <CardDescription className="text-base">
                        {partner.shortDescription}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="h-full">
              <CardHeader>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-3">
                  <activePartner.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">{activePartner.label}</CardTitle>
                <CardDescription className="text-base">
                  {activePartner.headline}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-7">
                  {activePartner.description}
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-3">What we offer</h3>
                  <div className="space-y-2">
                    {activePartner.offers.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Handshake className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Common use cases</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activePartner.useCases.map((item) => (
                      <div
                        key={item}
                        className="rounded-lg border bg-background px-4 py-3 text-sm text-muted-foreground"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Request Partnership Details</CardTitle>
                <CardDescription className="text-base">
                  Share your information and a few details about your organization so we
                  can review the fit and follow up.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {statusMessage && (
                  <div
                    className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                      statusType === 'success'
                        ? 'border-green-200 bg-green-50 text-green-800'
                        : 'border-red-200 bg-red-50 text-red-800'
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Partnership Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {partnerTypes.map((partner) => {
                        const isSelected = formData.partnershipType === partner.key;

                        return (
                          <button
                            key={partner.key}
                            type="button"
                            onClick={() => updateField('partnershipType', partner.key)}
                            className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border bg-background text-foreground hover:border-primary/40'
                            }`}
                          >
                            {partner.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Jane Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@organization.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Organization</label>
                    <Input
                      value={formData.organization}
                      onChange={(e) => updateField('organization', e.target.value)}
                      placeholder="Your Organization"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Role</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => updateField('role', e.target.value)}
                      placeholder="Director, Program Lead, Founder, Hiring Manager"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <Input
                      value={formData.website}
                      onChange={(e) => updateField('website', e.target.value)}
                      placeholder="https://yourorganization.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tell Us About Your Interest</label>
                    <Textarea
                      rows={6}
                      className="resize-none"
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Tell us what your organization does, what type of partnership you are interested in, how many people or users you may want to support, and what kind of outcome you are looking for."
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Submitting...' : 'Submit Partnership Inquiry'}
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
