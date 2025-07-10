
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Scale, Zap, Shield, Clock, Star } from 'lucide-react';
import { useBrand } from '@/contexts/BrandContext';

interface ModernHeroSectionProps {
  onOrderClick: () => void;
}

const ModernHeroSection = ({ onOrderClick }: ModernHeroSectionProps) => {
  const { currentBrand } = useBrand();

  const features = [
    { icon: <Zap className="h-5 w-5" />, text: "Analiza w 24h" },
    { icon: <Shield className="h-5 w-5" />, text: "Gwarancja jakości" },
    { icon: <Clock className="h-5 w-5" />, text: "Dostępność 24/7" },
    { icon: <Star className="h-5 w-5" />, text: "1000+ zadowolonych klientów" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-lg float" style={{animationDelay: '4s'}}></div>
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 glass-card border-white/20 text-white hover:bg-white/10">
            <Scale className="w-4 h-4 mr-2" />
            Nowoczesna kancelaria prawna AI
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {currentBrand.name}
            </span>
            <span className="block text-3xl lg:text-5xl mt-4 text-white/90">
              {currentBrand.tagline}
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Zaawansowana sztuczna inteligencja analizuje Twoje dokumenty prawne i tworzy profesjonalne pisma w rekordowym czasie
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="glass-card bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 glow-hover border-0"
              onClick={onOrderClick}
            >
              Rozpocznij analizę
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="glass-card text-center p-4 rounded-2xl">
              <div className="text-3xl font-bold text-white">od 69 zł</div>
              <div className="text-sm text-white/70">za analizę prawną</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-300 card-3d">
                <div className="flex items-center justify-center mb-2 text-blue-300">
                  {feature.icon}
                </div>
                <div className="text-sm font-medium">{feature.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHeroSection;
