import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import schema from './schema';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { user } from 'apollo/requests';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, handleNewToken, setNotAuthenticated, pendingAuth, openCouponPopup } from 'redux/actions';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const { handleType, handleClose } = props;
  const auth = useSelector((state) => state.auth);

  const { isAuthenticated } = auth;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const [activateUser, { loading }] = useMutation(user.activateUser);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      errors: errors || {},
      isValid: errors ? false : true,
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      dispatch(pendingAuth());
      const {
        data: {
          activateUser: { user },
        },
      } = await activateUser({
        variables: formState.values,
      });
      if (user.token) {
        const { exp } = decode(user.token);
        dispatch(handleNewToken(user.token, exp));
        dispatch(
          setUser({
            id: user.id,
            token: user.token,
            cellphone: user.cellphone,
            tellphone: user.tellphone,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            roles: user.roles,
            wallet: user.wallet,
          })
        );
        if (user.category_coupons.length > 0) {
          dispatch(openCouponPopup(true));
        }
        // dispatch(setCoupons(user.category_coupons || []))
        toast.success('ورود با موفقیت انجام شد');
      }
    } catch (error) {
      dispatch(setNotAuthenticated());
      // toast.error(error.message)
    }
    // dispatch(login(formState.values))
  };

  useEffect(() => {
    isAuthenticated && handleClose();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  return (
    <form onSubmit={handleSignIn}>
      <Stack rowGap={1} columnGap={1} minWidth={300} sx={{ direction: 'rtl' }} pl={1} pr={1}>
        <TextField
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="نام کاربری"
          name="email"
          onChange={handleChange}
          type="text"
          value={formState.values.email || ''}
          variant="outlined"
          margin="dense"
        />
        <TextField
          error={hasError('password')}
          fullWidth
          helperText={hasError('password') ? formState.errors.password[0] : null}
          label="گذرواژه"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
          margin="dense"
        />
        <Button color="primary" disabled={!formState.isValid} fullWidth size="large" type="submit" variant="contained">
          {loading ? <CircularProgress size={20} /> : 'ثبت نام'}
        </Button>
        <Typography color="textSecondary" variant="body1">
          حساب کاربری دارید؟ <Button onClick={() => handleType(0)}>ورود</Button>
        </Typography>
      </Stack>
    </form>
  );
};

export default SignUp;
