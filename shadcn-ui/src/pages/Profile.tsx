import { useRef, useState, useEffect } from 'react';
import { useMemberstack } from '@memberstack/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import TrustTagCertificate from '@/components/TrustTagCertificate';
import { getTrustTagsByEmail } from '@/lib/airtable';

interface TrustTag {
  id: string;
  fullName: string;
  certificateType: string;
  tagId: string;
  dateIssued: string;
}

export default function ProfilePage() {
  const { auth, logout } = useMemberstack();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [trustTags, setTrustTags] = useState<TrustTag[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const certificateRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchTrustTags = async () => {
      if (auth.currentUser?.email) {
        try {
          const tags = await getTrustTagsByEmail(auth.currentUser.email);
          setTrustTags(tags);
        } catch (error) {
          console.error('Failed to fetch TrustTags:', error);
          toast({
            variant: 'destructive',
            title: 'Failed to load your TrustTags.',
            description: 'There was an issue connecting to the database. Please try refreshing the page.',
          });
        } finally {
          setIsLoadingTags(false);
        }
      } else if (auth.isLoggedIn === false) {
        setIsLoadingTags(false);
      }
    };

    fetchTrustTags();
  }, [auth.currentUser, auth.isLoggedIn, toast]);

  const handleLogout = async () => {
    await logout();
    toast({ title: 'Logged out successfully.' });
  };

  const downloadCertificate = async (tag: TrustTag) => {
    const certificateElement = certificateRefs.current[tag.tagId];
    if (!certificateElement) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not find the certificate element to download.',
      });
      return;
    }

    setIsDownloading(tag.tagId);

    try {
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`ProofMode_TrustTag_${tag.tagId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'There was an error generating your certificate PDF.',
      });
    } finally {
      setIsDownloading(null);
    }
  };

  if (!auth.currentUser && auth.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="ml-4 text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">My Profile</CardTitle>
              {auth.currentUser ? (
                <CardDescription>
                  Welcome, {auth.currentUser.email}! Manage your TrustTags and account details here.
                </CardDescription>
              ) : (
                <CardDescription>
                  Please log in to view your profile and TrustTags.
                </CardDescription>
              )}
            </CardHeader>
            {auth.currentUser && (
              <CardContent>
                <Button onClick={handleLogout} variant="outline">Log Out</Button>
              </CardContent>
            )}
          </Card>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">My TrustTags</h2>
            {isLoadingTags ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <span>Loading your TrustTags...</span>
              </div>
            ) : trustTags.length > 0 ? (
              trustTags.map((tag) => (
                <Card key={tag.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="w-8 h-8 text-green-600" />
                      <div>
                        <CardTitle>{tag.certificateType}</CardTitle>
                        <CardDescription>Issued: {tag.dateIssued} | ID: {tag.tagId}</CardDescription>
                      </div>
                    </div>
                    <Button 
                      onClick={() => downloadCertificate(tag)}
                      disabled={isDownloading === tag.tagId}
                    >
                      {isDownloading === tag.tagId && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Download className="mr-2 h-4 w-4" />
                      {isDownloading === tag.tagId ? 'Downloading...' : 'Download Certificate'}
                    </Button>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 px-6 bg-white rounded-lg shadow-sm border border-dashed">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No TrustTags Found</h3>
                <p className="mt-1 text-sm text-gray-500">You have not been issued any TrustTags yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Hidden certificates for PDF generation */}
        <div className="absolute -left-[9999px] -top-[9999px]">
          {trustTags.map(tag => (
            <div key={`cert-${tag.tagId}`} style={{ width: '1123px' }}>
              <TrustTagCertificate
                ref={el => certificateRefs.current[tag.tagId] = el}
                fullName={tag.fullName}
                certificateType={tag.certificateType}
                tagId={tag.tagId}
                dateIssued={tag.dateIssued}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}