import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientMenu from "./pages/ClientMenu";
import KDS from "./pages/KDS";
import Staff from "./pages/Staff";
import Admin from "./pages/Admin";
import ProductCatalog from "./pages/ProductCatalog";
import ProductForm from "./pages/ProductForm";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/m/:token" element={<ClientMenu />} />
          <Route path="/kds" element={<KDS />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<ProductCatalog />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          <Route path="/admin/qr-codes" element={<QRCodeGenerator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
