import { useState, useEffect } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import BackgroundEffects from '@/components/BackgroundEffects';
import LyricsDisplay from '@/components/LyricsDisplay';
import MusicVisualization from '@/components/MusicVisualization';
import LoadingOverlay from '@/components/LoadingOverlay';
import { motion } from 'framer-motion';

// Lyrics timing data
const lyrics = [
  { text: "Main Tera Hoya", startTime: 0, endTime: 3 },
  { text: "Sambhal Le Tu Mainu Mainu", startTime: 3, endTime: 6 },
  { text: "Main Tera Hoya", startTime: 6, endTime: 9 },
  { text: "Sambhal Le Tu Mainu", startTime: 9, endTime: 12 },
  { text: "Meri Na Hoyi", startTime: 12, endTime: 15 },
  { text: "Khayal Aune Tenu Tenu", startTime: 15, endTime: 18 },
  { text: "Main Tera Hoya", startTime: 18, endTime: 21 },
  { text: "Sambhal Le Tu Mainu Mainu", startTime: 21, endTime: 24 },
  { text: "Main Tera Hoya", startTime: 24, endTime: 27 }
];

const KhayaalSongPath = '/api/song';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // Default duration
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time for initial experience
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Handle audio time update
  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  // Handle audio end
  const handleAudioEnd = () => {
    setCurrentTime(0);
  };

  // Update favicon dynamically
  useEffect(() => {
    // Create a favicon link element
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.setAttribute('rel', 'icon');
    favicon.setAttribute('href', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">❤️</text></svg>');
    document.head.appendChild(favicon);

    // Set the title
    document.title = "Khayaal - Romantic Lyrics Visualization";
  }, []);

  return (
    <div className="bg-gradient min-h-screen font-sans text-light overflow-hidden">
      {/* Background Elements */}
      <BackgroundEffects />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Header Section */}
        <motion.header 
          className="text-center mb-12 mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-2 text-primary text-glow">Khayaal</h1>
          <p className="text-light-dimmed text-lg md:text-xl font-light">Talwiinder</p>
        </motion.header>

        {/* Lyrics Visualization */}
        <LyricsDisplay 
          currentTime={currentTime}
          isPlaying={isPlaying}
          lyrics={lyrics}
        />

        {/* Music Visualization */}
        <MusicVisualization isPlaying={isPlaying} />
      </main>

      {/* Audio Player */}
      <AudioPlayer 
        audioSrc={KhayaalSongPath} 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onTimeUpdate={handleTimeUpdate}
        duration={duration}
        onEnded={handleAudioEnd}
      />

      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}
