import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const BackgroundEffects = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create particles when component mounts
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 5,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden opacity-70 z-0" ref={containerRef}>
      {/* Sound Waves */}
      <div className="sound-wave animate-wave opacity-30"></div>
      <div className="sound-wave animate-wave opacity-20" style={{ animationDelay: '2s' }}></div>
      <div className="sound-wave animate-wave opacity-10" style={{ animationDelay: '4s' }}></div>
      
      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518818608552-195ed130cda4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900')",
          backgroundBlendMode: "soft-light"
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
