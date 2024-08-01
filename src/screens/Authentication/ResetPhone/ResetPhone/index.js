import { Stack, Container, Typography, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';

import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';

import Form from './Form';
import graph from '../graph';
import { isEmptyObject } from 'helpers/formatObject';

// ----------------------------------------------------------------------

export default function ResetPhone({ handleType }) {
  const [forget] = useMutation(graph.forget.query);

  const onSubmit = async ({ formData }) => {
    try {
      const { data, errors } = await forget({
        variables: formData,
      });
      if (!errors && !isEmptyObject(data)) {
        handleType(4, formData);
        toast.success("کد بازیابی رمز عبور به تلفن همراه شما ارسال گردید");
        data[graph.forget.name]?.messages.map((message) =>
          toast.success(String(message))
        );
      }
    } catch (error) {}
  };
  return (
    <Card sx={{ width: 360 }}>
      <CardHeader
        title={
          <Typography variant="h4" gutterBottom>
            فراموشی رمز عبور
          </Typography>
        }
        subheader={<Typography sx={{ color: 'text.secondary' }}>لطفا شماره همراه خود را وارد نمایید</Typography>}
      />
      <CardContent>
        <Form onSubmit={onSubmit} />
      </CardContent>
      {/* <CardActions>
        <Button size="small" onClick={() => handleType(1)}>
          ثبت نام
        </Button>
        <Button size="small" onClick={() => handleType(3)}>
          فراموشی رمز عبور
        </Button>
      </CardActions> */}
    </Card>
  );
}
