import React from 'react';
import { motion } from 'motion/react';

interface ThoranamProps {
  className?: string;
  variant?: 'page' | 'card';
}

export const Thoranam: React.FC<ThoranamProps> = ({ className = '', variant = 'page' }) => {
  const isCard = variant === 'card';

  return (
    <div className={`w-full overflow-hidden select-none pointer-events-none relative ${className}`}>
      {/* Layer 1: Top Mango Leaves Festoon Band (పచ్చని మామిడాకులు & స్వర్ణ తోరణం) */}
      <div className={`w-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 border-b border-amber-400/80 shadow-xs flex items-center justify-around overflow-hidden px-1 ${
        isCard ? 'h-2 sm:h-2.5' : 'h-3 sm:h-3.5'
      }`}>
        {Array.from({ length: isCard ? 20 : 36 }).map((_, i) => (
          <div key={i} className="flex items-center gap-1 opacity-90">
            <svg
              className={`${isCard ? 'w-2.5 h-2' : 'w-3 h-2.5'} text-emerald-400 fill-current transform -rotate-12`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8 6 4 12 4 18c0 3.3 2.7 6 6 6s6-2.7 6-6c0-6-4-12-4-16z" />
            </svg>
            <span className={`${isCard ? 'w-1 h-1' : 'w-1.5 h-1.5'} rounded-full bg-amber-300`} />
          </div>
        ))}
      </div>

      {/* Layer 2: Delicate Horizontal Spreading Garland Chains (చిన్న బంతిపూల తోరణం) */}
      <motion.div
        animate={{
          y: [0, -1.5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`w-full flex items-start justify-center overflow-hidden ${
          isCard ? 'h-11 sm:h-13' : 'h-14 sm:h-18 lg:h-20'
        }`}
      >
        {/* Repeating seamless garland tiles across the entire width */}
        <div className="w-full flex items-start justify-center gap-0 opacity-95">
          {Array.from({ length: isCard ? 4 : 7 }).map((_, idx) => (
            <div
              key={idx}
              className={`shrink-0 overflow-hidden ${
                isCard ? 'w-36 h-12 sm:w-44 sm:h-14' : 'w-48 h-16 sm:w-56 sm:h-20'
              }`}
            >
              <img
                src="/assets/aistudio/image_193fc5fa.png"
                alt="Delicate Marigold Flower Garland"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-top filter contrast-105"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
