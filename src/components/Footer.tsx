import { Box, Typography, Link } from '@mui/material';
import LinkedInIcon from '../assets/icons/linked-in-icon.png';
import GitHubIcon from '../assets/icons/github-mark.png';

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box>
        <Link
          href='https://www.linkedin.com/in/stuartkaija'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Box
            component='img'
            src={LinkedInIcon}
            alt='LinkedIn icon'
            height={32}
            mr={0.5}
            sx={{
              filter: 'grayscale(100%) brightness(0%)',
              ':hover': {
                filter: 'grayscale(100%) brightness(100%)',
              }
            }}
          />
        </Link>
        <Link
          href='https://www.github.com/stuartkaija/snake'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Box
            component='img'
            src={GitHubIcon}
            alt='GitHub icon'
            height={32}
            ml={0.5}
            sx={{
              filter: 'grayscale(100%) brightness(0%)',
              ':hover': {
                filter: 'opacity(60%)'
              }
            }}
          />
        </Link>
      </Box>
      <Typography fontSize={'0.85rem'}>Built by Stuart Kaija</Typography>
    </Box>
  )
}
