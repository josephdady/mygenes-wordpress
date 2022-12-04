import React, { useRef, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Goal } from '../../interfaces/Goal';
import { GoalCard } from './GoalCard';

import { GoalItem } from '../../interfaces/GoalItem';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import LottiePlayer from '../LottiePlayer';
gsap.registerPlugin(ScrollTrigger);

interface GoalsProps {
  goals: Goal;
}

export const Goals = (props: GoalsProps) => {
  const [tl] = useState<gsap.core.Timeline>(gsap.timeline());
  const theme = useTheme();
  const cardWrapper = useRef(null);
  const contRef = useRef(null);
  let cardsRef: HTMLElement[] = [];
  const {
    goals: { title, cards },
  } = props;

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!contRef.current) return;
      const minScale = 0.7;
      const goalCards = gsap.utils.toArray('.goal-card') as HTMLElement[];
      const goalTitles = gsap.utils.toArray(
        '.goal-card-title'
      ) as HTMLElement[];
      //console.log(goalTitles);

      const goalTexts = gsap.utils.toArray('.goal-card-text') as HTMLElement[];
      const goalCardsWrapper = document.querySelector('.goal-cards-wrapper');
      const goalCardsWrapperHeight = goalCardsWrapper?.clientHeight
        ? goalCardsWrapper?.clientHeight * 1
        : goalCards.length * 450 * 1;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.container',
          pin: true,
          pinSpacing: true,
          // markers: true,
          start: 'top top', // when the top of the trigger hits the top of the viewport
          end: '+=2500', // end after scrolling 1000px beyond the start
          scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
      });
      goalCards.forEach((card, inx) => {
        const cardHeight = card.clientHeight;
        tl.fromTo(
          card,
          {
            y: () => 0, //(inx == 0 ? 0 : (inx * cardHeight) / 2),
          },
          {
            y: () => (inx == 0 ? 0 : (-cardHeight + 30) * inx), //inx * 50,
            stagger: 0.5,
          }
        )
          .fromTo(
            card.querySelector('.goal-card-title'),
            {
              // y: () => 0, //(inx == 0 ? 0 : (inx * cardHeight) / 2),
              opacity: inx == 0 ? 1 : 0,
              autoAlpha: 1,
            },
            {
              //y: () => (inx == 0 ? 0 : (-cardHeight + 30) * inx), //inx * 50,
              opacity: 1,
              stagger: 0.5,
            },
            '-=0.1'
          )
          .to(
            `.goal-card${inx - 1} .goal-card-title`,
            { opacity: 0, duration: 0 },
            '-=0.5'
          )
          .to(
            `.goal-card${inx - 1} .goal-card-icon`,

            {
              duration: 0.3,
              scaleX: (i: number) => {
                const scaleVal =
                  inx - 1 == 0 ? minScale : minScale + (inx - 1) * 0.1;
                return scaleVal;
              },
            },
            '-=0.7'
          )
          .to(
            `.goal-card${inx - 1} .goal-card-icon`,

            {
              filter: 'brightness(40%)',
              duration: 0,
            },
            '-=0.5'
          );
      });
    }, contRef);
    return () => ctx.kill();
  }, []);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          paddingBottom: theme.spacing(8),
          backgroundColor: theme.palette.secondary.light,
          borderRadius: '40px',
          height: 'calc(100vh - 40px)',
          overflow: 'hidden',
          mb: theme.spacing(25),
          //boxShadow: '0px 10px 20px #00000029;',
        }}
        className="container"
        ref={contRef}
      >
        <Container maxWidth="lg" ref={cardWrapper}>
          <Typography
            variant="h1"
            component="h2"
            align="center"
            sx={{ mb: theme.spacing(10), pt: theme.spacing(10) }}
          >
            {title}
          </Typography>
          <Box className="goal-cards-wrapper">
            {cards &&
              cards?.map((card: any, key: number) => (
                <Box
                  key={key}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    //position: 'absolute',
                  }}
                >
                  <Box
                    className={`goal-card${key} goal-card`}
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
                        mb: theme.spacing(4),
                      }}
                    >
                      <LottiePlayer
                        path={card.animation.mediaItemUrl}
                        loop={true}
                        play={true}
                        style={{ width: 300, height: 300 }}
                      />
                    </Box>
                    <Box
                      className={`goal-card-title${key} goal-card-title`}
                      sx={{ height: 70, position: 'relative' }}
                    >
                      <Typography
                        variant="h2"
                        component="h3"
                        sx={{
                          mb: theme.spacing(5),
                          background: `linear-gradient(to right,${card.colors.color1} , ${card.colors.color2} )`,
                          WebkitTextFillColor: 'transparent',
                          WebkitBackgroundClip: 'text',
                          //position: 'absolute',
                        }}
                      >
                        {card.title}
                      </Typography>
                      {/* <Typography
                      className={`goal-card-text${key}`}
                      variant="h4"
                      color={theme.palette.text.secondary}
                      component="div"
                      sx={{ maxWidth: 500 }}
                    >
                      {card.description}
                    </Typography> */}
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Container>
      </Container>
    </>
  );
};

{
  {
    /* <GoalCard
                  timeline={tl}
                  key={key}
                  keyProp={key}
                  card={card}
                  cardColors={setAnimColor}
                /> */
  }
  /* <div style={{ height: '150px', overflow: 'hidden' }}>
  <svg
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
    style={{ height: '100%', width: '100%' }}
  >
    <path
      d="M0.00,49.98 C142.49,309.38 271.49,-49.98 525.11,170.23 L500.00,0.00 L0.00,0.00 Z"
      style={{ stroke: 'none', fill: theme.palette.secondary.light }}
    ></path>
  </svg>
</div>;
 */
}
