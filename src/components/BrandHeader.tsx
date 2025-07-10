
import React from 'react';
import { useBrand } from '@/contexts/BrandContext';
import { Scale, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import UserProfileButton from '@/components/auth/UserProfileButton';
import NotificationSystem from '@/components/notifications/NotificationSystem';

const BrandHeader = () => {
  const { currentBrand } = useBrand();
  const navigate = useNavigate();

  return (
    <header className="relative backdrop-blur-xl bg-white/20 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <Scale className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {currentBrand.name}
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                {currentBrand.tagline}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#services" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Usługi
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              O nas
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Kontakt
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationSystem />
            
            {/* User Profile */}
            <UserProfileButton />

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden backdrop-blur-sm bg-white/20">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BrandHeader;
