import { toast } from 'react-toastify';
import { signIn } from "toolkits/redux/auth";
import { useDispatch } from 'react-redux';
import { isEmptyObject } from 'helpers/formatObject';
import { useMutation } from '@apollo/client';
import { Typography, Card, CardHeader, CardContent, Box } from '@mui/material';

import Form from './Form';
import graph from '../graph';

// ----------------------------------------------------------------------

export default function SignIn({ handleType, startLiveBackground }) {
  const dispatch = useDispatch();
  const [login] = useMutation(graph.login.query);

  const onSubmit = async ({ formData }) => {
    try {
      startLiveBackground(false);
      const { data, errors } = await login({
        variables: formData,
      });
      if (!errors && !isEmptyObject(data)) {
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
          signIn({
            isAuthenticated: true,
            userToken: token,
            userInfo: {
              username,
              cellphone,
              roles: userRoles,
              permission: permission_names,
            },
          })
        );
        data[graph.login.name]?.messages.map((message) =>
          toast.success(String(message))
        );
        startLiveBackground(true);
      }
    } catch (error) {
      startLiveBackground(true)
    }
  };
  return (
    <Box width={340}>
      <Form onSubmit={onSubmit} handleType={handleType} />
    </Box>
  );
  // return (
  //   <Card variant='outlined'>
  //     <CardHeader
  //       title={
  //         <Typography variant="h4">
  //           ورود
  //         </Typography>
  //       }
  //       subheader={<Typography sx={{ color: 'text.secondary' }}>مشخصات خود را وارد نمایید</Typography>}
  //     />
  //     <CardContent sx={{ p: 1 }}>
  //       <Form onSubmit={onSubmit} handleType={handleType} />
  //     </CardContent>
  //   </Card>
  // );
}
