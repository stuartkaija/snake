import GameBoard from './components/GameBoard';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <Box
      component={'main'}
      textAlign={'center'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant='h1' fontSize={'3rem'} fontWeight={'bold'} lineHeight={'1.1'} margin={'0rem 0rem 1rem'}>Snake</Typography>
      <GameBoard/>
    </Box>
  )
}

export default App
