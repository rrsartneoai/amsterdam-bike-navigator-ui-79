
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Gavel, Building, Users, TrendingUp, Star } from 'lucide-react';

interface ModernDocumentTypesSectionProps {
  onOrderClick: () => void;
}

const ModernDocumentTypesSection = ({ onOrderClick }: ModernDocumentTypesSectionProps) => {
  const documentTypes = [
    {
      icon: <Gavel className="h-8 w-8 text-red-500" />,
      title: "Pismo od Komornika",
      price: "od 89 zł",
      description: "Kompleksowa analiza dokumentów komorniczych i przygotowanie odpowiedzi",
      popular: true,
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: <Building className="h-8 w-8 text-blue-500" />,
      title: "Wezwanie z Sądu",
      price: "od 129 zł",
      description: "Profesjonalna analiza pism sądowych i strategia prawna",
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FileText className="h-8 w-8 text-green-500" />,
      title: "Umowy i Reklamacje",
      price: "od 69 zł",
      description: "Przegląd umów, identyfikacja problemów i przygotowanie reklamacji",
      popular: false,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Sprawy Rodzinne",
      price: "od 149 zł",
      description: "Wsparcie w sprawach rozwodowych, alimentacyjnych i opiekuńczych",
      popular: false,
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: "Prawo Gospodarcze",
      price: "od 199 zł",
      description: "Analiza dokumentów biznesowych i wsparcie przedsiębiorców",
      popular: false,
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <FileText className="h-8 w-8 text-indigo-500" />,
      title: "Dokumenty Urzędowe",
      price: "od 99 zł",
      description: "Pomoc w wypełnianiu i rozumieniu dokumentów urzędowych",
      popular: false,
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50"></div>
      
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 glass-card border-blue-200 text-blue-700">
            Nasze Specjalizacje
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            W czym możemy Ci pomóc?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Nasza sztuczna inteligencja specjalizuje się w różnych dziedzinach prawa, 
            oferując profesjonalne analizy i gotowe rozwiązania
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {documentTypes.map((type, index) => (
            <Card 
              key={index} 
              className={`glass-card card-3d hover:shadow-2xl transition-all duration-500 border-0 relative overflow-hidden ${
                type.popular ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
              }`}
            >
              {type.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black z-10">
                  <Star className="w-4 h-4 mr-1" />
                  Popularne
                </Badge>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-5`}></div>
              
              <CardHeader className="text-center relative z-10">
                <div className="flex justify-center mb-4">
                  <div className={`glass-card p-4 bg-gradient-to-br ${type.gradient} bg-opacity-10`}>
                    {type.icon}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">{type.title}</CardTitle>
                <div className={`text-3xl font-bold bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent`}>
                  {type.price}
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <CardDescription className="text-center text-slate-600 mb-6 leading-relaxed">
                  {type.description}
                </CardDescription>
                <Button 
                  className={`w-full glass-card bg-gradient-to-r ${type.gradient} text-white border-0 hover:shadow-lg transition-all duration-300 glow-hover`}
                  onClick={onOrderClick}
                >
                  Zamów analizę
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernDocumentTypesSection;
