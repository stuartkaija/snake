import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import './Gameboard.css'
// import { generateRandomCoordinates } from '../helperFunctions';

type Cell = "empty" | "snake" | "food";
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type MapCoordinates = [number, number];
type SnakeCoordinates = Array<[number, number]>;
const gridSize = 25;

const generateRandomCoordinates = (gridSize: number): MapCoordinates => {
  const randomX = Math.floor(Math.random() * gridSize);
  const randomY = Math.floor(Math.random() * gridSize);
  return [randomX, randomY];
}

export default function GameBoard() {

  const [snakePosition, setSnakePosition] = useState<SnakeCoordinates>([[1, 1]]);
  const [snakeDirection, setSnakeDirection] = useState<Direction>('DOWN');
  const [foodPosition, setFoodPosition] = useState<MapCoordinates>([3, 1])
  const [score, setScore] = useState<number>(0);
  const [lost, setLost] = useState<Boolean>(false);

  let grid: Cell[][] = [...Array(gridSize)].map(() =>
    [...Array(gridSize)].map(() => "empty")
  )

  let gridWithSnake = grid;

  snakePosition.forEach(([x, y]) => {
    gridWithSnake[x][y] = "snake";
  })

  gridWithSnake[foodPosition[0]][foodPosition[1]] = "food";

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
    console.log('RE RENDER')
    const intervalId = setInterval(() => {
      // Update snake position based on the direction
      setSnakePosition((prevSnakePosition) => {
        const [headRow, headCol] = prevSnakePosition[0];
        const [foodRow, foodCol] = foodPosition;
        console.log(headRow, headCol)
        // Check if the head will be out of bounds
        if (headRow <= 0 || headRow >= gridSize - 1 || headCol <= 0 || headCol >= gridSize - 1) {
          setLost(true);
          clearInterval(intervalId); // Clear the interval immediately when the game is lost
          return prevSnakePosition; // Return the current position to prevent further movement
        }

        if (headRow === foodRow && headCol === foodCol) {
          console.log('chomp chomp chomp');
          setScore((prevScore) => prevScore + 1);
          setFoodPosition(() => generateRandomCoordinates(gridSize));
        }

        let newSnakePosition: SnakeCoordinates;

        // Calculate the new snake position based on the direction
        switch (snakeDirection) {
          case 'UP':
            newSnakePosition = [[headRow - 1, headCol], ...prevSnakePosition.slice(0, score)];
            break;
          case 'DOWN':
            newSnakePosition = [[headRow + 1, headCol], ...prevSnakePosition.slice(0, score)];
            break;
          case 'LEFT':
            newSnakePosition = [[headRow, headCol - 1], ...prevSnakePosition.slice(0, score)];
            break;
          case 'RIGHT':
            newSnakePosition = [[headRow, headCol + 1], ...prevSnakePosition.slice(0, score)];
            break;
          default:
            newSnakePosition = prevSnakePosition;
            break;
        }

        return newSnakePosition;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [snakeDirection, score]);

  return (
    <Box>
      <Typography>Score: {score.toString()}</Typography>
      {lost && <Typography>You lost!</Typography>}
      {gridWithSnake.map((row, rowIdx) => (
        <Box key={rowIdx} sx={{ display: 'flex' }}>
          {row.map((cell, cellIdx) => (
            <Box key={cellIdx} sx={{ backgroundColor: cell === "food" ? '#FECF49' : cell === "snake" ? 'green' : '#f9f9f7', height: '1rem', width: '1rem', border: '1px solid #E3F0F7' }}></Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
