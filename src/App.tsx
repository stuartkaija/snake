import { Box, Typography } from '@mui/material';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';

function App() {
  return (
    <Box
      component={'main'}
      textAlign={'center'}
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Typography variant='h1' fontFamily={'Basteleur'} fontSize={'3rem'} fontWeight={'bold'} lineHeight={'1.1'} margin={'0rem 0rem 1rem'}>Snake</Typography>
      <GameBoard/>
      <Footer/>
    </Box>
  )
}

export default App
