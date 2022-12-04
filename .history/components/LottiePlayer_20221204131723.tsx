import { MutableRefObject, useEffect, useRef, useState } from 'react';
import lottie, { AnimationConfigWithData } from 'lottie-web';

interface LottiePlayerProps {
  animationData?: any;
  path?: string;
  loop?: boolean;
  play?: boolean;
  style?: any;
  eventListeners?: any;
  playOnHover?: boolean;
  hoverElement?: MutableRefObject<HTMLElement>;
  className?: string;
  animationCompleted?: () => void;
}

export default function LottiePlayer(props: LottiePlayerProps) {
  const {
    animationData,
    path,
    loop = false,
    play = false,
    style,
    eventListeners,
    playOnHover = false,
    hoverElement,
    className,
    animationCompleted,
  } = props;
  const [animation, setAnimation] = useState<any>(null);
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    if (animationData) {
      setAnimation(
        lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop,
          autoplay: play,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        })
      );
    } else {
      setAnimation(
        lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop,
          autoplay: play,
          path,
          rendererSettings: {
            preserveAspectRatio: 'xMinYMin slice',
          },
        })
      );
    }
  }, [animationData, path]);

  useEffect(() => {
    if (animation) {
      if (play) {
        animation.play();
      } else {
        animation.stop();
      }
    }
  }, [animation, play]);

  /* useEffect(() => {
    if (animation) {
      if (eventListeners) {
        eventListeners.forEach((eventName: any) => {
          animation.addEventListener(eventName, () => {
            if (eventName === 'complete' && props?.animationCompleted) {
              props.animationCompleted();
            }
          });
        });
      }
    }
  }, [animation, eventListeners]); */

  useEffect(() => {
    if (animation) {
      let element = (
        !hoverElement ? container.current : hoverElement.current
      ) as HTMLElement;

      if (playOnHover) {
        element.addEventListener(
          'mouseenter',
          () => {
            animation.setDirection(1);
            animation.play();
          },
          {
            passive: true,
          }
        );
        element.addEventListener(
          'mouseleave',
          () => {
            animation.setDirection(-1);
            animation.play();
          },
          {
            passive: true,
          }
        );
      }
    }
  }, [animation, playOnHover]);

  return <div className={className} ref={container} style={style} />;
}
