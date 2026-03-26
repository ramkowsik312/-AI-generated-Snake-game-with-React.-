import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 100);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = window.setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, gameOver, isPaused]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full px-4 mb-2">
        <div className="text-xs pixel-font glitch-text" data-text={`DATA_STREAM: ${score.toString().padStart(6, '0')}`}>
          DATA_STREAM: {score.toString().padStart(6, '0')}
        </div>
        <div className="text-xs pixel-font text-magenta-500 glitch-text" data-text={`STATUS: ${gameOver ? 'HALTED' : isPaused ? 'STANDBY' : 'ACTIVE'}`}>
          STATUS: {gameOver ? 'HALTED' : isPaused ? 'STANDBY' : 'ACTIVE'}
        </div>
      </div>

      <div className="relative cyan-magenta-border bg-black p-1 screen-tear">
        <div 
          className="grid gap-0 bg-black"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: '400px',
            height: '400px'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.slice(1).some(s => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i}
                className={`w-full h-full ${
                  isSnakeHead ? 'bg-cyan-400' :
                  isSnakeBody ? 'bg-cyan-400 opacity-40' :
                  isFood ? 'bg-magenta-500 animate-pulse' :
                  'bg-transparent'
                }`}
              />
            );
          })}
        </div>

        <AnimatePresence>
          {(gameOver || isPaused) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10"
            >
              {gameOver ? (
                <>
                  <h2 className="text-xl pixel-font text-magenta-500 glitch-text mb-6" data-text="FATAL_ERROR">FATAL_ERROR</h2>
                  <button 
                    onClick={resetGame}
                    className="px-6 py-2 bg-cyan-400 text-black pixel-font text-[10px] hover:bg-magenta-500 transition-none cyan-magenta-border"
                  >
                    RE_INITIALIZE
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl pixel-font text-cyan-400 glitch-text mb-6" data-text="SUSPENDED">SUSPENDED</h2>
                  <button 
                    onClick={() => setIsPaused(false)}
                    className="px-6 py-2 bg-cyan-400 text-black pixel-font text-[10px] hover:bg-magenta-500 transition-none cyan-magenta-border"
                  >
                    RESUME_LINK
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-[8px] text-cyan-900 mt-2 pixel-font">
        [ ARROWS ] : DIR_MOD // [ SPACE ] : STATE_TOGGLE
      </div>
    </div>
  );
};
