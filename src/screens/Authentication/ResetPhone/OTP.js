import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { toast } from "react-toastify";
import decode from "jwt-decode";

import { useCountdown } from 'usehooks-ts';

import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
// import { register, notification } from "redux/actions";
import graph from './graph';

import PinField from "react-pin-field";
import { Card, CardContent, CardHeader } from '@mui/material';

const OTP = (props)=> {
  const dispatch = useDispatch();
  const {handleType, handleClose, extra} = props;

  const [isComplete, setComplete] = useState(false)

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    })

  const auth = useSelector(state => state.auth);
  const { isAuthenticated } = auth;

  const handleActivate = async (register_code) => {
    setComplete(true)
    // dispatch(register({ register_code, ...extra }))
    handleType(0)
    resetCountdown()
    startCountdown()
  }

  useEffect( ()=>{
    isAuthenticated && handleClose()
  }, [isAuthenticated]) // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect( ()=>{
    startCountdown()
  }, [])
  

  const [registerUser] = useMutation(graph.register.query);

  const handleSignUp = async (resend_register_code) =>{
    try {
      const result = await registerUser({
        variables: { ...extra, resend_register_code}
      })
      if (result.data) {
        toast.success("کد ثبت نام به تلفن همراه شما ارسال گردید")
        resetCountdown()
        startCountdown()
      }
    } catch (error) {
      // toast.error(error.message)
    }
  }

  return (
    <Card sx={{ width: 420 }}>
      <CardHeader />
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
      <Button
        sx={{ mt: 1 }}
        color="primary"
        disabled={count > 0}
        fullWidth
        size="large"
        variant="contained"
        onClick={() => handleSignUp(1)}
      >
        {count > 0 ? `${count} ثانیه` : 'ارسال مجدد کد فعالسازی'}
      </Button>
      <Typography color="textSecondary" variant="body1">
        حساب کاربری دارید؟ <Button onClick={() => handleType(0)}>ورود</Button>
      </Typography>
    </Card>
  );
}

export default OTP;
