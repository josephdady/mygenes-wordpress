import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { replaceTextColor } from '../../lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { from } from '@apollo/client';
import { ResearchItem } from '../../interfaces/ResearchItem';
import Button from '@mui/material/Button';
gsap.registerPlugin(ScrollTrigger);
interface ResearchProps {
  research: any;
}

export const Research = (props: ResearchProps) => {
  const theme = useTheme();
  const refContainer = useRef(null);
  const { research } = props;
  const items = research.items as ResearchItem[];

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!refContainer.current) return;
      const container = refContainer.current as HTMLElement;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: 'top 20%',
          end: '+=4500 bottom', //'bottom bottom', //+ container.clientHeight * 2,
          toggleActions: 'play none none none',
          pinSpacing: true,
          anticipatePin: 1,
          //markers: true,
          immediateRender: true,
          invalidateOnRefresh: true,
          scrub: 1,
        },
      });
      const fromAnimation = {
        opacity: 0,
        autoAlpha: 0,
        scale: 2,
      };
      const toAnimation = {
        opacity: 1,
        autoAlpha: 1,
        scale: 1,
        stagger: 0.5,
        rotaition: -5,
        duration: 2,
      };

      /*       const startingY = -150;
      const startingX = 20;
      const xRotation = 3;
      const duration = 2;
      const fromToPosition = (index: number) => (index !== 0 ? '-=1.5' : '0');
      const toPosition = (index: number) =>
        index == items.length - 1 ? '+=3' : '';

      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const item = container.querySelector(`.box${index}`);
        const yDirection =
          index == 0 ? startingY : index % 2 === 0 ? startingY : startingY - 25;
        const xDirection =
          index === 0
            ? startingX
            : index % 2 === 0
            ? startingX
            : startingX * -1;
        tl.fromTo(item, fromAnimation, toAnimation, fromToPosition(index)).to(
          item,
          {
            scale: 0.6,
            y: yDirection,
            //x: xDirection,
            xRotation,
            duration,
          },
          toPosition(index)
        ); 
      }*/

      tl.fromTo('.box1', fromAnimation, toAnimation)
        .to('.box1', { scale: 0.6, y: -150, x: 20, rotation: 3, duration: 2 })
        .fromTo('.box2', fromAnimation, toAnimation, '-=0.5')
        .to('.box2', { scale: 0.6, y: -125, x: -30, rotation: -3, duration: 2 })
        .fromTo('.box3', fromAnimation, toAnimation, '-=0.5')
        .to('.box3', { scale: 0.6, y: -100, x: 25, rotation: 3, duration: 2 })
        .fromTo('.box4', fromAnimation, toAnimation, '-=0.5')
        .to('.box4', { x: 0, y: 0, rotation: 0, scale: 1 }, '+=3');
    }, refContainer);
    return () => ctx.kill();
  }, []);

  const backgroundImageWithGradientStr = (item: ResearchItem) => {
    if (item.bgImage) {
      return `url(${item.bgImage.sourceUrl}),linear-gradient(122deg,${item.colors.color1} 0%,${item.colors.color2} 100%)`;
    } else {
      return `linear-gradient(122deg,${item.colors.color1} 0%,${item.colors.color2} 100%)`;
    }
  };

  return (
    <Container ref={refContainer} maxWidth="xl" sx={{ pt: 10, pb: 10 }}>
      <Box display={'flex'}>
        <Box flex={1.2}>
          <Box className="box-wrapper">
            {items.map((item, index) => (
              <Box
                sx={{
                  background: backgroundImageWithGradientStr(item),
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                key={index}
                className={`box box${index + 1}`}
              >
                <Box
                  flex={1}
                  sx={{
                    alignSelf: 'center',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h1"
                    component={'div'}
                    color={theme.palette.background.default}
                    textAlign={'center'}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignSelf: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '67%',
                    margin: '0 auto',
                  }}
                  flex={1}
                >
                  <Typography
                    component={'div'}
                    variant="h4"
                    color={theme.palette.background.default}
                    textAlign="center"
                    fontWeight={500}
                    gutterBottom
                  >
                    {item.text}
                  </Typography>
                  {item.link && (
                    <Button
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.primary.main,
                        borderRadius: 50,
                        padding: '5px 10px',
                        '&:hover': {
                          backgroundColor: theme.palette.background.default,
                          opacity: 0.95,
                        },
                        fontWeight: 600,
                      }}
                      href={item.link.url}
                      disableRipple
                      disableElevation
                    >
                      {item.link.title}
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box flex={0.8}>
          <Typography
            variant="h1"
            component="div"
            dangerouslySetInnerHTML={{
              __html: replaceTextColor(
                research.title,
                theme.palette.primary.main
              ),
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};
