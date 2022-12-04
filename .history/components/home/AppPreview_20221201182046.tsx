import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { AppPreview as AppPreviewInterface } from '../../../interfaces/AppPreview';
import theme from '../../styles/theme';
import ButtonPrimary from '../ButtonPrimary';
import BigShape from '../../images/svg/BigShape';
import SmallShape from '../../images/svg/SmallShape';
import GeneShape from '../../images/svg/GeneShape';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import mockup from '../../images/mockup.png';
gsap.registerPlugin(ScrollTrigger);

interface AppPreviewProps {
  appPreview: AppPreviewInterface;
}

export const AppPreview = (props: AppPreviewProps) => {
  const theme = useTheme();
  const contRef = useRef<HTMLElement>(null);
  const { appPreview } = props;
  const { items } = appPreview;

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!contRef.current) return;
      const imageWidth = contRef.current?.clientWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contRef.current,
          pin: true,
          start: 'top 7%',
          end: '+=3500',
          markers: true,
          scrub: 1,
          pinSpacing: true,
          anticipatePin: 1,
          immediateRender: true,
          invalidateOnRefresh: true,
        },
      });
      for (let index = 0; index < items.length; index++) {
        if (index < items.length - 1) {
          tl.fromTo(
            `.image${index + 1}`,
            { x: imageWidth / 2 },
            {
              x: 0,
              /*  onComplete: () => {
                document.body.style.backgroundColor = items[index].color;
              }, */
            }
          ).fromTo(
            `.content${index}`,
            { autoAlpha: 1 },
            { autoAlpha: 0 },
            '-=0.45'
          );
          /* .from(
              `.content${index + 1} .title`,
              {
                duration: 0.75,
                y: 30,
                autoAlpha: 0,
                ease: 'power3.out',
                stagger: 1.5,
              },
              '-=0.25'
            ); */
          /* .from(
              `.content${index + 1} p`,
              {
                autoAlpha: 0,
              },
              '-=0.65'
            ); */
        }
      }
    }, contRef);
    return () => ctx.revert();
  }, []);

  const [bigShapeColors, setBigShapeColors] = useState<string[]>([
    '#ff7d51',
    '#fa541c',
  ]);
  const [smallShapeColors, setSmallShapeColors] = useState<string[]>([
    '#a0d911',
    '#8cbe10',
  ]);
  const [geneShapeColor, setGeneShapeColor] = useState<string>('#9a00ff');

  const splitedPrimaryColorTitle = () => {
    const splitedPrimaryColorTitle = appPreview.title.split(' ');
    return (
      <Typography variant="h1" component="h3" gutterBottom>
        {splitedPrimaryColorTitle[0]}{' '}
        <span style={{ color: theme.palette.primary.main }}>
          {splitedPrimaryColorTitle[1]}
        </span>
      </Typography>
    );
  };

  return (
    <Box ref={contRef} sx={{ height: '100vh' }} className="app-preview">
      <Box
        sx={{
          position: 'relative',
          pt: theme.spacing(10),
          height: '100%',
        }}
      >
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: theme.spacing(5),
                mt: theme.spacing(10),
                mb: theme.spacing(10),
                width: '55%',
              }}
            >
              {splitedPrimaryColorTitle()}
              {items &&
                items.map((item, key) => (
                  <Box
                    key={key}
                    className={`content${key}`}
                    sx={{ position: 'absolute' }}
                  >
                    <Typography
                      className="title"
                      variant="h4"
                      component="p"
                      gutterBottom
                    >
                      {item.title}
                    </Typography>
                  </Box>
                ))}
              <Box>
                <ButtonPrimary href={appPreview.cta.url}>
                  {appPreview.cta.title}
                </ButtonPrimary>
              </Box>
            </Box>
            <Box textAlign="center" sx={{ width: '45%', position: 'relative' }}>
              <Box className="slides">
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: 20,
                    overflow: 'hidden',
                    width: 366,
                    height: 720,
                  }}
                >
                  <Image
                    alt="mockup"
                    src={require('../../images/mockup.png')}
                  />
                </Box>
                {items &&
                  items.map((item, key) => (
                    <Box
                      key={key}
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        top: 16,
                        zIndex: 15,
                        clipPath: 'inset(0% 5% 0% 0% round 10px)',
                      }}
                    >
                      <Box key={key} className={`image${key}`}>
                        <Image
                          alt="image"
                          key={key}
                          src={item.slide.sourceUrl}
                          width={item.slide.mediaDetails.width}
                          height={item.slide.mediaDetails.height}
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            position: 'absolute',
            top: 25,
            right: '0',
            zIndex: 10,
          }}
        >
          <BigShape color1={bigShapeColors[0]} color2={bigShapeColors[1]} />
        </Box>
        <Box
          sx={{ position: 'absolute', bottom: '6%', right: '0', zIndex: 10 }}
        >
          <SmallShape
            color1={smallShapeColors[0]}
            color2={smallShapeColors[1]}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '33%',
            right: '8%',
            zIndex: 10,
          }}
        >
          <GeneShape color={geneShapeColor} />
        </Box>
      </Box>
    </Box>
  );
};
