import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Appointments } from "@/pages/Appointments";
import { ServiceRequests } from "@/pages/ServiceRequests";
import { Customers } from "@/pages/Customers";
import { Vehicles } from "@/pages/Vehicles";
import { WorkOrders } from "@/pages/WorkOrders";
import { Inventory } from "@/pages/Inventory";
import { Technicians } from "@/pages/Technicians";
import { Invoices } from "@/pages/Invoices";
import { Reports } from "@/pages/Reports";
import { Reviews } from "@/pages/Reviews";
import { Settings } from "@/pages/Settings";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";
import { Showcase } from "@/pages/Showcase";

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/service-requests" element={<ServiceRequests />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/technicians" element={<Technicians />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
