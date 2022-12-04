import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Video } from '../../../interfaces/Video';
import { replaceTextColor } from '../../../lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import ModalVideo from '../ModalVideo';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import IconButton from '@mui/material/IconButton';
import ButtonPrimary from '../ButtonPrimary';

interface VideosProps {
  title: string;
  subtitle: string;
  videos: Video[];
}
export const Videos = (props: VideosProps) => {
  const theme = useTheme();
  const { title, subtitle, videos } = props;
  const [modalVideoOpen, setModalVideoOpen] = useState<boolean>(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const toggleModalVideo = (videoUrl?: string) => {
    if (videoUrl) setSelectedVideoUrl(videoUrl);
    setModalVideoOpen(!modalVideoOpen);
  };
  const styles = {
    swiperOuterWrapper: {
      marginRight: '-24%',
      marginLeft: '-24%',
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
    logo: {
      position: 'absolute',
      top: 27,
      right: 27,
      zIndex: 1,
    },
    content: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.common.white,
      padding: '5px 10px',
    },
  };
  const renderSlides = () => {
    return videos.map(
      (
        { title, content, featuredImage, videosCf: { videoUrl, logo } },
        index
      ) => (
        <SwiperSlide key={index}>
          {({ isActive }) => (
            <Box
              sx={{
                borderRadius: 10,
                boxShadow: 0,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                opacity: isActive ? 1 : 0.5,
                position: 'relative',
              }}
            >
              <Box sx={styles.logo}>
                <Image
                  alt="image"
                  src={logo.sourceUrl}
                  width={logo.mediaDetails.width}
                  height={logo.mediaDetails.height}
                />
              </Box>
              <Image
                alt="image"
                src={featuredImage.node.sourceUrl}
                width={featuredImage.node.mediaDetails.width}
                height={featuredImage.node.mediaDetails.height}
              />
              <IconButton
                className="playBtn"
                sx={styles.openModal}
                color="inherit"
                onClick={() => toggleModalVideo(videoUrl)}
                disableRipple
              >
                <PlayArrowRoundedIcon fontSize="inherit" />
              </IconButton>
              <Box sx={styles.content}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  component={'div'}
                >
                  {title}:&nbsp;
                </Typography>
                <Typography
                  variant="subtitle2"
                  component={'div'}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></Typography>
              </Box>
            </Box>
          )}
        </SwiperSlide>
      )
    );
  };
  return (
    <Box>
      {selectedVideoUrl && (
        <ModalVideo
          modalVideoOpen={modalVideoOpen}
          toggleModalVideo={toggleModalVideo}
          videoUrl={selectedVideoUrl}
          cta={<ButtonPrimary href={`/`}>Read more</ButtonPrimary>}
        />
      )}
      <Container sx={{ mt: 16 }}>
        <Typography
          variant="h1"
          component="div"
          textAlign={'center'}
          dangerouslySetInnerHTML={{
            __html: replaceTextColor(title, theme.palette.primary.main),
          }}
        />
        <Typography
          fontWeight={400}
          color={'text.secondary'}
          variant="h4"
          textAlign={'center'}
          sx={{ mt: theme.spacing(6), mb: theme.spacing(8) }}
          component={'div'}
        >
          {subtitle}
        </Typography>
      </Container>
      <Box sx={{ overflowX: 'hidden' }}>
        <Box sx={styles.swiperOuterWrapper}>
          <Swiper
            className="swiper-videos"
            spaceBetween={16}
            slidesPerView={3}
            loopedSlides={videos.length}
            loop={true}
            centeredSlides={true}
            //onSlideChange={(e) => console.log('slide change', e)}
            //onSwiper={(swiper) => console.log(swiper)}
          >
            {renderSlides()}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
};
