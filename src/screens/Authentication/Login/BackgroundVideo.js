import { Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const BackgroundVideo = ({ videoSource, children, blur, start }) => {
  const vidRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (start) {
        if (vidRef.current.playbackRate <= 1) {
          console.log(vidRef.current.playbackRate);
          vidRef.current.playbackRate += 0.25;
        }
      } else {
        if (vidRef.current.playbackRate > 0) {
          vidRef.current.playbackRate -= 0.25;
        }
      }
    }, 250);
    return () => clearInterval(interval);
  }, [start]);

  const b = start ? 0 : 6;

  return (
    <Stack position="relative" overflow="hidden">
      <video
        ref={vidRef}
        style={{
          minWidth: '100%',
          minHeight: '100%',
          position: 'fixed',
          right: 0,
          bottom: 0,
          filter: `blur(${b}px)`,
          WebkitFilter: `blur(${b}px)`,
          transition: 'all 2s ease',
        }}
        loop
        muted
        autoPlay
        playsInline
        id="video-id"
      >
        <source src={videoSource} type="video/mp4" />
      </video>
      {children}
    </Stack>
  );
};

export default BackgroundVideo;
