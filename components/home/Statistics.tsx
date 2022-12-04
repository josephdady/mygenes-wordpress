import {
  createRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Statistic } from '../../interfaces/Statistic';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import LottiePlayer from '../LottiePlayer';
gsap.registerPlugin(ScrollTrigger);

interface StatisticsProps {
  statistics: Statistic;
}
export const Statistics = (props: StatisticsProps) => {
  const {
    statistics: { title, subtitle, cards, disclaimer },
  } = props;
  const container = useRef(null);
  const [graphAnimStat, setGraphAnimStat] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const theme = useTheme();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const graphAnimations = gsap.utils.toArray('.graph-animation');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom 20%',
          toggleActions: 'restart none none none',
          onLeave: () => {
            [false, false, false];
          },
        },
      });

      graphAnimations.forEach((graphAnimation, index) => {
        const el = graphAnimation as HTMLElement;
        initGraphAnimation(el, tl, index);
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const refArr = useRef([]);
  refArr.current = cards.map((item, index) => {
    return refArr.current[index] || createRef();
  });

  const initGraphAnimation = (
    el: HTMLElement,
    tl: gsap.core.Timeline,
    index: number
  ) => {
    tl.to(
      el,
      {
        onStart: () => {
          console.log('update');
          setGraphAnimStat((prev) => {
            const newGraphAnimStat = [...prev];
            newGraphAnimStat[index] = true;
            return newGraphAnimStat;
          });
        },
      },
      index == 0 ? '0' : '+=0.1'
    );
  };

  return (
    <Container ref={container} maxWidth="lg" sx={{ mb: theme.spacing(25) }}>
      <Typography
        variant="h1"
        component="h3"
        align="center"
        sx={{ mb: theme.spacing(5), mt: theme.spacing(10) }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="h3"
        align="center"
        sx={{ mb: theme.spacing(10), paddingX: theme.spacing(20) }}
      >
        {subtitle}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: theme.spacing(1),
          mb: theme.spacing(6),
        }}
      >
        {cards.map((card, key) => (
          <Box
            ref={refArr.current[key]}
            key={key}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '100%', md: '32%' },
              backgroundImage: `linear-gradient(135deg, ${card.colors.color1} 0%, ${card.colors.color2} 100%)`,
              borderRadius: '40px',
              paddingX: theme.spacing(1),
              paddingY: theme.spacing(2),
            }}
          >
            <LottiePlayer
              className="graph-animation"
              path={card.graph.mediaItemUrl}
              play={graphAnimStat[key]}
              loop={false}
              style={{ width: '300px' }}
            />
            <div>
              <LottiePlayer
                path={card.persent.mediaItemUrl}
                play={false}
                loop={false}
                playOnHover={true}
                hoverElement={refArr.current[key]}
                style={{ width: '196px' }}
              />
            </div>
            <Typography
              variant="subtitle1"
              component="div"
              align="center"
              sx={{
                mb: theme.spacing(2),
                color: 'white',
                paddingX: theme.spacing(1),
              }}
              dangerouslySetInnerHTML={{ __html: card.text }}
            ></Typography>
          </Box>
        ))}
      </Box>
      <Typography
        variant="body1"
        component="div"
        align="center"
        sx={{
          paddingX: {
            xs: theme.spacing(5),
            sm: theme.spacing(15),
            lg: theme.spacing(30),
          },
          color: theme.palette.text.secondary,
        }}
      >
        {disclaimer}
      </Typography>
    </Container>
  );
};
