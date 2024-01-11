import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import GameBoard from './components/GameBoard';
import GameMenu from './components/GameMenu';
import Footer from './components/Footer';
import type { Direction, MapCoordinates, SnakeCoordinates } from './types';

function App() {
  const [character, setCharacter] = useState<string>('SNAKE');
  const [difficulty, setDifficulty] = useState<string>('NORMAL');

  let initialSnakePosition: SnakeCoordinates = [[2, 2]];
  let initialDirection: Direction = "DOWN";
  let initialFoodPosition: MapCoordinates = [4, 2];

  const [snakePosition, setSnakePosition] = useState<SnakeCoordinates>(initialSnakePosition);
  const [snakeDirection, setSnakeDirection] = useState<Direction>(initialDirection);
  const [foodPosition, setFoodPosition] = useState<MapCoordinates>(initialFoodPosition)
  const [score, setScore] = useState<number>(0);
  const [lost, setLost] = useState<boolean>(false);
  
  const resetGame = () => {
    setLost(false);
    setScore(0);
    setSnakePosition(initialSnakePosition);
    setSnakeDirection(initialDirection);
    setFoodPosition(initialFoodPosition);
  }

  return (
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Box
        component={'div'}
        sx={{
          flexGrow: '1',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'

        }}
      >
        <Typography variant='h1' fontSize={'3rem'} fontWeight={'bold'} lineHeight={'1.1'}>Snake</Typography>
        <GameBoard
          character={character}
          difficulty={difficulty}
          snakePosition={snakePosition}
          setSnakePosition={setSnakePosition}
          snakeDirection={snakeDirection}
          setSnakeDirection={setSnakeDirection}
          foodPosition={foodPosition}
          setFoodPosition={setFoodPosition}
          score={score}
          setScore={setScore}
          lost={lost}
          setLost={setLost}
          resetGame={resetGame}
        />
        <GameMenu
          resetGame={resetGame}
          character={character}
          setCharacter={setCharacter}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
