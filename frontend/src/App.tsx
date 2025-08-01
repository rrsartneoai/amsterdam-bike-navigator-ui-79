import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AuthWrapper from '@/components/LegalOffice/AuthWrapper';
import LawFirmDashboard from '@/components/LegalOffice/LawFirmDashboard';
import ClientsManagement from '@/components/LegalOffice/ClientsManagement';
import CasesManagement from '@/components/LegalOffice/CasesManagement';

function App() {
  return (
    <Router>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<LawFirmDashboard />} />
          <Route path="/clients" element={<ClientsManagement />} />
          <Route path="/cases" element={<CasesManagement />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthWrapper>
      <Toaster />
    </Router>
  );
}

export default App;