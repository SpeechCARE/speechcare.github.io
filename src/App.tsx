import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/projects/ProjectDetail";
import Publications from "./pages/Publications";
import Members from "./pages/Members";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import ExplainabilityDemo from "./pages/projects/explainability/ExplainabilityDemo";
import PatientReport from "./pages/projects/explainability/PatientReport";

const queryClient = new QueryClient();

// ScrollToTop component that scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Handle redirect from 404.html for GitHub Pages
const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      // Decode and navigate to the original path
      const decodedPath = decodeURIComponent(redirect);
      // Remove the redirect query parameter from URL
      navigate(decodedPath, { replace: true });
    }
  }, [navigate, location.search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/projects/explainability/demo" element={<ExplainabilityDemo />} />
              <Route path="/projects/explainability/demo/:patientId" element={<PatientReport />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/members" element={<Members />} />
              <Route path="/join" element={<Join />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
