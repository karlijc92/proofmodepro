import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={handleGoBack}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm border-gray-300 text-gray-700 hover:bg-gray-50 shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
    </div>
  );
}