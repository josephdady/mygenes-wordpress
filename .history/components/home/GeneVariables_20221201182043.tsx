import { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { alpha, Breakpoint, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Fade from '@mui/material/Fade';
import { GeneVariable } from '../../../interfaces/GeneVariable';
import { GeneVariableItem } from '../../../interfaces/GeneVariableItem';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper';

interface GeneVariablesProps {
  geneVariables: GeneVariable;
  items: GeneVariableItem[];
}

export const GeneVariables = (props: GeneVariablesProps) => {
  const theme = useTheme();
  const { geneVariables, items } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<GeneVariableItem>(
    items[selectedIndex]
  );
  const [barPosition, setBarPosition] = useState<number>(0);
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));
  const isXS = useMediaQuery(theme.breakpoints.up('sm'));
  const subtitleSplitColor = () => {
    const split = geneVariables.subtitle.split('.');
    ///console.log('split', split);

    return (
      <Typography
        maxWidth="md"
        marginX="auto"
        paddingX={{ xs: 0, lg: 17 }}
        textAlign="center"
        variant="subtitle2"
        component="div"
        sx={{ color: theme.palette.text.secondary }}
      >
        {split[0]}.
        <strong style={{ color: theme.palette.primary.main }}>
          {split[1]}
        </strong>
        .{split[2]}
      </Typography>
    );
  };

  const onGeneVariableClick = (index: number) => {
    setSelectedIndex(index);
    setSelectedItem(items[index]);
    setBarPosition((index / items.length) * 100);
  };
  const slidesPerView = () => {
    if (isLG) {
      return 9;
    } else if (isMD) {
      return 7;
    } else if (isSM) {
      return 5;
    } else if (isXS) {
      return 3;
    } else {
      return 1;
    }
  };
  const geneVariableItems = () => {
    //const item = items[selectedIndex];

    return items.map((item, index) => {
      if (selectedItem.translation.id == item.translation.id) {
        return (
          <Fade key={index} in={true} appear timeout={700} easing="ease-in-out">
            <Box
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              gap={2}
              alignItems="center"
            >
              <Box flex={0.9}>
                <Image
                  alt="image"
                  src={item.translation.featuredImage.node.sourceUrl}
                  width={item.translation.featuredImage.node.mediaDetails.width}
                  height={
                    item.translation.featuredImage.node.mediaDetails.height
                  }
                />
              </Box>
              <Box flex={1.1}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  paddingX={2}
                  paddingY={1}
                >
                  <Image
                    alt="image"
                    src={item.translation.geneVariablesCF.icon.sourceUrl}
                    width={
                      item.translation.geneVariablesCF.icon.mediaDetails.width
                    }
                    height={
                      item.translation.geneVariablesCF.icon.mediaDetails.height
                    }
                  />
                  <Typography
                    color={item.translation.geneVariablesCF.color}
                    variant="h2"
                    component={'div'}
                    gutterBottom
                  >
                    {item.translation.title}
                  </Typography>
                </Box>
                <Typography
                  component="div"
                  variant="h4"
                  fontWeight={400}
                  dangerouslySetInnerHTML={{ __html: item.translation.content }}
                ></Typography>
              </Box>
            </Box>
          </Fade>
        );
      } else {
        return <Box key={index}></Box>;
      }
    });
  };
  const geneVariableBar = () => {
    const selectedColor = selectedItem.translation.geneVariablesCF.color;
    return (
      <Card
        sx={{
          marginY: theme.spacing(8),
          paddingX: theme.spacing(2.25),
          boxShadow: `0px 0px 20px ${alpha(selectedColor, 0.4)}`,
          borderRadius: 5,
        }}
      >
        <Swiper
          slidesPerView={slidesPerView()}
          freeMode={true}
          modules={[FreeMode]}
          className="geneVariableBar"
        >
          {items.map((item, key) => (
            <SwiperSlide key={key}>
              <Box
                sx={{
                  paddingX: theme.spacing(1),
                  userSelect: 'none',
                  textAlign: 'center',
                  height: '100%',
                  alignSelf: 'stretch',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
                onClick={() => onGeneVariableClick(key)}
              >
                <Box flex={1} marginY={theme.spacing(1.5)}>
                  <Image
                    alt="image"
                    src={item.translation.geneVariablesCF.icon.sourceUrl}
                    width={
                      item.translation.geneVariablesCF.icon.mediaDetails.width
                    }
                    height={
                      item.translation.geneVariablesCF.icon.mediaDetails.height
                    }
                  />
                </Box>
                <Typography
                  flex={1}
                  display="flex"
                  alignItems="baseline"
                  color={
                    selectedItem.translation.id === item.translation.id
                      ? selectedColor
                      : ''
                  }
                  fontWeight={600}
                  lineHeight={1.2}
                >
                  {item.translation.title}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <Box position={'relative'} width="100%" height={5}>
          <Box
            position={'absolute'}
            top={0}
            left={`${barPosition}%`}
            sx={{
              width: 100 / slidesPerView() + '%',
              height: 5,
              backgroundColor: selectedColor,
              transition: 'left 0.5s',
              borderRadius: '4px 4px 0px 0px',
            }}
          ></Box>
        </Box>
      </Card>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ marginY: theme.spacing(8) }}>
      <Typography
        maxWidth="lg"
        paddingX={{ md: 0, lg: 10 }}
        marginX="auto"
        textAlign="center"
        component="div"
        variant="h1"
        gutterBottom
      >
        {props.geneVariables.title}
      </Typography>
      {subtitleSplitColor()}

      <Container maxWidth="xl">
        {geneVariableBar()}
        {geneVariableItems()}
      </Container>
    </Container>
  );
};
