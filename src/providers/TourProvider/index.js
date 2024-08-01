import React from "react";
import { useLockedBody } from "usehooks-ts";
import { TourProvider } from "@reactour/tour";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Box, Chip, IconButton, Stack } from "@mui/material";

import MobileStepper from "@mui/material/MobileStepper";
import CloseRounded from "@mui/icons-material/CloseRounded";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

function Badge({ children }) {
  return (
    <Box sx={{ position: "absolute", left: 16, top: 8, color: "#fff" }}>
      {children}
    </Box>
  );
}

function Close({ onClick, disabled }) {
  return (
    <IconButton
      size="small"
      color="error"
      onClick={onClick}
      disabled={disabled}
      sx={{ position: "absolute", right: 16, top: 8 }}
    >
      <CloseRounded fontSize="small" />
    </IconButton>
  );
}

function Navigation({ rtl, steps, disableAll, currentStep, setCurrentStep }) {
  const length = steps.length;
  const handleNext = () => setCurrentStep((currentStep) => currentStep + 1);
  const handleBack = () => setCurrentStep((currentStep) => currentStep - 1);

  const NextNavButton = ({ rtl, handleNext, disabled }) => (
    <IconButton
      size="small"
      color="info"
      onClick={handleNext}
      disabled={disabled}
    >
      {rtl === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
    </IconButton>
  );

  const PrevNavButton = ({ rtl, handleBack, disabled }) => (
    <IconButton
      size="small"
      color="info"
      onClick={handleBack}
      disabled={disabled}
    >
      {rtl === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </IconButton>
  );

  return (
    <MobileStepper
      variant="dots"
      steps={length}
      position="static"
      color="info"
      activeStep={currentStep}
      sx={{ maxWidth: 400, flexGrow: 1, bgcolor: "transparent", p: 0 }}
      nextButton={
        rtl ? (
          <NextNavButton
            rtl={rtl}
            handleNext={handleNext}
            disabled={disableAll || currentStep === length - 1}
          />
        ) : (
          <PrevNavButton
            rtl={rtl}
            handleBack={handleBack}
            disabled={disableAll || currentStep === 0}
          />
        )
      }
      backButton={
        !rtl ? (
          <NextNavButton
            rtl={rtl}
            handleNext={handleNext}
            disabled={disableAll || currentStep === length - 1}
          />
        ) : (
          <PrevNavButton
            rtl={rtl}
            handleBack={handleBack}
            disabled={disableAll || currentStep === 0}
          />
        )
      }
    />
  );
}

function Content({ content }) {
  return (
    <Stack width={320} minHeight={120} mt={4} color="#fff">
      {typeof content === "function"
        ? content({ someOtherStuff: "Custom Text" })
        : content}
    </Stack>
  );
}

function BadgeContent({ totalSteps, currentStep }) {
  return (
    <Chip
      color="warning"
      size="small"
      label={`${digitsEnToFa(currentStep)} از ${digitsEnToFa(totalSteps)}`}
    />
  );
}

export default function Tour({ children }) {
  const [locked, setLocked] = useLockedBody(false, "root");
  const disableBodyScroll = () => setLocked(true);
  const enableBodyScroll = () => setLocked(false);

  return (
    <TourProvider
      rtl={true}
      padding={8}
      steps={[]}
      badgeContent={BadgeContent}
      afterOpen={disableBodyScroll}
      beforeClose={enableBodyScroll}
      components={{ Content, Badge, Close, Navigation }}
      styles={{
        maskWrapper: (base) => ({
          ...base,
          opacity: 0.9,
        }),
        popover: (base) => ({
          ...base,
          padding: 16,
          borderRadius: 16,
          boxShadow: "none",
          backgroundColor: "transparent",
        }),
        clickArea: (base) => ({
          ...base,
          color: "transparent",
        }),
        maskArea: (base) => ({
          ...base,
          rx: 8,
        }),
      }}
    >
      {children}
    </TourProvider>
  );
}
