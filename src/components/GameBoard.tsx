import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import './Gameboard.css'
// import { generateRandomCoordinates } from '../helperFunctions';

type Cell = "empty" | "snake" | "food";
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type MapCoordinates = [number, number];
type SnakeCoordinates = Array<[number, number]>;
const gridSize = 20;

const generateRandomCoordinates = (gridSize: number): MapCoordinates => {
  const randomX = Math.floor(Math.random() * (gridSize - 2) + 1);
  const randomY = Math.floor(Math.random() * (gridSize - 2) + 1);
  // console.log(`randomX: ${randomX}, randomY: ${randomY}`)
  return [randomX, randomY];
}

export default function GameBoard() {

  const [snakePosition, setSnakePosition] = useState<SnakeCoordinates>([[2, 2]]);
  const [snakeDirection, setSnakeDirection] = useState<Direction>('DOWN');
  const [foodPosition, setFoodPosition] = useState<MapCoordinates>([4, 2])
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
    let snakeBody = snakePosition.slice(1);
    let snakeHead = snakePosition[0];

    if (snakeBody.some((bodyPart) => bodyPart[0] === snakeHead[0] && bodyPart[1] === snakeHead[1])) {
      console.log('CRASH!')
      setLost(true);
    }

  }, [snakePosition])

  useEffect(() => {
    // console.log('RE RENDER')
    const intervalId = setInterval(() => {
      // Update snake position based on the direction
      setSnakePosition((prevSnakePosition) => {
        const [headRow, headCol] = prevSnakePosition[0];
        const [foodRow, foodCol] = foodPosition;

        // Check if the head will be out of bounds
        if (headRow < 1 || headRow >= gridSize - 1 || headCol < 1 || headCol >= gridSize - 1) {
          setLost(true);
          clearInterval(intervalId); // Clear the interval immediately when the game is lost
          return prevSnakePosition; // Return the current position to prevent further movement
        }

        // check if head is in same position as body
        // if (snakePosition.slice(1).some((position) => {
        //   // console.log(`position: ${position}}`)
        //   position[0] === headRow || position[1] === headCol
        // })) {
        //   setLost(true);
        //   clearInterval(intervalId);
        //   return prevSnakePosition;
        // }

        if (headRow === foodRow && headCol === foodCol) {
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
    }, 200);

    return () => clearInterval(intervalId);
  }, [snakeDirection, score]);

  return (
    <Box>
      <Typography>Score: {score.toString()}</Typography>
      {lost && <Typography>You lost!</Typography>}
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
                  backgroundColor: rowIdx === 0 || rowIdx === gridSize - 1 || cellIdx === 0 || cellIdx === gridSize - 1 ? "#ECEDFC" : cell === "food" ? '#FECF49' : cell === "snake" ? 'green' : '#f9f9f7',
                  height: '1rem',
                  width: '1rem',
                }}>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
