import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  audioSrc: string;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  onTimeUpdate: (currentTime: number) => void;
  duration: number;
  onEnded: () => void;
}

const AudioPlayer = ({ 
  audioSrc, 
  isPlaying, 
  setIsPlaying, 
  onTimeUpdate, 
  duration,
  onEnded 
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set up audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        onTimeUpdate(audio.currentTime);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded();
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate, setIsPlaying, onEnded]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;
    
    if (!progressBar || !audio || !isLoaded) return;
    
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = Math.max(0, Math.min(audio.duration, pos * audio.duration));
    
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeSlider = e.currentTarget;
    const rect = volumeSlider.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, pos));
    
    setVolume(newVolume);
    
    if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    } else if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePrevious = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Go back 5 seconds or to the beginning
    audio.currentTime = Math.max(0, audio.currentTime - 5);
  };

  const handleNext = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Skip forward 5 seconds
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" autoPlay className="hidden" />
      
      <div className="audio-player fixed bottom-0 left-0 right-0 bg-dark-lighter bg-opacity-70 border-t border-gray-800 px-4 py-3 z-20">
        <div className="mx-auto max-w-4xl">
          {/* Progress Bar */}
          <div 
            className="progress-bar mb-3 rounded-full overflow-hidden" 
            ref={progressBarRef}
            onClick={handleSeek}
          >
            <motion.div 
              className="progress-fill" 
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            {/* Song Info */}
            <div className="flex items-center">
              {/* Album Art */}
              <div className="h-12 w-12 rounded overflow-hidden mr-3 hidden sm:block">
                <img 
                  src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" 
                  alt="Khayaal Album Art" 
                  className="h-full w-full object-cover" 
                />
              </div>
              
              <div>
                <p className="text-light font-medium text-sm">Khayaal</p>
                <p className="text-light-dimmed text-xs">Talwiinder</p>
              </div>
            </div>
            
            {/* Playback Controls */}
            <div className="flex items-center space-x-4">
              <button 
                className="text-light-dimmed hover:text-primary transition-colors" 
                onClick={handlePrevious}
              >
                <i className="fas fa-step-backward"></i>
              </button>
              
              <motion.button 
                className="bg-primary hover:bg-opacity-90 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
                onClick={handlePlayPause}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <i className="fas fa-pause"></i>
                ) : (
                  <i className="fas fa-play"></i>
                )}
              </motion.button>
              
              <button 
                className="text-light-dimmed hover:text-primary transition-colors"
                onClick={handleNext}
              >
                <i className="fas fa-step-forward"></i>
              </button>
            </div>
            
            {/* Volume Control */}
            <div className="volume-control">
              <button 
                className="text-light-dimmed hover:text-primary transition-colors"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <i className="fas fa-volume-mute"></i>
                ) : (
                  <i className="fas fa-volume-up"></i>
                )}
              </button>
              
              <div 
                className="volume-slider" 
                onClick={handleVolumeChange}
              >
                <div 
                  className="volume-fill" 
                  style={{ width: isMuted ? '0%' : `${volumePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
