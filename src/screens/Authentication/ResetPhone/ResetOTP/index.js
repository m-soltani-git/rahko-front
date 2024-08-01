import { useEffect, useState } from 'react';
import { Button, Stack, Container, Typography, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { useCountdown } from 'usehooks-ts';
import PinField from 'react-pin-field';

// ----------------------------------------------------------------------

export default function ResetOTP({ handleType, extra }) {
  const [isComplete, setComplete] = useState(false);

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  });

  const handleActivate = async (register_code) => {
    setComplete(true);
    handleType(5, { ...extra, register_code });
    resetCountdown();
    startCountdown();
  };

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <Card sx={{ width: 420 }}>
      <CardHeader
        title={
          <Typography variant="h4" gutterBottom>
            فراموشی رمز عبور
          </Typography>
        }
        subheader={<Typography sx={{ color: 'text.secondary' }}>لطفا شماره همراه خود را وارد نمایید</Typography>}
      />
      <CardContent>
        <Stack direction="row-reverse" justifyContent="space-evenly">
          <PinField
            length={5}
            type="number"
            onComplete={(val) => handleActivate(val)}
            style={{
              width: 64,
              height: 64,
              border: '2px solid',
              borderRadius: 10,
              textAlign: 'center',
              fontSize: 36,
              direction: 'rtl',
              borderColor: isComplete ? '4caf50' : '#a4c5ff',
              color: '#606060',
              transition: 'all 1s ease',
            }}
            autoFocus
            validate={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          sx={{ mt: 1 }}
          color="primary"
          disabled={count > 0}
          fullWidth
          size="large"
          variant="contained"
          onClick={() => handleType(3)}
        >
          {count > 0 ? `${count} ثانیه` : 'ارسال مجدد کد فعالسازی'}
        </Button>
        <Typography color="textSecondary" variant="body1">
          حساب کاربری دارید؟ <Button onClick={() => handleType(0)}>ورود</Button>
        </Typography>
      </CardActions>
    </Card>
  );
}
