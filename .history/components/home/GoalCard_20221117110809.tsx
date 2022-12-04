import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { GoalItem } from '../../../interfaces/GoalItem';
import Lottie from 'react-lottie-player';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface GoalCradProps {
  card: GoalItem;
  cardColors: (colors: object) => void;
  keyProp: number;
  timeline: gsap.core.Timeline;
}

export const GoalCard = (props: GoalCradProps) => {
  const theme = useTheme();
  const { card, keyProp, timeline } = props;
  //console.log(timeline);

  const refItem = useRef(null);

  return (
    <Box
      ref={refItem}
      className={`goal-card`}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          mb: { xs: theme.spacing(5), md: 0 },
          gap: theme.spacing(13),
        }}
      >
        <Box
          className={`goal-card-icon`}
          sx={{
            width: '450px',
            height: '450px',
            borderRadius: '50px',
            backgroundImage: `linear-gradient(135deg, ${card.colors.color1} 0%, ${card.colors.color2} 100%)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Lottie
            path={card.animation.mediaItemUrl}
            loop
            play
            style={{ width: 300, height: 300 }}
          />
        </Box>
        {/* <Box className={`goal-card-text`}>
          <Typography
            variant="h2"
            component="h3"
            sx={{
              mb: theme.spacing(5),
              background: `linear-gradient(to right,${card.colors.color1} , ${card.colors.color2} )`,
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
          >
            {card.title}
          </Typography>
          <Typography
            variant="h4"
            color={theme.palette.text.secondary}
            component="div"
            sx={{ maxWidth: 500 }}
          >
            {card.description}
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};
