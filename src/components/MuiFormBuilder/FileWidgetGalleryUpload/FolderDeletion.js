
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { toast } from 'react-toastify';
import graph from './graph';
import { IconButton } from '@mui/material';

export default function FolderDeletion({ path, items, reload }) {
  const [open, setOpen] = useState(false);
  const { userToken } = useSelector((state) => state.auth);

  const [creation, { loading }] = useMutation(graph.delete.query, {
    context: {
      serviceName: graph.delete.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    try {
      const { data } = await creation({
        variables: {
          path,
          items,
        },
      });
      if (!isEmpty(data)) {
        reload();
        handleClose();
      }
    } catch (error) {}
  };

  return (
    <div>
      <IconButton
        color="error"
        size="small"
        sx={{
          bgcolor: 'error.lighter',
          color: 'error.main',
        }}
        onClick={handleClickOpen}
        disabled={items.length === 0}
      >
        <DeleteRoundedIcon fontSize="small" />
      </IconButton>
      <Dialog dir="rtl" open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ px: 1 }}>آیا از حذف این پوشه مطمئن هستید؟</DialogTitle>
        <DialogActions sx={{ px: 1 }}>
          <Button sx={{ minWidth: 120 }} color="error" onClick={handleClose}>
            الان نه
          </Button>
          <Button sx={{ minWidth: 120 }} color="error" variant="contained" disabled={loading} onClick={handleCreate}>
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
