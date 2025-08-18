import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DesignSystem from "./pages/DesignSystem";

// Auth pages
import AdminLogin from "./pages/auth/AdminLogin";
import StaffLogin from "./pages/auth/StaffLogin";
import KDSLogin from "./pages/auth/KDSLogin";
import ClientLogin from "./pages/auth/ClientLogin";
import QRLogin from "./pages/QRLogin";

// Client pages
import ClientMenu from "./pages/client/ClientMenu";
import ClientCheckout from "./pages/client/ClientCheckout";
import ClientOrderStatus from "./pages/client/ClientOrderStatus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/kds/login" element={<KDSLogin />} />
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/qr/:tableToken" element={<QRLogin />} />
          
          {/* Client Routes */}
          <Route path="/client/menu" element={<ClientMenu />} />
          <Route path="/client/checkout" element={<ClientCheckout />} />
          <Route path="/client/order-status/:orderId" element={<ClientOrderStatus />} />
          
          {/* System Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/design-system" element={<DesignSystem />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
