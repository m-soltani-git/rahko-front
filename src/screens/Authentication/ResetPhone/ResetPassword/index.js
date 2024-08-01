import { Button, Stack, Container, Typography, Card, CardHeader, CardContent, CardActions } from '@mui/material';

import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Form from './Form';
import graph from '../graph';
import { isEmptyObject } from 'helpers/formatObject';

// ----------------------------------------------------------------------

export default function ResetPassword({ handleType, extra }) {
  const { t } = useTranslation('translations');
  const [forget] = useMutation(graph.forget.query);

  const onSubmit = async ({ formData }) => {
    try {
      const { data, errors } = await forget({
        variables: { ...formData, ...extra },
      });
      if (!errors && !isEmpty(data)) {
        handleType(0);
        data[graph.forget.name]?.messages.map((message) => toast.success(String(message)));
      }
    } catch (error) {}
  };
  return (
    <Card sx={{ width: 420 }}>
      <CardHeader />
      <CardContent>
        <Form onSubmit={onSubmit} />
      </CardContent>
      <CardActions>
        <Button onClick={() => handleType(1)}>ثبت نام</Button>
        <Button onClick={() => handleType(3)}>رمز عبور خود را فراموش کرده‌اید؟</Button>
      </CardActions>
    </Card>
  );
}
