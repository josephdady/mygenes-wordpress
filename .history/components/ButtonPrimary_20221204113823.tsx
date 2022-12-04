import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { relativePath } from '../lib/utils';

interface ButtonPrimaryProps {
  children: React.ReactNode;
  href?: string;
  as?: string;
  styles?: any;
}

const ButtonPrimary = (props: ButtonPrimaryProps) => {
  const theme = useTheme();
  const relativeHref = props.href ? relativePath(props.href) : props.href;

  return (
    <Button
      sx={{
        borderRadius: '50px',
        fontSize: theme.typography.h4.fontSize,
        padding: theme.spacing(2, 5),
        backgroundImage: `linear-gradient(270deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        '&:hover': {
          opacity: 0.95,
          //backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        },
      }}
      variant="contained"
      color="primary"
      size="large"
      as={props.as}
      {...props}
      href={relativeHref}
    >
      {props.children}
    </Button>
  );
};

export default ButtonPrimary;
