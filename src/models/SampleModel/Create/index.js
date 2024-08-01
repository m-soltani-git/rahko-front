import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded';

import Form from './Form';
import graph from './graph';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { NewDialog, NewDialogActions, NewDialogContent, NewDialogTitle } from 'components';
import { FormattedMessage } from 'react-intl';

export default function CreatePopup({ title, refetch }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { userToken } = useSelector((state) => state.auth);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const [formUpdate, { loading }] = useMutation(graph.create.query, {
    context: {
      serviceName: graph.create.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const onChange = ({ formData }) => {
    setFormData(formData);
  };

  const onSubmit = async () => {
    try {
      const { data, errors } = await formUpdate({
        variables: formData,
      });
      if (!errors) {
        refetch();
        onClose();
        if (!isEmptyObject(data)) {
          data[graph.create.name]?.messages.map((message) => toast.success(String(message)));
        }
      }
    } catch (error) {
      setFormData(formData);
    }
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton
          size="medium"
          color="warning"
          onClick={onOpen}
          disabled={loading}
          sx={{ bgcolor: 'action.selected' }}
        >
          <AddCircleOutlineRounded fontSize="small" />
        </IconButton>
      </Tooltip>
      <NewDialog label="create" open={open} onClose={onClose} maxWidth="xs">
        <NewDialogTitle title={title} onClose={onClose} />
        <NewDialogContent>
          <Stack p={2} alignItems="center">
            <Form formData={formData} onChange={onChange} />
          </Stack>
        </NewDialogContent>
        <NewDialogActions>
          <Button size="large" variant="contained" onClick={onSubmit}>
            <FormattedMessage id="create" />
          </Button>
        </NewDialogActions>
      </NewDialog>
    </>
  );
}
