import React, { useEffect } from 'react';

import ResetPhone from './ResetPhone';
// import Phone from './Phone';
// import OTP from './OTP';

// import ResetPhone from './ResetPhone';
// import ResetOTP from './ResetOTP';
// import ResetPassword from './ResetPassword';
import { Page } from 'components';
import { Avatar, Box, Button, Fade, Stack, Typography } from '@mui/material';

import BackgroundVideo from './BackgroundVideo';
import useMousePosition from 'hooks/useMousePosition';
import usePrefersReducedMotion from 'hooks/usePrefersReducedMotion';

const UserPopup = () => {
  const [extra, setExtra] = React.useState(null);
  const [step, setStep] = React.useState(0);
  const [start, setStart] = React.useState(true);
  const [screenSaver, setScreenSaver] = React.useState(false);
  // const mousePosition = useMousePosition();
  // const prefersReducedMotion = usePrefersReducedMotion();

  // const transform = prefersReducedMotion ? null : mousePosition.x + mousePosition.y;

  const startLiveBackground = (start) => setStart(start);

  const handleType = (data, extra = null) => {
    setExtra(extra);
    setStep(data);
  };

  // const stepContent = (stepIndex) => {
  //   switch (stepIndex) {
  //     case 0:
  //       return <ResetPhone handleType={handleType} startLiveBackground={startLiveBackground} />;
  //     // case 1:
  //     //   return <Phone handleType={handleType} />;
  //     // case 2:
  //     //   return <OTP handleType={handleType} extra={extra} />;
  //     case 3:
  //       return <ResetPhone handleType={handleType} />;
  //     case 4:
  //       return <ResetOTP handleType={handleType} extra={extra} />;
  //     case 5:
  //       return <ResetPassword handleType={handleType} extra={extra} />;
  //     default:
  //       return 'ناشناخته';
  //   }
  // };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     !screenSaver && setScreenSaver((prev) => !prev);
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, [screenSaver, transform]);

  return (
    <Page title="ورود">
      <BackgroundVideo blur={0} videoSource="https://hyperano.ir/videos/live-bg.mov" start={start}>
        <Stack position="relative" width="100vw" height="100vh" justifyContent="center" alignItems="center">
          <Fade in={!screenSaver} timeout={1000}>
            <Stack height="100%" justifyContent="center" alignItems="center" position="absolute" top={0}>
              <ResetPhone handleType={handleType} startLiveBackground={startLiveBackground} />
            </Stack>
          </Fade>
          <Fade in={screenSaver} timeout={1000}>
            <Stack height="100%" justifyContent="center" alignItems="center" position="absolute" top={0} rowGap={2}>
              <Avatar sx={{ width: 120, height: 120 }} variant="circular" alt="user" src="/assets/images/avatar.jpg" />
              <Typography color="#fff">پنل فروشندگان</Typography>
              <Button
                sx={{ color: '#fff' }}
                color="inherit"
                fullWidth
                variant="outlined"
                onClick={() => setScreenSaver(!screenSaver)}
              >
                ورود
              </Button>
            </Stack>
          </Fade>
        </Stack>
      </BackgroundVideo>
    </Page>
  );
};

export default UserPopup;
