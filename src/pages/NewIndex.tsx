
import React, { useState } from 'react';
import { BrandProvider } from '@/contexts/BrandContext';
import BrandHeader from '@/components/BrandHeader';
import ModernHeroSection from '@/components/ModernHeroSection';
import ModernDocumentTypesSection from '@/components/ModernDocumentTypesSection';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';
import AIAssistantChatbot from '@/components/ai-assistant/AIAssistantChatbot';

const NewIndex = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (showOrderForm) {
    return (
      <BrandProvider>
        <div className="min-h-screen gradient-bg">
          <OrderForm onBack={() => setShowOrderForm(false)} />
          <AIAssistantChatbot />
        </div>
      </BrandProvider>
    );
  }

  return (
    <BrandProvider>
      <div className="min-h-screen">
        <BrandHeader />
        <ModernHeroSection onOrderClick={() => setShowOrderForm(true)} />
        <ModernDocumentTypesSection onOrderClick={() => setShowOrderForm(true)} />
        <Footer />
        <AIAssistantChatbot />
      </div>
    </BrandProvider>
  );
};

export default NewIndex;
