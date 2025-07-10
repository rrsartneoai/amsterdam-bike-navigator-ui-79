import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TextToSpeechHook {
  isPlaying: boolean;
  speak: (text: string, voice?: string) => Promise<void>;
  stop: () => void;
  error: string | null;
}

export const useTextToSpeech = (): TextToSpeechHook => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string, voice: string = 'alloy') => {
    try {
      setError(null);
      setIsPlaying(true);

      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice }
      });

      if (error) {
        throw error;
      }

      if (data?.audioContent) {
        // Convert base64 to audio
        const audioData = atob(data.audioContent);
        const arrayBuffer = new ArrayBuffer(audioData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < audioData.length; i++) {
          uint8Array[i] = audioData.charCodeAt(i);
        }

        const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const audio = new Audio(audioUrl);
        setCurrentAudio(audio);

        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
          setCurrentAudio(null);
        };

        audio.onerror = () => {
          setError('Błąd podczas odtwarzania audio');
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
          setCurrentAudio(null);
        };

        await audio.play();
      }
    } catch (err) {
      console.error('Text-to-speech error:', err);
      setError('Błąd podczas generowania mowy');
      setIsPlaying(false);
    }
  }, [currentAudio]);

  const stop = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentAudio]);

  return {
    isPlaying,
    speak,
    stop,
    error
  };
};