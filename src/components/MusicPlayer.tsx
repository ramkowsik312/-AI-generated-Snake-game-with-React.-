import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { motion } from 'motion/react';

const TRACKS = [
  { id: 1, title: 'SYNTH_WAVE_01.mp3', artist: 'NEON_GEN', duration: '3:42' },
  { id: 2, title: 'GLITCH_CORE_BETA.wav', artist: 'VOID_WALKER', duration: '2:15' },
  { id: 3, title: 'CYBER_PUNK_FINAL.flac', artist: 'DATA_GHOST', duration: '4:08' },
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(p => (p + 0.5) % 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-md cyan-magenta-border bg-black p-6 screen-tear">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-black flex items-center justify-center cyan-magenta-border">
          <Music className={`w-6 h-6 ${isPlaying ? 'text-magenta-500' : 'text-cyan-400'}`} />
        </div>
        <div className="flex-1 overflow-hidden">
          <motion.div 
            key={currentTrack.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glitch-text pixel-font text-[10px] truncate"
            data-text={currentTrack.title}
          >
            {currentTrack.title}
          </motion.div>
          <div className="text-[8px] text-magenta-500 pixel-font mt-1 opacity-70">
            SRC: {currentTrack.artist}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative h-2 bg-cyan-900 w-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-magenta-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-[8px] text-cyan-400 pixel-font">
          <span>T: 00:{Math.floor(progress * 0.6).toString().padStart(2, '0')}</span>
          <span>LEN: {currentTrack.duration}</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button onClick={prevTrack} className="text-cyan-400 hover:text-magenta-500 transition-none">
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-cyan-400 text-black hover:bg-magenta-500 transition-none cyan-magenta-border"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>

          <button onClick={nextTrack} className="text-cyan-400 hover:text-magenta-500 transition-none">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-cyan-900">
          <Volume2 size={12} className="text-cyan-400" />
          <div className="flex-1 h-1 bg-cyan-900 relative">
            <div className="absolute top-0 left-0 h-full w-3/4 bg-magenta-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
