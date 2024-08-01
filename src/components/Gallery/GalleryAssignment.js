import graph from './graph';
import React, { useState } from 'react';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';

import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { NewDialog, NewDialogActions, NewDialogContent, NewDialogTitle } from 'components';
import { Avatar, Button, Stack, Typography, CircularProgress } from '@mui/material';

export default function FileAssignment({ model, modelId, refetch, paths }) {
  const [open, setOpen] = useState(false);
  const { userToken } = useSelector((state) => state.auth);

  const [assign, { loading }] = useMutation(graph.assign.query, {
    context: {
      serviceName: graph.assign.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const onOpen = () => {
    if (!paths.length) {
      return toast.warning('حداقل یک رسانه انتخاب کنید');
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDone = async () => {
    try {
      const { data } = await assign({
        variables: {
          paths,
          id: modelId,
          model_name: model,
          method: 'COPY',
        },
      });
      if (!isEmptyObject(data)) {
        refetch();
        onClose();
        data[graph.assign.name]?.messages.map((message) =>
          toast.success(String(message))
        );
      }
    } catch (error) {}
  };

  return (
    <>
      <Button
        size="medium"
        color="secondary"
        variant="contained"
        onClick={onOpen}
        endIcon={
          loading ? (
            <CircularProgress color="inherit" size={22} />
          ) : (
            <AssignmentTurnedInRoundedIcon fontSize="small" color="inherit" />
          )
        }
      >
        تخصیص
      </Button>
      <NewDialog open={open} onClose={onClose} maxWidth="xs">
        <NewDialogTitle title="تخصیص به مدل" onClose={onClose} />
        <NewDialogContent>
          <Stack rowGap={3} py={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'secondary.lighter', fontSize: 60, width: 120, height: 120 }}>
              <AssignmentTurnedInRoundedIcon fontSize="inherit" color="secondary" />
            </Avatar>
            <Typography align="center" variant="subtitle1">
              آیا از تخصیص این مورد اطمینان دارید؟
            </Typography>
          </Stack>
        </NewDialogContent>
        <NewDialogActions>
          <Button color="warning" variant="outlined" onClick={onClose}>
            فعلا نه
          </Button>
          <Button color="secondary" variant="contained" disabled={loading} onClick={onDone} sx={{ minWidth: 80 }} autoFocus>
            {loading ? <CircularProgress color="inherit" size={24} /> : 'بله'}
          </Button>
        </NewDialogActions>
      </NewDialog>
    </>
  );
}
