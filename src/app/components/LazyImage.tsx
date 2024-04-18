/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

type LazyImageProps = {
  src: string;
  onLazyLoad?: (nodeImage: HTMLImageElement) => void;
};
type ImageNativeProps = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNativeProps;

export const LazyImage = ({
  src,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const imageBase =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';
  const [imageSrc, setImageSrc] = useState<string>(imageBase);
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);

  useEffect(() => {
    if (isLazyLoaded) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
          setIsLazyLoaded(true);

          if (typeof onLazyLoad === 'function' && node.current) {
            onLazyLoad(node.current);
          }
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return <img ref={node} src={imageSrc} {...imgProps} />;
};
