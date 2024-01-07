import { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import './Gameboard.css'
import BasicSelect from './Select';
import CustomButton from './CustomButton';
// import { generateRandomCoordinates } from '../helperFunctions';

type Character = "SNAKE" | "WORM"
type Difficulty = "NORMAL" | "HARD" | "EASY"
type Cell = "EMPTY" | "SNAKE" | "FOOD";
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type MapCoordinates = [number, number];
type SnakeCoordinates = Array<[number, number]>;
const gridSize = 30;

const generateRandomCoordinates = (gridSize: number): MapCoordinates => {
  const randomX = Math.floor(Math.random() * (gridSize - 2) + 1);
  const randomY = Math.floor(Math.random() * (gridSize - 2) + 1);
  return [randomX, randomY];
}

export default function GameBoard() {
  const [character, setCharacter] = useState<Character>('SNAKE');
  const [difficulty, setDifficulty] = useState<Difficulty>('NORMAL');

  let initialSnakePosition: SnakeCoordinates = [[2, 2]];
  let initialDirection: Direction = "DOWN";
  let initialFoodPosition: MapCoordinates = [4, 2];

  const [snakePosition, setSnakePosition] = useState<SnakeCoordinates>(initialSnakePosition);
  const [snakeDirection, setSnakeDirection] = useState<Direction>(initialDirection);
  const [foodPosition, setFoodPosition] = useState<MapCoordinates>(initialFoodPosition)
  const [score, setScore] = useState<number>(0);
  const [lost, setLost] = useState<Boolean>(false);

  let grid: Cell[][] = [...Array(gridSize)].map(() =>
    [...Array(gridSize)].map(() => "EMPTY")
  )

  let gridWithSnake = grid;

  snakePosition.forEach(([x, y]) => {
    gridWithSnake[x][y] = "SNAKE";
  })

  gridWithSnake[foodPosition[0]][foodPosition[1]] = "FOOD";

  const resetGame = () => {
    setLost(false);
    setScore(0);
    setSnakePosition(initialSnakePosition);
    setSnakeDirection(initialDirection);
    setFoodPosition(initialFoodPosition);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        setSnakeDirection("UP");
        break;
      case "ArrowDown":
        setSnakeDirection("DOWN");
        break;
      case "ArrowLeft":
        setSnakeDirection("LEFT");
        break;
      case "ArrowRight":
        setSnakeDirection("RIGHT");
        break;
      case " ":
        resetGame();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  useEffect(() => {
    // game interval
    const intervalId = setInterval(() => {
      setSnakePosition((prevSnakePosition) => {
        let snakeBody = snakePosition.slice(1);
        let snakeHead = snakePosition[0];

        const [foodRow, foodCol] = foodPosition;

        // crash into self logic
        if (difficulty !== "EASY" && (snakeBody.some((bodyPart) => bodyPart[0] === snakeHead[0] && bodyPart[1] === snakeHead[1]))) {
          setLost(true);
          clearInterval(intervalId);
          return prevSnakePosition;
        }

        // out of bounds logic
        if (difficulty !== "EASY" && (snakeHead[0] < 1 || snakeHead[0] >= gridSize - 1 || snakeHead[1] < 1 || snakeHead[1] >= gridSize - 1)) {
          setLost(true);
          clearInterval(intervalId); // Clear the interval immediately when the game is lost
          return prevSnakePosition; // Return the current position to prevent further movement
        }

        // consume food logic
        if (snakeHead[0] === foodRow && snakeHead[1] === foodCol) {
          setScore((prevScore) => prevScore + 1);
          setFoodPosition(() => generateRandomCoordinates(gridSize));
        }

        let newSnakePosition: SnakeCoordinates;

        // calculate the new snake position based on the direction
        switch (snakeDirection) {
          case 'UP':
            if (difficulty === 'EASY') {
              newSnakePosition = [[snakeHead[0] - 1 < 0 ? gridSize - 1 : snakeHead[0] - 1, snakeHead[1]], ...prevSnakePosition.slice(0, score)]
              break;
            }
            newSnakePosition = [[snakeHead[0] - 1, snakeHead[1]], ...prevSnakePosition.slice(0, score)];
            break;
          case 'DOWN':
            if (difficulty === 'EASY') {
              newSnakePosition = [[snakeHead[0] + 1 >= gridSize ? 0 : snakeHead[0] + 1, snakeHead[1]], ...prevSnakePosition.slice(0, score)];
              break;
            }
            newSnakePosition = [[snakeHead[0] + 1, snakeHead[1]], ...prevSnakePosition.slice(0, score)];
            break;
          case 'LEFT':
            if (difficulty === 'EASY') {
              newSnakePosition = [[snakeHead[0], snakeHead[1] - 1 < 0 ? gridSize - 1 : snakeHead[1] - 1], ...prevSnakePosition.slice(0, score)];
              break;
            }
            newSnakePosition = [[snakeHead[0], snakeHead[1] - 1], ...prevSnakePosition.slice(0, score)];
            break;
          case 'RIGHT':
            if (difficulty === 'EASY') {
              newSnakePosition = [[snakeHead[0], snakeHead[1] + 1 >= gridSize ? 0 : snakeHead[1] + 1], ...prevSnakePosition.slice(0, score)];
              break;
            }
            newSnakePosition = [[snakeHead[0], snakeHead[1] + 1], ...prevSnakePosition.slice(0, score)];
            break;
          default:
            newSnakePosition = prevSnakePosition;
            break;
        }

        return newSnakePosition;
      });
    }, difficulty === "HARD" ? 10 : 80);

    return () => clearInterval(intervalId);
  }, [snakeDirection, snakePosition, score]);

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: '1fr'
    }}>
      <Box>
        {gridWithSnake.map((row, rowIdx) =>
          <Box
            key={rowIdx}
            sx={{
              display: 'flex',
            }}
          >
            {row.map((cell, cellIdx) => {
              return (
                <Box
                  key={cellIdx}
                  sx={{
                    backgroundColor: rowIdx === 0 || rowIdx === gridSize - 1 || cellIdx === 0 || cellIdx === gridSize - 1 ? "#ECEDFC" : cell === "FOOD" ? '#FECF49' : cell === "SNAKE" && character === "SNAKE" ? 'green' : cell === "SNAKE" && character === "WORM" ? '#c3816e' : '#f9f9f7',
                    height: '1rem',
                    width: '1rem',
                  }}>
                </Box>
              )
            })}
          </Box>
        )}
        <Typography>Score: {score.toString()}</Typography>
        <Typography fontWeight={'bold'} sx={{ visibility: lost ? 'visible' : 'hidden' }}>GAME OVER - space to reset.</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <CustomButton
          name={'New Game'}
          clickHandler={resetGame}
        />

        <BasicSelect
          name={'Character'}
          value={character}
          options={['SNAKE', 'WORM']}
          setState={setCharacter}
        />

        <BasicSelect
          name={'Difficulty'}
          value={difficulty}
          options={['EASY', 'NORMAL', 'HARD']}
          setState={setDifficulty}
        />
      </Box>
    </Box >
  )
}

// switch (snakeDirection) {
//   case 'UP':
//     newSnakePosition = [[headRow - 1 < 0 ? gridSize - 1 : headRow - 1, headCol], ...prevSnakePosition.slice(0, -1)];
//     break;
//   case 'DOWN':
//     newSnakePosition = [[headRow + 1 >= gridSize ? 0 : headRow + 1, headCol], ...prevSnakePosition.slice(0, -1)];
//     break;
//   case 'LEFT':
//     newSnakePosition = [[headRow, headCol - 1 < 0 ? gridSize - 1 : headCol - 1], ...prevSnakePosition.slice(0, -1)];
//     break;
//   case 'RIGHT':
//     newSnakePosition = [[headRow, headCol + 1 >= gridSize ? 0 : headCol + 1], ...prevSnakePosition.slice(0, -1)];
//     break;
//   default:
//     newSnakePosition = prevSnakePosition;
//     break;
// }