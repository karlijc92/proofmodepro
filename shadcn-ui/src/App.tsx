import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfilePreview from "./pages/ProfilePreview";
import Verify from "./pages/Verify";
import Partnership from "./pages/Partnership";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Refund from "./pages/Refund";
import Disclaimer from "./pages/Disclaimer";
import CreateTrustTagPage from "./pages/CreateTrustTag";
import AssessmentPage from "./pages/Assessment";
import AssessmentResultsPage from "./pages/AssessmentResults";
import ProofUploadPage from "./pages/ProofUpload";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/profile-preview" element={<ProfilePreview />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/create-trust-tag" element={<CreateTrustTagPage />} />
          <Route path="/proof-upload/:id" element={<ProofUploadPage />} />
          <Route path="/assessment/:id" element={<AssessmentPage />} />
          <Route
            path="/assessment/:id/results"
            element={<AssessmentResultsPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
