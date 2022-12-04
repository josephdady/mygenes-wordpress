//import styles from './styles.module.scss';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

import { relativePath } from '../../lib/utils';
import ButtonPrimary from '../ButtonPrimary';
import LottiePlayer from '../LottiePlayer';
import animationData from '../../assets/lotties/header.json';

interface HeroProps {
  hero: any;
}

export const Hero = (props: HeroProps) => {
  const theme = useTheme();
  const { hero } = props;
  const styles = {
    animWrapper: {
      position: 'absolute',
      top: '50%',
      transform: ' translateY(-50%)',
      width: '50%',
      right: 0,
    },
  };

  return (
    <Box position={'relative'}>
      <Container
        sx={{
          height: { xs: 'block', md: 'calc(100vh - 64px)' },
          marginBottom: theme.spacing(4),
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            marginTop: theme.spacing(4),
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography component={'div'} variant="h1">
              <Box dangerouslySetInnerHTML={{ __html: hero.heading1 }}></Box>
              <Box
                sx={{ color: theme.palette.primary.main }}
                dangerouslySetInnerHTML={{ __html: hero.heading2 }}
              ></Box>
            </Typography>
            <Box
              sx={{
                marginTop: theme.spacing(4),
              }}
            ></Box>
            <Typography
              component={'div'}
              sx={{
                marginInlineEnd: { xs: 'none', md: theme.spacing(24) },
                color: theme.palette.text.secondary,
              }}
              variant="subtitle1"
              dangerouslySetInnerHTML={{ __html: hero.text }}
            ></Typography>
            <Box
              sx={{
                marginTop: theme.spacing(4),
              }}
            ></Box>

            <ButtonPrimary href={relativePath(hero.cta.url)}>
              {hero.cta.title}
            </ButtonPrimary>
          </Box>
          <Box
            sx={{
              position: 'relative',
              flex: 1,
              height: '100%',
              display: { xs: 'none', md: 'block' },
            }}
          ></Box>
        </Box>
      </Container>
      <Box sx={styles.animWrapper}>
        <LottiePlayer animationData={animationData} play={true} />
      </Box>
    </Box>
  );
};
