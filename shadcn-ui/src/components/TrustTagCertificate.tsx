import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface TrustTagCertificateProps {
  fullName: string;
  certificateType: string;
  tagId: string;
  dateIssued: string;
}

const TrustTagCertificate: React.FC<TrustTagCertificateProps> = React.forwardRef(({
  fullName,
  certificateType,
  tagId,
  dateIssued,
}, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div ref={ref} className="p-8 bg-white rounded-lg shadow-2xl max-w-2xl mx-auto border-4 border-blue-800 font-sans">
      <div className="text-center pb-8 border-b-2 border-gray-200">
        <div className="flex justify-center items-center mb-4">
            <ShieldCheck className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Certificate of Trust</h1>
        <p className="text-lg text-gray-500 mt-2">This certifies that</p>
      </div>
      
      <div className="text-center my-10">
        <h2 className="text-5xl font-serif text-blue-800 tracking-wider">{fullName}</h2>
        <p className="text-lg text-gray-500 mt-4">has successfully been verified for the</p>
        <h3 className="text-3xl font-semibold text-gray-700 mt-2">{certificateType}</h3>
      </div>

      <div className="flex justify-between items-center mt-10 pt-6 border-t-2 border-gray-200 text-sm text-gray-600">
        <div>
          <p className="font-semibold">Date Issued</p>
          <p>{dateIssued}</p>
        </div>
        <div className="text-center">
            <p className="font-bold text-lg">ProofMode</p>
            <p className="text-xs">Verified Identity</p>
        </div>
        <div>
          <p className="font-semibold">TrustTag ID</p>
          <p>{tagId}</p>
        </div>
      </div>
       <p className="text-center text-xs text-gray-400 mt-6">Verify at proofmode.com/verify?tagId={tagId}</p>
    </div>
  );
});

export default TrustTagCertificate;