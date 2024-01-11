import { useEffect, Dispatch, SetStateAction } from 'react';
import { Box, Typography } from '@mui/material';
import type { Cell, Direction, MapCoordinates, SnakeCoordinates } from '../types';

const gridSize = 30;

const generateRandomCoordinates = (gridSize: number): MapCoordinates => {
  const randomX = Math.floor(Math.random() * (gridSize - 2) + 1);
  const randomY = Math.floor(Math.random() * (gridSize - 2) + 1);
  return [randomX, randomY];
}

export default function GameBoard({
  character,
  difficulty,
  snakePosition,
  setSnakePosition,
  snakeDirection,
  setSnakeDirection,
  foodPosition,
  setFoodPosition,
  score,
  setScore,
  lost,
  setLost,
  resetGame
}: {
  character: string,
  difficulty: string,
  snakePosition: SnakeCoordinates,
  setSnakePosition: Dispatch<SetStateAction<SnakeCoordinates>>
  snakeDirection: Direction
  setSnakeDirection: Dispatch<SetStateAction<Direction>>
  foodPosition: MapCoordinates
  setFoodPosition: Dispatch<SetStateAction<MapCoordinates>>
  score: number
  setScore: Dispatch<SetStateAction<number>>
  lost: boolean
  setLost: Dispatch<SetStateAction<boolean>>
  resetGame: Function
}) {

  let grid: Cell[][] = [...Array(gridSize)].map(() =>
    [...Array(gridSize)].map(() => "EMPTY")
  )

  let gridWithSnake = grid;

  snakePosition.forEach(([x, y]) => {
    gridWithSnake[x][y] = "SNAKE";
  })

  gridWithSnake[foodPosition[0]][foodPosition[1]] = "FOOD";

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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
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
      </Box>
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }}>
        <Typography>Score: {score.toString()}</Typography>
        <Typography fontSize={'1.25rem'} fontWeight={'bold'} sx={{ visibility: lost ? 'visible' : 'hidden' }}>GAME OVER - space to reset.</Typography>
      </Box>
    </Box >
  )
}