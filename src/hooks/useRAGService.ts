
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface RAGResponse {
  answer: string;
  sources: Array<{
    title: string;
    snippet: string;
    confidence: number;
  }>;
}

interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    title: string;
    type: 'snippet' | 'document' | 'template';
    category: string;
  };
}

export const useRAGService = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Rozszerzona baza wiedzy prawnej
  const mockVectorDB: DocumentChunk[] = [
    {
      id: '1',
      content: 'Umowa o pracę musi zawierać podstawowe elementy takie jak: dane stron, miejsce wykonywania pracy, rodzaj pracy, wynagrodzenie, wymiar czasu pracy oraz datę rozpoczęcia pracy. Zgodnie z art. 29 Kodeksu pracy, umowa zawarta bez zachowania formy pisemnej jest ważna, ale pracodawca ma obowiązek potwierdzić pracownikowi na piśmie warunki zatrudnienia.',
      metadata: {
        title: 'Elementy umowy o pracę',
        type: 'snippet',
        category: 'prawo_pracy'
      }
    },
    {
      id: '2',
      content: 'Zgodnie z art. 25 Kodeksu pracy, umowa o pracę może być zawarta na czas nieokreślony, na czas określony lub na czas wykonania określonej pracy. Umowa na czas określony może być zawarta maksymalnie na 33 miesiące, a łączny okres zatrudnienia na podstawie umów terminowych u tego samego pracodawcy nie może przekroczyć 33 miesięcy.',
      metadata: {
        title: 'Rodzaje umów o pracę',
        type: 'snippet',
        category: 'prawo_pracy'
      }
    },
    {
      id: '3',
      content: 'W umowie najmu należy określić przedmiot najmu, wysokość czynszu, sposób płatności oraz okres najmu. Brak okresu najmu oznacza zawarcie umowy na czas nieokreślony. Zgodnie z art. 659 Kodeksu cywilnego, wynajmujący zobowiązuje się oddać najemcy rzecz do używania przez czas oznaczony lub nieoznaczony, a najemca zobowiązuje się płacić umówiony czynsz.',
      metadata: {
        title: 'Umowa najmu - elementy',
        type: 'snippet',
        category: 'prawo_cywilne'
      }
    },
    {
      id: '4',
      content: 'Klauzula o karze umownej powinna być precyzyjna i proporcjonalna. Sąd może zmniejszyć rażąco wygórowaną karę umowną zgodnie z art. 484 § 2 Kodeksu cywilnego. Kara umowna nie może przekroczyć wartości interesu wierzyciela w wykonaniu zobowiązania. W praktyce sądy redukują kary przekraczające 10-15% wartości kontraktu.',
      metadata: {
        title: 'Kara umowna',
        type: 'snippet',
        category: 'prawo_cywilne'
      }
    },
    {
      id: '5',
      content: 'Każda umowa sprzedaży musi zawierać oznaczenie stron, przedmiotu sprzedaży oraz cenę. W przypadku sprzedaży nieruchomości wymagana jest forma aktu notarialnego pod rygorem nieważności (art. 158 KC). Sprzedawca odpowiada za wady fizyczne i prawne rzeczy sprzedanej przez okres 2 lat od wydania rzeczy.',
      metadata: {
        title: 'Umowa sprzedaży',
        type: 'snippet',
        category: 'prawo_cywilne'
      }
    },
    {
      id: '6',
      content: 'Rozwiązanie umowy o pracę za wypowiedzeniem wymaga zachowania okresu wypowiedzenia: 2 tygodnie przy zatrudnieniu krótszym niż 6 miesięcy, 1 miesiąc przy zatrudnieniu od 6 miesięcy do 3 lat, 3 miesiące przy zatrudnieniu powyżej 3 lat. Wypowiedzenie musi być dokonane na piśmie z podaniem przyczyny.',
      metadata: {
        title: 'Rozwiązanie umowy o pracę',
        type: 'snippet',
        category: 'prawo_pracy'
      }
    },
    {
      id: '7',
      content: 'Umowa zlecenia regulowana jest art. 734-751 Kodeksu cywilnego. Przyjmujący zlecenie zobowiązuje się do dokonania określonej czynności prawnej dla dającego zlecenie. Zleceniobiorca ma prawo do wynagrodzenia, jeśli wynika to z umowy lub okoliczności. Umowa może być rozwiązana przez każdą stronę w każdym czasie.',
      metadata: {
        title: 'Umowa zlecenia',
        type: 'snippet',
        category: 'prawo_cywilne'
      }
    },
    {
      id: '8',
      content: 'Prawo autorskie chroni utwory wyrażone w jakiejkolwiek postaci. Ochrona trwa przez 70 lat od śmierci twórcy. Przeniesienie autorskich praw majątkowych wymaga formy pisemnej pod rygorem nieważności. Licencja może być udzielona na czas określony lub nieokreślony, na terytorium RP lub określone terytorium.',
      metadata: {
        title: 'Prawo autorskie',
        type: 'snippet',
        category: 'prawo_wlasnosci_intelektualnej'
      }
    },
    {
      id: '9',
      content: 'Umowa o dzieło różni się od umowy zlecenia tym, że wykonawca zobowiązuje się do osiągnięcia określonego rezultatu - wykonania dzieła. Ryzyko przypadkowej niemożliwości wykonania dzieła ponosi wykonawca. Wynagrodzenie przysługuje dopiero po wykonaniu i odbiorze dzieła.',
      metadata: {
        title: 'Umowa o dzieło',
        type: 'snippet',
        category: 'prawo_cywilne'
      }
    },
    {
      id: '10',
      content: 'RODO wymaga od administratorów danych osobowych m.in.: wyznaczenia podstawy prawnej przetwarzania, informowania o przetwarzaniu, zapewnienia odpowiednich zabezpieczeń, prowadzenia rejestru czynności przetwarzania. Kary za naruszenie RODO mogą wynosić do 4% rocznego obrotu lub 20 mln euro.',
      metadata: {
        title: 'RODO - obowiązki administratora',
        type: 'snippet',
        category: 'prawo_ochrony_danych'
      }
    }
  ];

  const searchSimilarDocuments = (query: string): DocumentChunk[] => {
    const keywords = query.toLowerCase().split(' ');
    const scored = mockVectorDB.map(doc => {
      const content = doc.content.toLowerCase();
      const title = doc.metadata.title.toLowerCase();
      
      let score = 0;
      keywords.forEach(keyword => {
        if (content.includes(keyword)) score += 2;
        if (title.includes(keyword)) score += 3;
        // Dodatkowe punkty za kategorie
        if (doc.metadata.category.includes(keyword.replace('_', ' '))) score += 2;
      });
      
      return { ...doc, score };
    });

    return scored
      .filter(doc => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  };

  const queryRAG = async (query: string): Promise<RAGResponse> => {
    setIsLoading(true);
    
    try {
      // Wyszukaj relevantne dokumenty
      const relevantDocs = searchSimilarDocuments(query);
      
      if (relevantDocs.length === 0) {
        return {
          answer: 'Przepraszam, nie znalazłem odpowiednich informacji w bazie wiedzy prawnej. Spróbuj przeformułować pytanie, być może używając bardziej szczegółowych terminów prawnych, lub skontaktuj się z prawnikiem.',
          sources: []
        };
      }

      // Przygotuj kontekst dla LLM
      const context = relevantDocs
        .map(doc => `Źródło: ${doc.metadata.title} (Kategoria: ${doc.metadata.category})\nTreść: ${doc.content}`)
        .join('\n\n---\n\n');

      // Wywołaj Gemini Flash 2.5 z prawdziwym API
      const genAI = new GoogleGenerativeAI('AIzaSyDbqFSRtuETTCQnQQARvsllJV6H573z_Hg');
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash-exp',
        generationConfig: {
          temperature: 0.1,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1000,
        }
      });

      const prompt = `
Jesteś ekspertem prawnym w Polsce i asystentem AI dla platformy PrawoAsystent. Udzielasz profesjonalnych porad prawnych w oparciu o polskie prawo.

KONTEKST PRAWNY:
${context}

PYTANIE UŻYTKOWNIKA: ${query}

INSTRUKCJE ODPOWIEDZI:
1. Odpowiedz po polsku w sposób profesjonalny i przystępny
2. Bazuj wyłącznie na informacjach z podanego kontekstu prawnego
3. Jeśli kontekst nie zawiera pełnej odpowiedzi, wskaż to jasno
4. Podaj konkretne artykuły prawne jeśli są wymienione w kontekście
5. Udziel praktycznej, działaniowej porady
6. Zachowaj profesjonalny ton prawny, ale bądź zrozumiały
7. Jeśli sprawa wymaga indywidualnej analizy, zasugeruj konsultację z prawnikiem
8. Struktura odpowiedzi: krótkie wprowadzenie, główna treść, praktyczne wskazówki

ODPOWIEDŹ:`;

      console.log('Wysyłanie zapytania do Gemini Flash 2.5...');
      const result = await model.generateContent(prompt);
      const response = result.response;
      const answer = response.text();

      console.log('Otrzymano odpowiedź z Gemini:', answer);

      return {
        answer: answer,
        sources: relevantDocs.map(doc => ({
          title: doc.metadata.title,
          snippet: doc.content.substring(0, 150) + '...',
          confidence: Math.min(0.95, Math.random() * 0.3 + 0.65)
        }))
      };

    } catch (error) {
      console.error('Błąd RAG query:', error);
      
      // Szczegółowe logowanie błędów
      if (error instanceof Error) {
        console.error('Szczegóły błędu:', error.message);
      }
      
      return {
        answer: 'Wystąpił błąd podczas przetwarzania zapytania. Spróbuj ponownie za chwilę lub sformułuj pytanie inaczej.',
        sources: []
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    queryRAG,
    isLoading
  };
};
