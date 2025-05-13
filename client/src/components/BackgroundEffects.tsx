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

interface Circle {
  id: number;
  size: number;
  opacity: number;
  animationDuration: number;
}

const BackgroundEffects = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
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

    // Create hypnotic circles
    const newCircles: Circle[] = [];
    const totalCircles = 8;
    
    for (let i = 0; i < totalCircles; i++) {
      newCircles.push({
        id: i,
        size: 100 - (i * (100 / totalCircles)),
        opacity: 0.2 + (i * 0.05),
        animationDuration: 10 + (i * 2)
      });
    }
    
    setCircles(newCircles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden opacity-70 z-0" ref={containerRef}>
      {/* Hypnotic Circles */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {circles.map((circle) => (
          <motion.div
            key={circle.id}
            className="absolute rounded-full border-2 border-primary/20"
            style={{
              width: `${circle.size}%`,
              height: `${circle.size}%`,
              opacity: circle.opacity,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [circle.opacity, circle.opacity * 1.5, circle.opacity],
            }}
            transition={{
              duration: circle.animationDuration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
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
      
      {/* Add a message like in the image */}
      <div className="absolute top-20 w-full text-center z-10">
        <motion.h2 
          className="text-2xl md:text-3xl text-primary/90 font-serif"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          As it's May 13th, I felt like saying:
        </motion.h2>
      </div>
    </div>
  );
};

export default BackgroundEffects;
