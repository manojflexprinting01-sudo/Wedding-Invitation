import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Wind } from 'lucide-react';
import { Thoranam } from './Thoranam';

interface MotionBackdropProps {
  intensity?: 'subtle' | 'medium' | 'ambient';
}

export const MotionBackdrop: React.FC<MotionBackdropProps> = ({
  intensity = 'subtle',
}) => {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [backdropVisible, setBackdropVisible] = useState(true);

  const opacityClass =
    intensity === 'ambient'
      ? 'opacity-25'
      : intensity === 'medium'
      ? 'opacity-35'
      : 'opacity-20';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Auspicious Traditional Flower Thoranam (మంగళ తోరణం) across the entire top */}
      <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
        <Thoranam variant="page" />
      </div>

      {/* Dynamic Animated T&S Monogram Backdrop Layer */}
      <AnimatePresence>
        {backdropVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className={`absolute inset-0 flex items-center justify-center ${opacityClass}`}
          >
            {/* Soft Warm Radial Lighting */}
            <div className="absolute inset-0 bg-radial from-amber-400/20 via-orange-100/10 to-transparent pointer-events-none" />

            <motion.div
              animate={
                motionEnabled
                  ? {
                      scale: [1, 1.04, 1],
                      y: [-6, 6, -6],
                      rotate: [-0.4, 0.4, -0.4],
                    }
                  : { scale: 1, y: 0, rotate: 0 }
              }
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-[90vw] max-w-[850px] aspect-[3/4] mix-blend-multiply filter contrast-105 select-none"
            >
              <img
                src="/assets/aistudio/wedding_ts_monogram.jpg"
                alt="Tejaswini & Srinivas Royal T&S Monogram"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Controls for Backdrop Motion */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto flex items-center gap-1.5 p-1.5 bg-amber-950/85 hover:bg-amber-950 backdrop-blur-md rounded-full shadow-lg border border-amber-600/30 text-amber-100 text-xs transition-all">
        <button
          onClick={() => setMotionEnabled(!motionEnabled)}
          title={motionEnabled ? "Pause background motion" : "Play background motion"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap font-medium ${
            motionEnabled ? 'bg-amber-500 text-amber-950 shadow-sm' : 'text-amber-200 hover:text-white'
          }`}
        >
          <Wind className={`w-3.5 h-3.5 ${motionEnabled ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{motionEnabled ? 'Motion On' : 'Motion Off'}</span>
        </button>

        <button
          onClick={() => setBackdropVisible(!backdropVisible)}
          title={backdropVisible ? "Hide T&S Monogram Backdrop" : "Show T&S Monogram Backdrop"}
          className="p-1.5 rounded-full text-amber-300 hover:text-white hover:bg-amber-800/60 transition-colors"
        >
          {backdropVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
