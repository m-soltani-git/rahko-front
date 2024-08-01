
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { toast } from 'react-toastify';
import graph from './graph';
import { IconButton } from '@mui/material';

export default function FolderCreation({ path, old_name, reload }) {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const { userToken } = useSelector((state) => state.auth);

  const [creation, { loading }] = useMutation(graph.update.query, {
    context: {
      serviceName: graph.update.serviceName,
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

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleCreate = async () => {
    try {
      const { data } = await creation({
        variables: {
          path,
          old_name,
          new_name: name,
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
        disabled={!old_name}
        color="warning"
        size="small"
        sx={{
          bgcolor: 'warning.lighter',
          color: 'warning.main',
        }}
        onClick={handleClickOpen}
      >
        <DriveFileRenameOutlineRoundedIcon fontSize="small" />
      </IconButton>
      <Dialog dir="rtl" open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ px: 1 }}>تغییر نام "{old_name}"</DialogTitle>
        <DialogContent sx={{ p: 1 }}>
          <TextField
            autoFocus
            fullWidth
            id="name"
            type="text"
            margin="dense"
            label="نام جدید"
            placeholder="نام جدید"
            onChange={handleChange}
            value={name}
          />
        </DialogContent>
        <DialogActions sx={{ p: 1 }}>
          <Button sx={{ minWidth: 120 }} variant="contained" disabled={loading} onClick={handleCreate}>
            تغییر نام
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
