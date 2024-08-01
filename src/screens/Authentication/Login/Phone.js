import React, { useState, useEffect  } from 'react';
// import validate from 'validate.js';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import schema from "./schema";
import {notification} from "redux/actions";
import graph from './graph';

import { toast } from "react-toastify";
import decode from "jwt-decode";

import { useDispatch } from "react-redux";
import { useMutation } from '@apollo/client';

const Phone = (props)=> {
  const {handleNext, handleType} = props
  const dispatch = useDispatch()
 
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  
  // useEffect(() => {
  //   const errors = validate(formState.values, schema);
  //   setFormState(formState => ({
  //     ...formState,
  //     isValid: errors ? false : true,
  //     errors: errors || {}
  //   }));
  // }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : (event.target.value)
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const [ registerUser, { data, loading }] = useMutation(
      graph.register.query
  );

  const handleSignUp = async (event) =>{
    event.preventDefault();
    try {
      const result = await registerUser({
        variables: formState.values
      })
      if (result.data) {
        toast.success("کد ثبت نام به تلفن همراه شما ارسال گردید")
        handleType(2, formState.values)
      }
      if(result.errors) {
        console.log(result.errors)
      }
    } catch (error) {
      console.log(error.data)
      // if(error.message === "validation") {
      //   console.log(error.extensions)
      //   toast.error(error.message)
      // }else {
      //   toast.error(error.message)
      // }
    }
}

  const hasError = field =>
  formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form onSubmit={event=>handleSignUp(event)}>
    <Stack rowGap={1} columnGap={1} sx={{direction: 'rtl'}} pl={1} pr={1}>
      <TextField
        error={hasError('cellphone')}
        fullWidth
        helperText={
            hasError('cellphone') ? formState.errors.cellphone[0] : null
        }
        label="شماره تلفن همراه"
        name="cellphone"
        onChange={handleChange}
        type="tel"
        value={formState.values.cellphone || ''}
        variant="outlined"
        margin="dense"
      />
      {/* <TextField
        error={hasError('first_name')}
        fullWidth
        helperText={
            hasError('first_name') ? formState.errors.first_name[0] : null
        }
        label="نام"
        name="first_name"
        onChange={handleChange}
        type="text"
        value={formState.values.first_name || ''}
        variant="outlined"
        margin="dense"
      />
      <TextField
        error={hasError('last_name')}
        fullWidth
        helperText={
            hasError('last_name') ? formState.errors.last_name[0] : null
        }
        label="نام خانوادگی"
        name="last_name"
        onChange={handleChange}
        type="text"
        value={formState.values.last_name || ''}
        variant="outlined"
        margin="dense"
      /> */}
      <TextField
        error={hasError('password')}
        fullWidth
        helperText={
            hasError('password') ? formState.errors.password[0] : null
        }
        label="رمز عبور"
        name="password"
        onChange={handleChange}
        type="password"
        value={formState.values.password || ''}
        variant="outlined"
        margin="dense"
      />
        {/* <TextField
        error={hasError('re_password')}
        fullWidth
        helperText={
            hasError('re_password') ? formState.errors.re_password[0] : null
        }
        label="تکرار رمز عبور"
        name="re_password"
        onChange={handleChange}
        type="password"
        value={formState.values.re_password || ''}
        variant="outlined"
        margin="dense"
      /> */}
      <Button
        color="primary"
        disabled={!formState.isValid}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      >
        { loading ? <CircularProgress color="inherit" size={26} /> : "ثبت نام" }
      </Button>
      <Typography color="textSecondary" variant="body1">
        حساب کاربری دارید؟{' '}
        <Button onClick={()=>handleType(0)}>
          ورود
        </Button>
      </Typography>
    </Stack>
    </form>
  );
}

export default Phone