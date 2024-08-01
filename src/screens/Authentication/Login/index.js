import React, { useEffect } from "react";

import SignIn from "./SignIn";
// import Phone from './Phone';
// import OTP from './OTP';

import ResetPhone from "./ResetPhone";
import ResetOTP from "./ResetOTP";
import ResetPassword from "./ResetPassword";
import { Page } from "components";
import {
  Avatar,
  styled,
  Box,
  CardMedia,
  Button,
  Fade,
  Stack,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import BackgroundVideo from "./BackgroundVideo";
import useMousePosition from "hooks/useMousePosition";
import usePrefersReducedMotion from "hooks/usePrefersReducedMotion";

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: "transparent",
  marginTop: 4,
  // marginBottom: 8,
  // lineHeight: 1.2,
  display: 'flex',
  flexDirection: 'column',
  rowGap: 8,
  // fontWeight: 900,
  // letterSpacing: 1,
  textAlign: "center",
  // fontSize: "6rem",
  // fontFamily: "Barlow, sans-serif",
  background:
    "linear-gradient(300deg, rgb(0, 167, 111) 0%, rgb(255, 171, 0) 25%, rgb(0, 167, 111) 50%, rgb(255, 171, 0) 75%, rgb(0, 167, 111) 100%) 0% 0% / 400% text",
  padding: 0,
  animation: "ripple 40s infinite ease",
  "@keyframes ripple": {
    "0%": {
      backgroundPosition: "10% center",
    },
    "25%": {
      backgroundPosition: "100% center",
    },
    "50%": {
      backgroundPosition: "190% center",
    },
    "75%": {
      backgroundPosition: "100% center",
    },
    "100%": {
      backgroundPosition: "10% center",
    },
  },
}));

const CardBox1 = styled(CardMedia)(({ theme }) => ({
  width: 300,
  // height: 500,
  // height: '100%',
  // backgroundColor: "red",
  animation: "trans2 30s infinite alternate ease-in-out",
  // transform: "translateY(0%) translateZ(0px)",
  "@keyframes trans2": {
    "0%": {
      transform: "translateY(-80%) translateZ(0px)",
    },
    // "25%": {
    //   transform: "translateY(-100%) translateZ(0px)",
    // },
    // "50%": {
    //   transform: "translateY(0%) translateZ(0px)",
    // },
    // "75%": {
    //   transform: "translateY(100%) translateZ(0px)",
    // },
    "100%": {
      transform: "translateY(-20%) translateZ(0px)",
    },
  },
}));

const SideBarBox = styled(CardMedia)(({ theme }) => ({
  p: "40%",
  width: "100%",
  position: "absolute",
  animation: "sidebar 2s infinite alternate ease-in-out",
  "@keyframes sidebar": {
    "0%": {
      transform: "translateY(0%) translateZ(0px)",
    },
    "100%": {
      transform: "translateY(3%) translateZ(0px)",
    },
  },
}));

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

  const stepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <SignIn
            handleType={handleType}
            startLiveBackground={startLiveBackground}
          />
        );
      case 3:
        return <ResetPhone handleType={handleType} />;
      case 4:
        return <ResetOTP handleType={handleType} extra={extra} />;
      case 5:
        return <ResetPassword handleType={handleType} extra={extra} />;
      default:
        return "ناشناخته";
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     !screenSaver && setScreenSaver((prev) => !prev);
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, [screenSaver, transform]);

  return (
    <Page title="ورود">
      <BackgroundVideo
        blur={0}
        videoSource="https://hyperano.ir/videos/live-bg.mov"
        start={start}
      >
        <Stack width="100vw" height="100vh">
          <Fade in={!screenSaver} timeout={1000}>
            <Stack direction="row" height="100%">
              <Stack flex={2} px={4} justifyContent="center" alignItems="center">
                <StyledTitle fontSize="6rem" fontWeight="bold">
                  Dorlib
                </StyledTitle>
                <StyledTitle variant="h6">
                  سامانه اتوماسیون دندانپزشکی
                </StyledTitle>
                {stepContent(step)}
              </Stack>
              <Stack
                px={2}
                flex={3}
                justifyContent="center"
                position="relative"
                display={{xs: 'none', sm: 'flex'}}
                sx={{
                  backgroundImage: "url('/assets/grid.webp')",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <CardMedia
                  sx={{ position: "absolute", width: "100%", p: "40%" }}
                  image="/assets/screen.webp"
                />
                <SideBarBox
                  sx={{
                    p: "40%",
                    width: "100%",
                    position: "absolute",
                    animationDelay: "0.1s",
                    animationDuration: "5s",
                  }}
                  image="/assets/sidebar.webp"
                />
                <SideBarBox
                  sx={{
                    p: "40%",
                    width: "100%",
                    position: "absolute",
                    animationDelay: "0.3s",
                    animationDuration: "3s",
                  }}
                  image="/assets/chart.webp"
                />
                <SideBarBox
                  sx={{
                    p: "40%",
                    width: "100%",
                    position: "absolute",
                    animationDelay: "0s",
                    animationDuration: "4s",
                  }}
                  image="/assets/block.webp"
                />
              </Stack>
              {/* <Stack
                flex={1}
                alignItems="center"
                position="relative"
                bgcolor="ButtonHighlight"
              >
                <CardBox1 alt="01" image="/assets/images/light01.webp">
                  <Box height={200} bgcolor="green" />
                  <Box height={200} bgcolor="yellow" />
                  <Box height={200} bgcolor="green" />
                  <Box height={200} bgcolor="yellow" />
                  <Box height={200} bgcolor="green" />
                </CardBox1>
                <CardBox1 alt="01" image="/assets/images/light01.webp">
                  <Box height={200} bgcolor="blue" />
                  <Box height={200} bgcolor="red" />
                  <Box height={200} bgcolor="blue" />
                  <Box height={200} bgcolor="red" />
                  <Box height={200} bgcolor="blue" />
                </CardBox1>
              </Stack> */}

              {/* <Stack flex={1} height="100%" justifyContent="center" alignItems="center" position="absolute" top={0}> */}
              {/* <SignIn handleType={handleType} startLiveBackground={startLiveBackground} /> */}
              {/* </Stack> */}
            </Stack>
          </Fade>
          <Fade in={screenSaver} timeout={1000}>
            <Stack
              height="100%"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              top={0}
              rowGap={2}
            >
              <Avatar
                sx={{ width: 120, height: 120 }}
                variant="circular"
                alt="user"
                src="/assets/images/avatar.jpg"
              />
              <Typography color="#fff">پنل فروشندگان</Typography>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                sx={{ color: "#fff" }}
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
