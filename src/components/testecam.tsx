import React, { useRef, useEffect, useState } from 'react';
import flv from 'flv.js';

interface FLVPlayerProps {
  streamUrl: string;
}

const FLVPlayer: React.FC<FLVPlayerProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let flvPlayer: any = null;
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const initializePlayer = () => {
      if (!isMounted || flvPlayer || !videoRef.current) return;

      flvPlayer = flv.createPlayer({
        type: 'flv',
        url: streamUrl,
      });

      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.load();
      flvPlayer.play();
    };

    initializePlayer();

    return () => {
      if (flvPlayer) {
        flvPlayer.destroy();
        flvPlayer = null;
      }
    };
  }, [isMounted, streamUrl]);

  const handleDestroyComponent = () => {
    setIsMounted(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls={true}></video>
      <button onClick={handleDestroyComponent}>Destruir Componente</button>
    </div>
  );
};

export default FLVPlayer;