import { Button } from "@mui/material"
import { MouseEventHandler } from "react"

export default function CustomButton({
   name, clickHandler 
  }: {
    name: string,
    clickHandler: MouseEventHandler
  }) {
  return (
    <Button
      onClick={clickHandler}
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
      {name}
    </Button>
  )
}
