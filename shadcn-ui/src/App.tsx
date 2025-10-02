import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CreateTrustTag from './pages/CreateTrustTag';
import Checkout from './pages/Checkout';
import Verify from './pages/Verify';
import Profile from './pages/Profile';
import Partnership from './pages/Partnership';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create-trust-tag" element={<CreateTrustTag />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;