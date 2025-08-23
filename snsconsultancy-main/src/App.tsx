import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import ChatBot from "./components/ChatBot";

const whatsappIconUrl = "https://img.freepik.com/premium-vector/whatsapp-icon-concept_23-2147897840.jpg?semt=ais_hybrid&w=740&q=80";
const whatsappNumber = "919137828661"; // no '+'

const queryClient = new QueryClient();

const App = () => {
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    selectedService: '',
    selectedCountry: ''
  });

  useEffect(() => {
    const handleOpenBookingModal = (event: any) => {
      setBookingModal({
        isOpen: true,
        selectedService: event.detail?.selectedService || '',
        selectedCountry: event.detail?.selectedCountry || ''
      });
    };

    window.addEventListener('openBookingModal', handleOpenBookingModal);
    return () => window.removeEventListener('openBookingModal', handleOpenBookingModal);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* WhatsApp Icon Link (about one inch from right) */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px", // 120px ≈ 1 inch from right
            zIndex: 1000,
          }}
        >
          <img
            src={whatsappIconUrl}
            alt="WhatsApp"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
            }}
          />
        </a>

        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </div>
          <BookingModal
            isOpen={bookingModal.isOpen}
            onClose={() => setBookingModal({ isOpen: false, selectedService: '', selectedCountry: '' })}
            preSelectedService={bookingModal.selectedService}
            preSelectedCountry={bookingModal.selectedCountry}
          />
          <Analytics />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
