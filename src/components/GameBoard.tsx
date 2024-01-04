import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import './Gameboard.css'
// import { generateRandomCoordinates } from '../helperFunctions';

type Cell = "empty" | "snake" | "food";
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type MapCoordinates = Array<[number, number]>;
const gridSize = 25;

const generateRandomCoordinates = (gridSize: number): MapCoordinates => {
  const randomRow = Math.floor(Math.random() * gridSize);
  const randomCol = Math.floor(Math.random() * gridSize);
  return [[randomRow, randomCol]];
}

export default function GameBoard() {
  let initialSnakePosition: MapCoordinates = [[12, 13]]
  // let snakeHead = 0;

  const [snakePosition, setSnakePosition] = useState<MapCoordinates>(initialSnakePosition);
  const [snakeBody, setSnakeBody] = useState<Array<[number,number]>>([])
  const [snakeDirection, setSnakeDirection] = useState<Direction>('UP');
  const [foodPosition, setFoodPosition] = useState<MapCoordinates>([[10, 10]])
  // const [superheroMode, setSuperheroMode] = useState<Boolean>(false);
  const [lost, setLost] = useState<Boolean>(false);

  let grid: Cell[][] = [...Array(gridSize)].map(() =>
    [...Array(gridSize)].map(() => "empty")
  )

  let gridWithSnake = grid;

  snakePosition.forEach(([row, col]) => {
    gridWithSnake[row][col] = "snake";
  })

  foodPosition.forEach(([row, col]) => {
    gridWithSnake[row][col] = "food"
  })
  
  snakeBody.forEach(([row, col]) => {
    gridWithSnake[row][col] = "snake";
  })

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
    const intervalId = setInterval(() => {
      // Update snake position based on the direction
      setSnakePosition((prevSnakePosition) => {
        const [headRow, headCol] = prevSnakePosition[0];
        const [foodRow, foodCol] = foodPosition[0]

        if (headRow === foodRow && headCol === foodCol) {
          console.log('chomp chomp chomp');
          setFoodPosition(() => generateRandomCoordinates(gridSize));
          setSnakeBody((prevSnakeBody) => [prevSnakePosition[0], ...prevSnakeBody])
        }

        console.log(snakeBody)

        let newSnakePosition: MapCoordinates;

        // Check if the head will be out of bounds
        if (headRow - 1 < 0 || headRow + 1 >= gridSize || headCol - 1 < 0 || headCol + 1 >= gridSize) {
          setLost(true);
          clearInterval(intervalId); // Clear the interval immediately when the game is lost
          return prevSnakePosition; // Return the current position to prevent further movement
        }

        // Calculate the new snake position based on the direction
        switch (snakeDirection) {
          case 'UP':
            newSnakePosition = [[headRow - 1 < 0 ? gridSize - 1 : headRow - 1, headCol], ...prevSnakePosition.slice(0, -1)];
            break;
          case 'DOWN':
            newSnakePosition = [[headRow + 1 >= gridSize ? 0 : headRow + 1, headCol], ...prevSnakePosition.slice(0, -1)];
            break;
          case 'LEFT':
            newSnakePosition = [[headRow, headCol - 1 < 0 ? gridSize - 1 : headCol - 1], ...prevSnakePosition.slice(0, -1)];
            break;
          case 'RIGHT':
            newSnakePosition = [[headRow, headCol + 1 >= gridSize ? 0 : headCol + 1], ...prevSnakePosition.slice(0, -1)];
            break;
          default:
            newSnakePosition = prevSnakePosition;
            break;
        }

        return newSnakePosition;
      });
    }, 200);

    return () => clearInterval(intervalId);
  }, [snakeDirection]);

  return (
    <Box>
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
