import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FooterWave from '../images/footer-wave.svg';
import { useRouter } from 'next/router';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {
  extarctItemFromTranslations,
  insertBreakLine,
  relativePath,
} from '../../lib/utils';
import { Link as WpLink } from '../../interfaces/Link';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EnvelopeIcon from '../images/svg/EnvelopeIcon';
import PinLocationIcon from '../images/svg/PinLocationIcon';
import PhoneIcon from '../images/svg/PhoneIcon';
import InstagramIcon from '../images/svg/InstagramIcon';
import YoutubeIcon from '../images/svg/YoutubeIcon';
import FacebookIcon from '../images/svg/FacebookIcon';
import IconButton from '@mui/material/IconButton';
// import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';

export interface MenuLink {
  link: WpLink;
}

export interface FooterMenuItem {
  title: string;
  footerMenuCf: {
    menuLinks: MenuLink[];
  };
}

const QUERY = gql`
  query NewQuery(
    $LanguageCodeEnum: LanguageCodeEnum!
    $LanguageFilterEnum: LanguageCodeFilterEnum!
  ) {
    footerTitle: translateString(
      language: $LanguageCodeEnum
      string: "footerTitle"
    )
    footerTextBold: translateString(
      language: $LanguageCodeEnum
      string: "footerTextBold"
    )
    footerTextRegular: translateString(
      language: $LanguageCodeEnum
      string: "footerTextRegular"
    )
    footerCta: translateString(language: $LanguageCodeEnum, string: "footerCta")
    footerTitleForm: translateString(
      language: $LanguageCodeEnum
      string: "footerTitleForm"
    )
    fullName: translateString(language: $LanguageCodeEnum, string: "FullName")
    phone: translateString(language: $LanguageCodeEnum, string: "Phone")
    email: translateString(language: $LanguageCodeEnum, string: "Email")
    send: translateString(language: $LanguageCodeEnum, string: "Send")
    address: translateString(language: $LanguageCodeEnum, string: "address")
    copyrights: translateString(
      language: $LanguageCodeEnum
      string: "copyrights"
    )
    footerMenus(
      where: {
        language: $LanguageFilterEnum
        orderby: { field: DATE, order: ASC }
      }
    ) {
      nodes {
        translation(language: $LanguageCodeEnum) {
          title
          footerMenuCf {
            menuLinks {
              link {
                title
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default function Footer() {
  const theme = useTheme();
  const { locale: activeLocale, locales, asPath } = useRouter();
  const [selectedLang, setSelectedLang] = useState<string | undefined>(
    activeLocale
  );
  const LanguageCodeEnum = selectedLang?.toUpperCase(); //== 'en' ? 'HE' : 'EN';
  const LanguageFilterEnum = selectedLang?.toUpperCase(); //== 'en' ? 'HE' : 'EN';
  const [translateString, setTranslateString] = useState<any>(null);
  const [footerMenus, setFooterMenus] = useState<FooterMenuItem[] | []>([]);
  const [legalMenu, setLegalMenu] = useState<FooterMenuItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const { data, loading, error, refetch, networkStatus, called } = useQuery(
    QUERY,
    {
      variables: {
        LanguageFilterEnum,
        LanguageCodeEnum,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    if (
      networkStatus === NetworkStatus.refetch ||
      networkStatus === NetworkStatus.setVariables
    ) {
      setIsLoading(true);
    } else if (networkStatus === NetworkStatus.ready) {
      setIsLoading(false);
    }
  }, [networkStatus]);

  useEffect(() => {
    setIsLoading(true);
    setSelectedLang(activeLocale);
    refetch();
  }, [activeLocale]);

  useEffect(() => {
    if (data) {
      let _data = { ...data };
      const footerMenusExtracted = extarctItemFromTranslations(
        _data.footerMenus.nodes
      );
      const footerMenus = footerMenusExtracted.filter(
        (x: any) => x.title !== 'Legal'
      );
      const legalMenu = footerMenusExtracted.find(
        (x: any) => x.title === 'Legal'
      );
      setFooterMenus(footerMenus);
      setLegalMenu(legalMenu);
      delete _data.footerMenus;
      setTranslateString(_data);
    }
  }, [data]);

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
  };

  const styles = {
    footerWrapper: {
      marginTop: theme.spacing(20),
    },
    footerWave: {
      height: 667,
      width: '100%',
      maxWidth: '100%',
      position: 'relative',
      backgroundImage: `url(${FooterWave.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      transform: activeLocale === 'he' ? 'scaleX(-1)' : 'scaleX(1)',
    },
    footerWaveContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      transform: activeLocale === 'he' ? 'scaleX(-1)' : 'scaleX(1)',
    },
    footerWaveTitle: {
      mb: theme.spacing(5),
      background: `linear-gradient(275deg,${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    },
    footerWaveTextBold: {
      mb: theme.spacing(1),
    },
    footerWaveTextRegular: {},
    footerContent: {
      backgroundColor: theme.palette.primary.dark,
      paddingY: theme.spacing(8),
    },
    footerContentContainer: {
      display: 'flex',
      gap: theme.spacing(2),
    },
    footerContentItem: {
      flex: 1,
    },
    input: {
      '& .MuiOutlinedInput-root': {
        color: theme.palette.common.white,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.common.white,
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.common.white,
      },
    },
    send: {
      backgroundImage: `linear-gradient(262deg,${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
      borderRadius: 10,
      width: '100%',
      mt: theme.spacing(1),
      color: theme.palette.common.white,
      paddingY: theme.spacing(1),
    },
  };
  return (
    <footer style={styles.footerWrapper}>
      <Box sx={styles.footerWave}>
        <Container sx={styles.footerWaveContainer} maxWidth="xl">
          <Box flex={1}>
            {translateString && (
              <Box>
                <Box>
                  <Typography
                    variant="h2"
                    component="div"
                    fontWeight={'bold'}
                    gutterBottom
                    sx={styles.footerWaveTitle}
                  >
                    {isLoading ? <Skeleton /> : translateString.footerTitle}
                  </Typography>
                </Box>
                <Box sx={styles.footerWaveTextBold}>
                  {isLoading ? (
                    <>
                      <Skeleton sx={{ fontSize: '2rem' }} />
                      <Skeleton sx={{ fontSize: '2rem' }} />
                    </>
                  ) : (
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="div"
                      fontWeight={'bold'}
                      dangerouslySetInnerHTML={{
                        __html: insertBreakLine(translateString.footerTextBold),
                      }}
                    />
                  )}
                </Box>
                <Box sx={styles.footerWaveTextRegular}>
                  {isLoading ? (
                    <Skeleton sx={{ fontSize: '1.5rem' }} />
                  ) : (
                    <Typography
                      variant="subtitle2"
                      component="div"
                      fontWeight={400}
                      lineHeight={1.2}
                      dangerouslySetInnerHTML={{
                        __html: insertBreakLine(
                          translateString.footerTextRegular
                        ),
                      }}
                    />
                  )}
                </Box>
              </Box>
            )}
          </Box>
          <Box flex={1}></Box>
        </Container>
      </Box>
      <Box sx={styles.footerContent}>
        <Container maxWidth="xl">
          <Box sx={styles.footerContentContainer}>
            {footerMenus &&
              footerMenus.length > 0 &&
              footerMenus.map((menu: FooterMenuItem) => {
                return (
                  <Box sx={styles.footerContentItem} key={menu.title}>
                    <Typography
                      color={theme.palette.common.white}
                      component="div"
                      fontWeight={600}
                    >
                      {menu.title}
                    </Typography>
                    {legalMenu?.footerMenuCf.menuLinks?.map(
                      ({ link }: MenuLink, index: number) => {
                        return (
                          <Box key={index}>
                            <Link href={relativePath(link.url)}>
                              <Typography
                                variant="body2"
                                component="div"
                                color={theme.palette.text.disabled}
                                fontSize={14}
                              >
                                {link.title}
                              </Typography>
                            </Link>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                );
              })}
            {translateString && (
              <Box sx={styles.footerContentItem}>
                <Typography
                  color={theme.palette.common.white}
                  component="div"
                  fontWeight={600}
                  mb={theme.spacing(2)}
                >
                  {translateString.footerTitleForm}
                </Typography>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { marginY: 1, width: '100%' },
                  }}
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                >
                  <TextField
                    label={translateString.fullName}
                    variant="outlined"
                    {...register('fullName', {
                      required: true,
                      maxLength: 80,
                    })}
                    sx={styles.input}
                    color="success"
                    error={errors.fullName && isSubmitted ? true : false}
                    size="small"
                    dir="ltr"
                  />
                  <TextField
                    label={translateString.email}
                    variant="outlined"
                    {...register('email', {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    sx={styles.input}
                    color="success"
                    error={errors.email && isSubmitted ? true : false}
                    size="small"
                  />
                  <TextField
                    type="number"
                    label={translateString.phone}
                    variant="outlined"
                    {...register('phone', {
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                    sx={styles.input}
                    color="success"
                    error={errors.phone && isSubmitted ? true : false}
                    size="small"
                  />
                  <Button sx={styles.send} type={'submit'}>
                    {translateString.send}
                  </Button>
                </Box>
                <Box marginY={3}>
                  <Box display={'flex'} gap={2} mb={2}>
                    <PinLocationIcon />
                    <Typography
                      component={'div'}
                      color={theme.palette.common.white}
                    >
                      {translateString.address}
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={2} mb={2}>
                    <PhoneIcon />
                    <Typography
                      component={'div'}
                      color={theme.palette.common.white}
                    >
                      03-3095244
                    </Typography>
                  </Box>
                  <Box display={'flex'} gap={2}>
                    <EnvelopeIcon />
                    <Typography
                      component={'div'}
                      color={theme.palette.common.white}
                    >
                      support@mygenes.co.il
                    </Typography>
                  </Box>
                </Box>
                <IconButton>
                  <YoutubeIcon />
                </IconButton>
                <IconButton>
                  <FacebookIcon />
                </IconButton>
                <IconButton>
                  <InstagramIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box>
            <Box textAlign={'center'} mb={2}>
              {legalMenu?.footerMenuCf.menuLinks?.map(
                ({ link }: MenuLink, index: number) => {
                  return (
                    <Box key={index}>
                      <Link href={relativePath(link.url)}>
                        <Typography
                          fontSize={12}
                          color={theme.palette.text.disabled}
                          component="div"
                        >
                          {link.title}
                        </Typography>
                      </Link>
                      {index !==
                        legalMenu?.footerMenuCf.menuLinks?.length - 1 && (
                        <span>&nbsp;|&nbsp;</span>
                      )}
                    </Box>
                  );
                }
              )}
            </Box>
            {translateString && (
              <Box>
                <Typography
                  textAlign={'center'}
                  component={'div'}
                  color={theme.palette.text.disabled}
                  fontSize={12}
                >
                  MyGenes &copy; {translateString.copyrights}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
