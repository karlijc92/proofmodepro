import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

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

const formSchema = z.object({
  partnershipType: z.string().min(1, { message: 'Please choose a partnership type.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  organization: z.string().min(2, { message: 'Organization must be at least 2 characters.' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters.' }),
  website: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (value) =>
        !value ||
        /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(value),
      { message: 'Please enter a valid website or leave it blank.' }
    ),
  message: z.string().min(20, { message: 'Message must be at least 20 characters.' }),
});

export default function PartnershipPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const requestedType = (searchParams.get('type') || '').toLowerCase();

  const initialPartnerType = useMemo(() => {
    if (
      requestedType === 'enterprise' ||
      requestedType === 'ngo' ||
      requestedType === 'government'
    ) {
      return requestedType;
    }
    return 'enterprise';
  }, [requestedType]);

  const selectedPartner = useMemo(() => {
    return (
      partnerTypes.find((partner) => partner.key === initialPartnerType) ??
      partnerTypes[0]
    );
  }, [initialPartnerType]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partnershipType: initialPartnerType,
      name: '',
      email: '',
      organization: '',
      role: '',
      website: '',
      message: '',
    },
  });

  const activePartnerType = form.watch('partnershipType');
  const activePartner =
    partnerTypes.find((partner) => partner.key === activePartnerType) ?? partnerTypes[0];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const chosenPartner =
        partnerTypes.find((partner) => partner.key === values.partnershipType) ??
        partnerTypes[0];

      const payload = {
        inquiryType: 'partnership',
        partnershipType: values.partnershipType,
        partnershipLabel: chosenPartner.label,
        name: values.name,
        email: values.email,
        organization: values.organization,
        role: values.role,
        website: values.website || '',
        message: values.message,
      };

      const { error } = await supabase.functions.invoke('contact-form', {
        body: payload,
      });

      if (error) throw error;

      setIsSubmitted(true);

      toast({
        title: 'Inquiry Sent',
        description:
          "We've received your partnership inquiry and can follow up with you directly.",
      });

      form.reset({
        partnershipType: values.partnershipType,
        name: '',
        email: '',
        organization: '',
        role: '',
        website: '',
        message: '',
      });
    } catch (error: unknown) {
      console.error('Error sending partnership inquiry:', error);

      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'There was a problem sending your inquiry. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

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
                  onClick={() => form.setValue('partnershipType', partner.key, { shouldValidate: true })}
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
                {isSubmitted && (
                  <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    Your inquiry was sent successfully. We can now review your request and
                    follow up using the information you submitted.
                  </div>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="partnershipType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partnership Type</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {partnerTypes.map((partner) => {
                                const isSelected = field.value === partner.key;

                                return (
                                  <button
                                    key={partner.key}
                                    type="button"
                                    onClick={() => field.onChange(partner.key)}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@organization.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Director, Program Lead, Founder, Hiring Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourorganization.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell Us About Your Interest</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              className="resize-none"
                              placeholder="Tell us what your organization does, what type of partnership you are interested in, how many people or users you may want to support, and what kind of outcome you are looking for."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isLoading ? 'Sending...' : 'Submit Partnership Inquiry'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
