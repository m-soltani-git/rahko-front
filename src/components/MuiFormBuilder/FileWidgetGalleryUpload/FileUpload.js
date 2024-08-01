import React, {useState} from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { CircularProgress, Stack } from '@mui/material';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import graph from './graph';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FileUpload = ({ path, reload, onChange, handleCloseParent }) => {
  const [open, setOpen] = useState(false);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  const { userToken } = useSelector((state) => state.auth);
  const [getData, { loading }] = useMutation(graph.upload.query, {
    variables: {},
    context: {
      serviceName: graph.upload.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await getData({
        variables: { files: attachment, path, name: formState?.name },
      });
      if (!isEmpty(data)) {
        console.log(data);
        // const res = data.myMedia?.media_records;
        // onChange(String(result.id))
        reload();
        handleClose();
        handleCloseParent();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [photoToUpload, setPhotoToUpload] = useState()
  // const [uploadPhoto] = useFileUpload({
  //   onStarting: (file) => {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file)
  //     reader.onloadend = () => setPhotoToUpload(reader.result)
  //   }
  // })

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  const [attachment, setAttachment] = useState(null);

  const handleFileChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      setAttachment(file);
    }
  };

  return (
    <div>
      <IconButton
        size="small"
        color="primary"
        sx={{
          bgcolor: 'primary.lighter',
          color: 'primary.main',
        }}
        onClick={handleClickOpen}
      >
        <AddPhotoAlternateRoundedIcon fontSize="small" />
      </IconButton>
      <Dialog dir="rtl" fullWidth open={open} maxWidth="sm" onClose={handleClose} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ px: 1 }} onClose={handleClose}>
            افزودن رسانه
          </DialogTitle>
          <DialogContent sx={{ p: 1 }}>
            <Stack>
              <Stack>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="file"
                  name="file"
                  multiple={false}
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file">
                  <Card style={{ boxShadow: 'none', border: '1px dashed #989898', marginBottom: 8 }}>
                    <CardHeader
                      title={attachment?.name || 'انتخاب فایل'}
                      subheader={attachment?.size ? `${(attachment.size / 1024).toFixed(2)} کیلوبایت` : ''}
                      avatar={
                        <Avatar
                          variant="rounded"
                          alt={'انتخاب فایل'}
                          // src={photoToUpload || '/assets/images/picture.png'}
                          src={'/assets/images/picture.png'}
                        />
                      }
                      action={
                        <IconButton disabled aria-label="upload">
                          <BackupRoundedIcon />
                        </IconButton>
                      }
                    />
                  </Card>
                </label>
              </Stack>

              <TextField
                error={hasError('name')}
                fullWidth
                helperText={hasError('name') ? formState.errors.name[0] : null}
                label="عنوان"
                name="name"
                onChange={handleChange}
                type="text"
                value={formState.values.name || ''}
                variant="outlined"
                margin="dense"
              />
              {/* <TextField
                error={hasError('caption')}
                fullWidth
                helperText={hasError('caption') ? formState.errors.caption[0] : null}
                label="توضیحات"
                name="caption"
                multiline
                rows={3}
                onChange={handleChange}
                type="text"
                value={formState.values.caption || ''}
                variant="outlined"
                margin="dense"
              />
              <TextField
                error={hasError('alt')}
                fullWidth
                helperText={hasError('alt') ? formState.errors.alt[0] : null}
                label="متن جایگزین"
                name="alt"
                onChange={handleChange}
                type="text"
                value={formState.values.alt || ''}
                variant="outlined"
                margin="dense"
              /> */}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 1 }}>
            <Button onClick={handleClose} color="primary" sx={{ minWidth: 120 }}>
              فعلا نه
            </Button>
            <Button type="submit" color="primary" variant="contained" sx={{ minWidth: 120 }}>
              {loading ? <CircularProgress size={22} /> : 'بارگذاری'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default FileUpload;