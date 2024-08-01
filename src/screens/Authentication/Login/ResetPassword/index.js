import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";

import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { isEmptyObject } from "helpers/formatObject";

import Form from "./Form";
import graph from "../graph";

// ----------------------------------------------------------------------

export default function ResetPassword({ handleType, extra }) {
  const [forget] = useMutation(graph.forget.query);

  const onSubmit = async ({ formData }) => {
    try {
      const { data, errors } = await forget({
        variables: { ...formData, ...extra },
      });
      if (!errors && !isEmptyObject(data)) {
        handleType(0);
        data[graph.forget.name]?.messages.map((message) =>
          toast.success(String(message))
        );
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
        <Button onClick={() => handleType(3)}>
          رمز عبور خود را فراموش کرده‌اید؟
        </Button>
      </CardActions>
    </Card>
  );
}
