import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  partnershipType: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().min(2),
  role: z.string().min(2),
  website: z.string().optional(),
  message: z.string().min(10),
});

export default function PartnershipPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partnershipType: searchParams.get('type') || 'enterprise',
      name: '',
      email: '',
      organization: '',
      role: '',
      website: '',
      message: '',
    },
  });

  async function onSubmit(values: any) {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('partnership_inquiries')
        .insert([
          {
            name: values.name,
            email: values.email,
            organization: values.organization,
            role: values.role,
            website: values.website || '',
            partnership_type: values.partnershipType,
            message: values.message,
          },
        ])
        .select();

      console.log('SUPABASE RESPONSE:', data, error);

      if (error) throw error;

      setIsSubmitted(true);

      toast({
        title: 'Submitted Successfully',
        description: 'Your inquiry has been saved.',
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
    } catch (err) {
      console.error('ERROR:', err);

      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Check console for error.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Partner With Us</CardTitle>
              <CardDescription className="text-center">
                Submit your information and we will follow up.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {isSubmitted && (
                <div className="mb-4 text-green-600 text-sm text-center">
                  Submission successful
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </Button>

                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
