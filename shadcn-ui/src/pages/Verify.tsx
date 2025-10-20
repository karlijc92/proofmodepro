import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BackButton from '@/components/BackButton';
import { getTrustTagById } from '@/lib/airtable';
import QRCode from "react-qr-code";
import Footer from '@/components/Footer';

interface TrustTagData {
  id: string;
  fullName: string;
  certificateType: string;
  status: string;
  dateIssued: string;
}

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const tagId = searchParams.get('tagId');
  const [tagData, setTagData] = useState<TrustTagData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tagId) {
      const fetchTagData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getTrustTagById(tagId);
          if (data) {
            setTagData(data);
          } else {
            setError('This TrustTag ID could not be found. Please check the ID and try again.');
          }
        } catch (err) {
          console.error(err);
          setError('An error occurred while trying to verify the TrustTag. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      fetchTagData();
    } else {
      setLoading(false);
    }
  }, [tagId]);

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'expired':
        return 'destructive';
      default:
        return 'secondary';
    }
  };
  
  const publicUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <BackButton />
          <Card className="mt-4 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <ShieldCheck className="mr-3 text-blue-600 h-8 w-8" />
                TrustTag Verification
              </CardTitle>
              <CardDescription>
                Live verification results for TrustTag ID: <strong>{tagId || 'N/A'}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="flex items-center justify-center p-10">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <p className="ml-4 text-lg text-gray-600">Verifying...</p>
                </div>
              )}
              {error && !loading && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {!tagId && !loading && (
                  <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>No Tag ID Provided</AlertTitle>
                      <AlertDescription>Please provide a TrustTag ID in the URL to begin verification. Example: `/verify?tagId=YOUR-ID`</AlertDescription>
                  </Alert>
              )}
              {tagData && !loading && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="font-medium text-gray-500">Full Name:</div>
                        <div className="text-gray-800 font-semibold">{tagData.fullName}</div>

                        <div className="font-medium text-gray-500">Certificate Type:</div>
                        <div className="text-gray-800 font-semibold">{tagData.certificateType}</div>

                        <div className="font-medium text-gray-500">Date Issued:</div>
                        <div className="text-gray-800">{tagData.dateIssued}</div>

                        <div className="font-medium text-gray-500">Status:</div>
                        <div>
                            <Badge variant={getStatusVariant(tagData.status)}>{tagData.status}</Badge>
                        </div>
                    </div>
                    <div className="pt-6 border-t flex flex-col items-center text-center">
                        <h3 className="text-lg font-semibold mb-3">Public Verification QR Code</h3>
                        <div className="bg-white p-4 inline-block rounded-lg shadow-md">
                             <QRCode value={publicUrl} size={128} />
                        </div>
                        <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="mt-4 text-xs text-blue-600 hover:underline flex items-center">
                            {publicUrl} <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                    </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}