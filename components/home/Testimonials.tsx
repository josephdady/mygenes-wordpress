import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { alpha, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import BottomWave from '../../assets/svg/BottomWave';
import { Testimonial } from '../../interfaces/Testimonial';
import ButtonPrimary from '../ButtonPrimary';
import ModalVideo from '../ModalVideo';

interface TestimonialsProps {
  testimonials: Testimonial;
}
export const Testimonials = (props: TestimonialsProps) => {
  const theme = useTheme();
  const {
    testimonials: { cta, heroPost },
  } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [modalVideoOpen, setModalVideoOpen] = useState<boolean>(false);
  const toggleModalVideo = () => {
    setModalVideoOpen(!modalVideoOpen);
    if (!modalVideoOpen) videoRef.current?.pause();
    else videoRef.current?.play();
  };
  const quoteImage = require('../../assets/images/quote.png');

  const styles = {
    roundShape: {
      height: isDesktop ? theme.spacing(24) : theme.spacing(14),
      position: 'relative',
      '&::before': {
        content: '""',
        borderTopLeftRadius: '50% 100%',
        borderTopRightRadius: '50% 100%',
        backgroundColor: theme.palette.secondary.light,
        zIndex: -1,
        position: 'absolute',
        height: '100%',
        width: '100%',
      },
    },
    containerWrapper: {
      backgroundColor: theme.palette.secondary.light,
    },
    boxFlex: {
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      gap: 3,
      mb: 3,
    },
    videoWrapper: {
      position: 'relative',
      //backgroundColor: theme.palette.primary.main,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.8,
      transition: 'all 0.3s ease',
      borderRadius: 3.75,
      '&:hover': {
        cursor: 'pointer',
        opacity: 1,
      },
    },
    openModal: {
      width: 100,
      height: 100,
      backgroundColor: alpha(theme.palette.secondary.main, 0.8),
      color: theme.palette.common.white,
      fontSize: 70,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    progress: {
      position: 'absolute',
      top: 30,
      left: 20,
      padding: theme.spacing(1),
      paddingX: theme.spacing(2),
      borderRadius: 50,
      fontWeight: 700,
      transform: 'matrix(1, -0.09, 0.09, 1, 0, 0)',
      zIndex: 1,
    },
  };

  /* const ModalVideo: FC = () => (
    <Modal open={modalVideoOpen} onClose={toggleModalVideo}>
      <Card sx={styles.modalCard}>
        <IconButton sx={styles.closeBtn} onClick={toggleModalVideo}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.iframeWrapper}>
          <iframe
            style={styles.iframe}
            src={`${heroPost.testimonialsCF.video}?autoplay=1`}
            allow="autoplay; encrypted-media"
            frameBorder={0}
          ></iframe>
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <ButtonPrimary href={cta.url}>
              I also want to be a success story!
            </ButtonPrimary>
          </Box>
        </Box>
      </Card>
    </Modal>
  ); */

  const handeAlphaColorPlayBtn = (e: boolean) => {
    const playBtn = document.querySelector('.playBtn') as HTMLElement;
    const videoWrapper = document.querySelector('.videoWrapper') as HTMLElement;
    if (e) {
      playBtn.style.backgroundColor = theme.palette.secondary.main;
      videoWrapper.style.opacity = '1';
    } else {
      playBtn.style.backgroundColor = alpha(theme.palette.secondary.main, 0.8);
      videoWrapper.style.opacity = '0.8';
    }
  };

  const renderRating = () => {
    const ratingArr: number[] = new Array(heroPost.testimonialsCF.rating);
    for (let index = 0; index < ratingArr.length; index++) {
      ratingArr[index] = index + 1;
    }
    return ratingArr.map((x, inx) => (
      <Box key={inx} display={'inline-block'}>
        <StarRateRoundedIcon fontSize="large" color="info" />
      </Box>
    ));
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.style.objectFit = 'cover';
  }, []);

  return (
    <Box maxWidth={'100%'} position={'relative'}>
      <ModalVideo
        modalVideoOpen={modalVideoOpen}
        toggleModalVideo={toggleModalVideo}
        videoUrl={heroPost.testimonialsCF.video}
        cta={
          <ButtonPrimary href={cta.url}>
            I also want to be a success story!
          </ButtonPrimary>
        }
      />
      <Box sx={styles.roundShape}></Box>
      <Box sx={styles.containerWrapper}>
        <Container maxWidth="xl">
          <Box mb={5}>
            <Image src={quoteImage} alt="quote" />
          </Box>
          <Box sx={styles.boxFlex}>
            <Box flex={1.1}>
              <Typography
                dangerouslySetInnerHTML={{ __html: heroPost.content }}
                variant="h2"
                component={'div'}
                gutterBottom
              ></Typography>
              <Typography
                fontSize={theme.typography.h4.fontSize}
                gutterBottom
                component={'div'}
              >
                <strong>{heroPost.title},</strong> {heroPost.testimonialsCF.age}
                , {heroPost.testimonialsCF.location}
              </Typography>
              {renderRating()}
            </Box>
            <Box position="relative" flex={0.9}>
              <Paper sx={styles.progress}>
                <Typography
                  fontSize={theme.typography.h4.fontSize}
                  component={'div'}
                  fontWeight={700}
                >
                  {heroPost.testimonialsCF.progress}
                </Typography>
              </Paper>
              <Box
                onMouseOver={() => handeAlphaColorPlayBtn(true)}
                onMouseLeave={() => handeAlphaColorPlayBtn(false)}
                sx={styles.videoWrapper}
                className="videoWrapper"
              >
                <video className="videoFit" ref={videoRef} loop muted autoPlay>
                  <source
                    src="https://a.slack-edge.com/93eaeb3/marketing/img/features/customer-awards/customer-awards-tmobile-quote-610x305@2x.mp4"
                    type="video/mp4"
                  />
                </video>
              </Box>
              <IconButton
                onMouseOver={() => handeAlphaColorPlayBtn(true)}
                onMouseLeave={() => handeAlphaColorPlayBtn(false)}
                className="playBtn"
                sx={styles.openModal}
                color="inherit"
                onClick={toggleModalVideo}
                disableRipple
              >
                <PlayArrowRoundedIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
          <ButtonPrimary href={cta.url}>{cta.title}</ButtonPrimary>
        </Container>
      </Box>
      <BottomWave />
    </Box>
  );
};
