import { useState, useEffect } from 'react';
import LottiePlayer from './LottiePlayer';
import confetiDesktop from '../assets/lotties/confeti-desktop.json';

interface Props {
  playAnimation: boolean;
}

export default function Confetti(props: Props) {
  const { playAnimation } = props;
  const [confetti, setConfetti] = useState<boolean>(false);
  useEffect(() => {
    if (playAnimation) {
      setConfetti(true);
    }
  }, [playAnimation]);
  return (
    <div>
      {confetti && (
        <LottiePlayer
          className="confeti-desktop"
          animationData={confetiDesktop}
          play={playAnimation}
          loop={false}
          eventListeners={['complete']}
          animationCompleted={() => setConfetti(false)}
          style={{
            position: 'fixed',
            top: 'auto',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            width: 'auto',
            minWidth: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  );
}
