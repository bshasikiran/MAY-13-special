import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface MusicVisualizationProps {
  isPlaying: boolean;
}

const MusicVisualization = ({ isPlaying }: MusicVisualizationProps) => {
  const [bars, setBars] = useState<number[]>(Array(10).fill(0));
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      // Animate bars when music is playing
      const animateBars = () => {
        setBars(prevBars => 
          prevBars.map(() => Math.random() * 20 + 4)
        );
      };

      // Start animation
      animateBars();
      intervalRef.current = window.setInterval(animateBars, 200);
    } else {
      // Clear interval when not playing
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Reset bars to small random heights
      setBars(Array(10).fill(0).map(() => Math.random() * 5 + 2));
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="music-visualization-container flex justify-center items-center h-20 w-full max-w-md mx-auto">
      <div className="visualization-bars flex items-end justify-center space-x-1 h-full w-full">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            className={`visualization-bar ${index < 5 ? 'bg-primary' : 'bg-secondary'} opacity-70 w-1 rounded-t transform transition-all duration-200`}
            animate={{ height: `${height}px` }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicVisualization;
