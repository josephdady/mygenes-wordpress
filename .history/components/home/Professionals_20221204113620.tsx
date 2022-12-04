import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProItem } from '../../interfaces/ProItem';
import { insertBreakLine, replaceTextColor } from '../../lib/utils';

import 'swiper/css';
import 'swiper/css/pagination';

interface ProfessionalsProps {
  title: string;
  subtitle: string;
  slides: ProItem[];
}

export const Professionals = (props: ProfessionalsProps) => {
  const { title, subtitle, slides } = props;
  const theme = useTheme();

  const colorTitle = replaceTextColor(title, theme.palette.primary.main);
  const titleWithBreakLine = insertBreakLine(colorTitle);

  const toggleGlowEffect = (e: any, color?: string) => {
    if (e.type === 'mouseover' && color) {
      e.target.style.boxShadow = `0px 0px 10px ${alpha(color, 0.6)}`;
    }
    if (e.type === 'mouseleave') {
      e.target.style.boxShadow = 'none';
    }
  };

  const renderSlides = () => {
    return slides.map(
      (
        { title, content, featuredImage, professionalsCf: { colors } },
        index
      ) => (
        <SwiperSlide key={index}>
          {({ isActive }) => (
            <Box>
              <Box
                sx={{
                  borderRadius: 10,
                  boxShadow: 0,
                  background: `linear-gradient(180deg, ${colors.color2} 0%,${colors.color1} 100%)`,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  '&:hover': {
                    boxShadow: `0px 0px 20px ${alpha(
                      colors.color1,
                      0.6
                    )}, 0px 0px 20px ${alpha(colors.color2, 0.6)}`,
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Image
                  alt="image"
                  src={featuredImage.node.sourceUrl}
                  width={featuredImage.node.mediaDetails.width}
                  height={featuredImage.node.mediaDetails.height}
                />
              </Box>
              <Box mt={theme.spacing(4)}>
                <Typography
                  textAlign={'center'}
                  variant="subtitle1"
                  fontWeight={800}
                  gutterBottom
                >
                  {title}
                </Typography>
                <Typography
                  textAlign={'center'}
                  color="text.secondary"
                  gutterBottom
                  component={'div'}
                  dangerouslySetInnerHTML={{ __html: content }}
                  px={theme.spacing(6)}
                ></Typography>
              </Box>
            </Box>
          )}
        </SwiperSlide>
      )
    );
  };

  const styles = {
    swiperOuterWrapper: {
      marginRight: '-24%',
      marginLeft: '-24%',
    },
  };
  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: 15, mb: 2 }}>
        <Typography
          variant="h2"
          textAlign={'center'}
          gutterBottom
          component={'div'}
          dangerouslySetInnerHTML={{
            __html: titleWithBreakLine,
          }}
        />
        <Typography
          fontWeight={400}
          color={'text.secondary'}
          variant="h4"
          textAlign={'center'}
          component={'div'}
          sx={{ mt: theme.spacing(6) }}
        >
          {subtitle}
        </Typography>
      </Container>
      <Box sx={{ overflowX: 'hidden' }}>
        <Box sx={styles.swiperOuterWrapper}>
          <Swiper
            className="swiper-professionals"
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={72}
            slidesPerView={5}
            loopedSlides={slides.length}
            loop={true}
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
