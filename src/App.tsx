import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import AllTools from "@/pages/AllTools";
import CategoryPage from "@/pages/CategoryPage";
import ToolPage from "@/pages/ToolPage";
import { AboutPage, ContactPage, PrivacyPage, TermsPage, DisclaimerPage } from "@/pages/legal";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<AllTools />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          {/* Category landing pages, e.g. /calculators, /finance */}
          <Route path="/:categoryId" element={<CategoryPage />} />
          {/* Every individual tool, e.g. /calculators/percentage */}
          <Route path="/:categoryId/*" element={<ToolPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
