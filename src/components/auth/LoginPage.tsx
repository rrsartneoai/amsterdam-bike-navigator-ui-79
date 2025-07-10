
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, User, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'login' | 'verify'>('login');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEmailAuth = async (isSignUp: boolean = false) => {
    if (!email || (!isSignUp && !password)) return;
    
    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password: password || 'temp123',
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          }
        });
        if (error) throw error;
        
        toast({
          title: "Sprawdź swoją skrzynkę email",
          description: "Wysłaliśmy Ci link do potwierdzenia konta.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        toast({
          title: "Zalogowano pomyślnie!",
          description: "Witamy w Prawnik.PL",
        });
      }
    } catch (error: any) {
      toast({
        title: "Błąd uwierzytelniania",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPAuth = async () => {
    setIsLoading(true);
    try {
      if (authMethod === 'email') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          }
        });
        if (error) throw error;
        
        setStep('verify');
        toast({
          title: "Kod wysłany!",
          description: "Sprawdź swoją skrzynkę email i wprowadź kod weryfikacyjny.",
        });
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          phone,
        });
        if (error) throw error;
        
        setStep('verify');
        toast({
          title: "SMS wysłany!",
          description: "Wprowadź kod otrzymany w SMS.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    try {
      const verifyParams = authMethod === 'email' 
        ? { email, token: code, type: 'email' as const }
        : { phone, token: code, type: 'sms' as const };
      
      const { error } = await supabase.auth.verifyOtp(verifyParams);
      
      if (error) throw error;
      
      toast({
        title: "Zalogowano pomyślnie!",
        description: "Witamy w Prawnik.PL",
      });
    } catch (error: any) {
      toast({
        title: "Błąd weryfikacji",
        description: "Nieprawidłowy kod weryfikacyjny.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: "Nie udało się zalogować przez Google.",
        variant: "destructive",
      });
    }
  };

  if (step === 'verify') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Glassmorphism background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 backdrop-blur-3xl"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <Card className="w-full max-w-md relative z-10 backdrop-blur-xl bg-white/80 border border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weryfikacja kodu
            </CardTitle>
            <CardDescription>
              Wprowadź kod weryfikacyjny {authMethod === 'email' ? 'z emaila' : 'z SMS'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="code">Kod weryfikacyjny</Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={handleVerifyCode} 
              disabled={isLoading || !code}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
            >
              {isLoading ? "Weryfikacja..." : "Zweryfikuj kod"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setStep('login')}
              className="w-full"
            >
              Powrót do logowania
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Glassmorphism background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Card className="w-full max-w-md relative z-10 backdrop-blur-xl bg-white/80 border border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Prawnik.PL
          </CardTitle>
          <CardDescription>
            Zaloguj się lub załóż konto
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="password" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100/50 backdrop-blur-sm">
              <TabsTrigger value="password">Hasło</TabsTrigger>
              <TabsTrigger value="otp">Kod OTP</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
            
            <TabsContent value="password" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Hasło</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Twoje hasło"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleEmailAuth(false)} 
                    disabled={isLoading || !email || !password}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                  >
                    {isLoading ? "Logowanie..." : "Zaloguj"}
                  </Button>
                  <Button 
                    onClick={() => handleEmailAuth(true)} 
                    disabled={isLoading || !email}
                    variant="outline"
                    className="flex-1"
                  >
                    {isLoading ? "Rejestracja..." : "Zarejestruj"}
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="otp" className="space-y-4">
              <Tabs value={authMethod} onValueChange={(value) => setAuthMethod(value as 'email' | 'phone')}>
                <TabsList className="grid w-full grid-cols-2 bg-gray-100/50">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">SMS</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-3 mt-4">
                  <div>
                    <Label htmlFor="otp-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="otp-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="twoj@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleOTPAuth} 
                    disabled={isLoading || !email}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                  >
                    {isLoading ? "Wysyłanie..." : "Wyślij kod na email"}
                  </Button>
                </TabsContent>
                
                <TabsContent value="phone" className="space-y-3 mt-4">
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+48 123 456 789"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleOTPAuth} 
                    disabled={isLoading || !phone}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                  >
                    {isLoading ? "Wysyłanie..." : "Wyślij kod SMS"}
                  </Button>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="social" className="space-y-4">
              <Button 
                onClick={handleGoogleAuth} 
                variant="outline" 
                className="w-full border-2 hover:bg-gray-50/50 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Kontynuuj z Google
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              Powrót do strony głównej
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
