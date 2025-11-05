import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import QuestionBank from "./pages/QuestionBank";
import SessionWizard from "./pages/SessionWizard";
import SessionResults from "./pages/SessionResults";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const loadMockData = useStore((state) => state.loadMockData);

  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bank" element={<QuestionBank />} />
            <Route path="/session/:id" element={<SessionWizard />} />
            <Route path="/results/:id" element={<SessionResults />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
