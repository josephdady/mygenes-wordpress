import { useState, useEffect, cloneElement } from 'react';
//import Link from '../../src/components/Link';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { MenuItem as WpMenuItem } from '../interfaces/MenuItem';
import theme from '../styles/theme';
//MUI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logo from '../assets/svg/Logo';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';

interface Props {
  children: React.ReactElement;
}
function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    style: {
      backdropFilter: trigger ? 'blur(20px)' : 'none',
      background: trigger ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
    },
    elevation: trigger ? 2 : 0,
  });
}
const drawerWidth = 240;

const GET_MENU_ITEMS = gql`
  query NewQuery($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        uri
      }
    }
  }
`;

export default function Navbar(props?: Props) {
  const { locale: activeLocale, locales, asPath } = useRouter();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const availableLocales = locales?.filter((locale) => locale !== activeLocale);
  const [selectedLang, setSelectedLang] = useState<string | undefined>(
    activeLocale
  );
  const [menuItems, setMenuItems] = useState<WpMenuItem[]>([]);
  const [loadingLoacles, setLoadingLoacles] = useState<boolean>(false);

  const location =
    selectedLang == 'en'
      ? `PRIMARY`
      : `PRIMARY___${selectedLang?.toUpperCase()}`;

  const { data, loading, error, refetch } = useQuery(GET_MENU_ITEMS, {
    variables: {
      location,
    },
  });

  useEffect(() => {
    setSelectedLang(activeLocale);
    refetch();
  }, [activeLocale]);

  useEffect(() => {
    if (data) {
      setMenuItems(data.menuItems.nodes);
    }
  }, [data]);

  useEffect(() => {
    if (availableLocales?.join('') !== selectedLang) {
      setLoadingLoacles(false);
      document.dir = selectedLang === 'he' ? 'rtl' : 'ltr';
    } else {
      setLoadingLoacles(true);
    }
  }, [availableLocales]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <ElevationScroll {...props}>
          <AppBar color="transparent" component="nav">
            <Container maxWidth="xl">
              <Toolbar sx={{ gap: 5 }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  sx={{
                    flexGrow: 1,
                    alignItems: 'center',
                    display: { xs: 'none', sm: 'flex' },
                  }}
                >
                  <Logo />
                </Box>
                {loadingLoacles ? (
                  <Box width="100%">
                    <Skeleton width="100%" height={40} />
                  </Box>
                ) : (
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {menuItems.map((item) => (
                      <Button color="inherit" href={item.uri} key={item.id}>
                        {item.label}
                      </Button>
                    ))}
                    {availableLocales?.map((locale) => {
                      return (
                        <Link
                          key={locale}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                          href={asPath}
                          locale={locale}
                          onClick={() => handleLangChange(locale)}
                        >
                          {locale.toUpperCase()}
                        </Link>
                      );
                    })}
                  </Box>
                )}
              </Toolbar>
            </Container>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}
