import { Button, Stack, Container, Typography, Card, CardHeader, CardContent, CardActions } from '@mui/material';

import { toast } from 'react-toastify';
import { setUser } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Form from './Form';
import graph from '../graph';
import { isEmptyObject } from 'helpers/formatObject';

// ----------------------------------------------------------------------

export default function SignIn({ handleType, startLiveBackground }) {
  const { t } = useTranslation('translations');
  const dispatch = useDispatch();
  const [login] = useMutation(graph.login.query);

  const onSubmit = async ({ formData }) => {
    try {
      startLiveBackground(false);
      const { data, errors } = await login({
        variables: formData,
      });
      if (!errors && !isEmpty(data)) {
        const {
          adminLogin: {
            user: { cellphone, username, roles, permission_names, token },
          },
        } = data;
        let userRoles = [];
        roles.map((r) => {
          const { id, name, title } = JSON.parse(r);
          return userRoles.push({ id, name, title });
        });
        dispatch(
          setUser({
            isAuthenticated: true,
            userToken: token,
            userInfo: { cellphone, username, roles: userRoles, permission: permission_names },
          })
        );
        data[graph.login.name]?.messages.map((message) => toast.success(String(message)));
        startLiveBackground(true)
      }
    } catch (error) {
      startLiveBackground(true)
    }
  };
  return (
    <Card sx={{ width: 360, bgcolor: '#f9f9f9' }}>
      <CardHeader
        title={
          <Typography variant="h4" gutterBottom>
            {t('sign.login')}
          </Typography>
        }
        subheader={<Typography sx={{ color: 'text.secondary' }}>{t('sign.detail')}</Typography>}
      />
      <CardContent>
        <Form onSubmit={onSubmit} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleType(1)}>
          ثبت نام
        </Button>
        <Button size="small" onClick={() => handleType(3)}>
          فراموشی رمز عبور
        </Button>
      </CardActions>
    </Card>
  );
}
