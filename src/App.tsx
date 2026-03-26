/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Terminal, Cpu, Zap, Activity } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="noise-overlay" />
      <div className="scanline" />
      
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 screen-tear"><Cpu size={120} /></div>
        <div className="absolute bottom-20 right-20 screen-tear"><Zap size={150} /></div>
        <div className="absolute top-1/2 right-10 screen-tear"><Activity size={100} /></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
        <div className="flex flex-col">
          <h1 className="text-sm pixel-font glitch-text text-cyan-400" data-text="NEON_GLITCH_OS_v0.4.2">
            NEON_GLITCH_OS_v0.4.2
          </h1>
          <div className="text-[8px] text-magenta-500 mt-1 pixel-font opacity-60">
            KERNEL_ID: {Math.random().toString(36).substring(7).toUpperCase()} // NODE: {window.location.hostname}
          </div>
        </div>
        <div className="hidden md:flex gap-4 text-[8px] text-cyan-400 pixel-font">
          <span className="animate-pulse">SIGNAL_LOCKED</span>
          <span>LOAD: 88%</span>
          <span>TEMP: 72C</span>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Sidebar - System Info */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
          <div className="cyan-magenta-border bg-black p-4 text-[8px] pixel-font space-y-2">
            <div className="text-magenta-500 border-b border-cyan-900 pb-1 mb-2">LOG_STREAM</div>
            <div className="text-cyan-900">{`> BOOT_SEQUENCE_INIT...`}</div>
            <div className="text-cyan-900">{`> MEMORY_DUMP_COMPLETE...`}</div>
            <div className="text-cyan-900">{`> OVERRIDE_PROTOCOL_0...`}</div>
            <div className="text-magenta-500">{`> ERROR: BUFFER_OVERFLOW`}</div>
            <div className="text-cyan-900">{`> RE-ROUTING_DATA...`}</div>
            <div className="text-cyan-400 animate-pulse">{`> LISTENING_`}</div>
          </div>
          
          <div className="cyan-magenta-border bg-black p-4">
            <div className="text-[8px] pixel-font text-cyan-400 mb-4">NEURAL_MAP</div>
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className={`h-1 ${Math.random() > 0.4 ? 'bg-magenta-500' : 'bg-cyan-900'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Center - Game */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="screen-tear"
          >
            <SnakeGame />
          </motion.div>
        </div>

        {/* Right Sidebar - Music & Controls */}
        <div className="lg:col-span-3 flex flex-col gap-6 items-center lg:items-end">
          <MusicPlayer />
          
          <div className="w-full cyan-magenta-border bg-black p-4 text-center">
            <div className="text-[8px] pixel-font text-magenta-500 mb-2">WAVE_FORM</div>
            <div className="flex justify-center gap-1 h-10 items-end">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [2, Math.random() * 30 + 2, 2] }}
                  transition={{ repeat: Infinity, duration: 0.3 + Math.random() * 0.5 }}
                  className="w-1 bg-cyan-400"
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-end text-[6px] pixel-font text-cyan-900 pointer-events-none">
        <div>VOID_INDUSTRIES_SECURED_LINK</div>
        <div className="text-right">
          ENCRYPTION: AES_256<br />
          STATUS: UNSTABLE
        </div>
      </footer>
    </div>
  );
}
