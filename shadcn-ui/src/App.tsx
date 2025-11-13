import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemberstackProvider } from '@memberstack/react';

// You can keep these imports for now, even if we don't use them yet.
// That way we won't forget them when we re-add routing.
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Verify from './pages/Verify';
import Partnership from './pages/Partnership';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Refund from './pages/Refund';
import Disclaimer from './pages/Disclaimer';
import CreateTrustTagPage from './pages/CreateTrustTag';
import AssessmentPage from './pages/Assessment';
import AssessmentResultsPage from './pages/AssessmentResults';

const queryClient = new QueryClient();

const App = () => (
  <MemberstackProvider
    config={{
      publicKey: 'app_cmgb1v02d00bg0sss9fvt1nkb',
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* Temporary simple content, just to make sure the app builds */}
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>ProofMode is connected</h1>
          <p>If you can see this on your live site, the Vercel build is working.</p>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </MemberstackProvider>
);

export default App;
