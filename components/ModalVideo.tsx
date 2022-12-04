import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface ModalVideoProps {
  videoUrl: string;
  cta?: JSX.Element;
  modalVideoOpen: boolean;
  toggleModalVideo: () => void;
}

export default function ModalVideo(props: ModalVideoProps) {
  const theme = useTheme();
  const { videoUrl, cta } = props;

  const styles = {
    modalCard: {
      maxWidth: '90%',
      width: 700,
      height: 600,
      borderRadius: 10,
      boxShadow: 24,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      padding: theme.spacing(1),
    },
    iframeWrapper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    },
    iframe: {
      width: '90%',
      height: 400,
      display: 'block',
      margin: '0 auto',
    },
    closeBtn: {
      position: 'absolute',
    },
  };

  return (
    <Modal open={props.modalVideoOpen} onClose={props.toggleModalVideo}>
      <Card sx={styles.modalCard}>
        <IconButton sx={styles.closeBtn} onClick={props.toggleModalVideo}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.iframeWrapper}>
          <iframe
            style={styles.iframe}
            src={`${videoUrl}?autoplay=1`}
            allow="autoplay; encrypted-media"
            frameBorder={0}
          ></iframe>
          {cta && <Box sx={{ textAlign: 'center', mt: 5 }}>{cta}</Box>}
        </Box>
      </Card>
    </Modal>
  );
}
