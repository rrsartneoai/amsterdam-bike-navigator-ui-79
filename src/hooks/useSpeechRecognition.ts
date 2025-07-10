import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      setIsListening(true);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Convert to base64
          const reader = new FileReader();
          reader.onload = async () => {
            const base64Audio = (reader.result as string).split(',')[1];
            
            try {
              const { data, error } = await supabase.functions.invoke('speech-to-text', {
                body: { audio: base64Audio }
              });

              if (error) {
                throw error;
              }

              if (data?.text) {
                setTranscript(data.text);
              }
            } catch (err) {
              console.error('Transcription error:', err);
              setError('Błąd podczas transkrypcji audio');
            }
          };
          reader.readAsDataURL(audioBlob);
        } catch (err) {
          console.error('Audio processing error:', err);
          setError('Błąd podczas przetwarzania audio');
        }

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        setIsListening(false);
      };

      mediaRecorder.start();
    } catch (err) {
      console.error('Microphone access error:', err);
      setError('Brak dostępu do mikrofonu');
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    error
  };
};