// ONLY showing the changed onSubmit section — everything else stays EXACTLY the same

async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true);

  try {
    const payload = {
      name: values.name,
      email: values.email,
      organization: values.organization,
      role: values.role,
      website: values.website || '',
      partnership_type: values.partnershipType,
      message: values.message,
    };

    const { error } = await supabase
      .from('partnership_inquiries')
      .insert([payload]);

    if (error) throw error;

    setIsSubmitted(true);

    toast({
      title: 'Inquiry Sent',
      description:
        "We've received your partnership inquiry and will follow up with you.",
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
    console.error('Error saving inquiry:', error);

    toast({
      variant: 'destructive',
      title: 'Something went wrong',
      description: 'There was a problem submitting your inquiry.',
    });
  } finally {
    setIsLoading(false);
  }
}
