import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Box, Button } from "@mui/material"

import BasicSelect from "./Select"

export default function GameMenu({
  resetGame,
  character,
  setCharacter,
  difficulty,
  setDifficulty
}: {
  resetGame: MouseEventHandler,
  character: string,
  setCharacter: Dispatch<SetStateAction<string>>,
  difficulty: string,
  setDifficulty: Dispatch<SetStateAction<string>>
}) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Button
        onClick={resetGame}
        sx={{
          borderRadius: '0.5rem',
          border: '1px solid transparent',
          padding: '0.5rem 1rem',
          margin: '1rem',
          fontSize: '1em',
          fontWeight: '500',
          fontFamily: 'inherit',
          color: 'black',
          backgroundColor: 'white',
          transition: 'border-color 0.25s',
          '&:hover': {
            backgroundColor: 'white',
            borderColor: '#646cff'
          }
        }}
      >
        New Game
      </Button>
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
  )
}
