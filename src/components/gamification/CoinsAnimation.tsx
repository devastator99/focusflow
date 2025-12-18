import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCoins } from "react-icons/fa";

interface CoinsAnimationProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
  onComplete?: () => void;
}

export const CoinsAnimation = ({
  amount,
  size = 'md',
  delay = 0,
  onComplete
}: CoinsAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  useEffect(() => {
    // Play coin sound effect
    audioRef.current = new Audio('/sounds/coin-collect.mp3');
    const playSound = setTimeout(() => {
      audioRef.current?.play().catch(e => console.log('Audio play failed:', e));
    }, 100);

    // Auto-hide after animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(playSound);
      audioRef.current?.pause();
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`flex items-center gap-2 font-bold ${sizeClasses[size]} text-yellow-500`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: -30, 
            scale: 1.2,
            transition: { 
              duration: 0.5, 
              delay,
              ease: [0.2, 0.8, 0.2, 1] 
            } 
          }}
          exit={{ 
            opacity: 0, 
            y: -50, 
            scale: 0.5,
            transition: { 
              duration: 0.3,
              ease: 'easeIn'
            } 
          }}
        >
          <motion.span
            animate={{
              rotateY: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'loop',
              delay: 0.1,
            }}
          >
            <FaCoins className="text-yellow-400" />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                delay: 0.2,
                duration: 0.3 
              } 
            }}
          >
            +{amount}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Usage example:
// <CoinsAnimation 
//   amount={5} 
//   size="md" 
//   delay={0.2}
//   onComplete={() => console.log('Animation complete')}
// />
