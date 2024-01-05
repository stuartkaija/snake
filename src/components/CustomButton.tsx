import { Button } from "@mui/material"

export default function CustomButton({ name, clickHandler }) {

  return (
    <Button
      onClick={clickHandler}
      sx={{
        borderRadius: '0.5rem',
        border: '1px solid transparent',
        padding: '0.5rem 1rem',
        margin: '1rem 0rem',
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
