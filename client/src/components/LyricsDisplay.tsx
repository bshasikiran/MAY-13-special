import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LyricLine {
  text: string;
  startTime: number;
  endTime: number;
}

interface LyricsDisplayProps {
  currentTime: number;
  isPlaying: boolean;
  lyrics: LyricLine[];
}

const LyricsDisplay = ({ currentTime, isPlaying, lyrics }: LyricsDisplayProps) => {
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);

  useEffect(() => {
    if (!isPlaying) return;

    // Find the current active lyric based on time
    const index = lyrics.findIndex(
      (line) => currentTime >= line.startTime && currentTime < line.endTime
    );

    if (index !== activeLyricIndex) {
      setActiveLyricIndex(index);
    }
  }, [currentTime, lyrics, isPlaying, activeLyricIndex]);

  return (
    <div className="lyrics-container relative w-full max-w-2xl mx-auto text-center my-8">
      <AnimatePresence>
        {lyrics.map((line, index) => (
          <motion.div
            key={index}
            className={`lyrics-line absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              index === activeLyricIndex ? 'active' : 'inactive'
            }`}
            initial={{ opacity: 0, z: -20 }}
            animate={{
              opacity: index === activeLyricIndex ? 1 : 0,
              z: index === activeLyricIndex ? 20 : -20,
            }}
            exit={{ opacity: 0, z: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-2xl md:text-4xl lg:text-5xl font-medium text-light px-4"
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: index === activeLyricIndex ? 1 : 0.9,
                opacity: index === activeLyricIndex ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {line.text}
            </motion.p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LyricsDisplay;
