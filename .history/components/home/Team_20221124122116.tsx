import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { HomeTeam } from '../../../interfaces/HomeTeam';
import { insertBreakLine, replaceTextColor } from '../../../lib/utils';
import ButtonPrimary from '../ButtonPrimary';
gsap.registerPlugin(ScrollTrigger);
interface TeamProps {
  data: HomeTeam;
  startConfetti: (state: boolean) => void;
}
export const Team = (props: TeamProps) => {
  const theme = useTheme();
  const { title, subtitle, cta } = props.data;
  const triggerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!triggerRef.current) return;
      const container = triggerRef.current as HTMLElement;
      ScrollTrigger.create({
        trigger: container,
        //pin: true,
        start: 'top 90%',
        end: 'bottom bottom', //'bottom bottom', //+ container.clientHeight * 2,
        toggleActions: 'play none none none',
        pinSpacing: true,
        anticipatePin: 1,
        markers: true,
        immediateRender: true,

        onEnter: () => {
          props.startConfetti(true);
        },
        /* onEnterBack: () => {
          props.startConfetti(true);
        }, */
        /* onLeave: () => {
          props.startConfetti(false);
        }, */
        /* onLeaveBack: () => {
          props.startConfetti(false);
        }, */
      });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, triggerRef);
    return () => ctx.kill();
  }, []);

  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{
          pt: 10,
          pb: 20,
          position: 'relative',
        }}
      >
        <Typography
          textAlign="center"
          variant="h1"
          component={'div'}
          gutterBottom
          sx={{ px: { sm: 0, lg: 4 } }}
          dangerouslySetInnerHTML={{
            __html: replaceTextColor(title, theme.palette.primary.main),
          }}
        />
        <Typography
          ref={triggerRef}
          sx={{
            color: theme.palette.text.secondary,
          }}
          component={'div'}
          variant="subtitle1"
          textAlign="center"
          dangerouslySetInnerHTML={{
            __html: insertBreakLine(subtitle),
          }}
        />
        <Box mt={7} textAlign={'center'}>
          <ButtonPrimary href={cta.url}>{cta.title}</ButtonPrimary>
        </Box>
      </Container>
    </Box>
  );
};
