import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button variant="ghost" onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-gray-900">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}