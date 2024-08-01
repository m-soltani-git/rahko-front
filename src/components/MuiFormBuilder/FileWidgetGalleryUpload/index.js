import React, { useState, useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import {
  Box,
  Chip,
  Stack,
  Card,
  Avatar,
  Popover,
  useTheme,
  Typography,
  CircularProgress,
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { isEmptyObject } from 'helpers/formatObject';

import FolderCreation from './FolderCreation';
import FolderRename from './FolderRename';
import FolderDeletion from './FolderDeletion';
import FileUpload from './FileUpload';
import graph from './graph';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImagePopover = ({ image }) => {
  // const img = images ? JSON.parse(images)?.medium[0] : '';
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Avatar
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        src={image.full_url}
        sx={{ width: 40, height: 40 }}
      />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Avatar variant="rounded" src={image.full_url} sx={{ width: '100%', height: 250 }} />
      </Popover>
    </Box>
  );
};

const FileWidgetGallery = (props) => {
  const { id, required, schema, value, onChange, rawErrors } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (file) => {
    onChange(file);
    handleClose();
  };

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [broads, setBroads] = useState();
  const [path, setPath] = useState();
  const [total, setTotal] = useState(0);
  const [medias, setMedias] = useState([]);
  const [flag, setFlag] = useState(true);

  const [selected, setSelected] = useState();

  const [active, setActive] = useState('1');
  const handleActive = (event, newValue) => setActive(newValue);

  const reload = () => setFlag(!flag);

  const { userToken } = useSelector((state) => state.auth);

  const [getList, { data, loading }] = useLazyQuery(graph.list.query, {
    context: {
      serviceName: graph.list.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const handleData = async (path) => {
    try {
      const { data } = await getList({
        variables: {
          path,
        },
      });
      if (!isEmpty(data)) {
        setBroads(data[graph.list.name]?.path);
        setFolders(data[graph.list.name]?.directories);
        setFiles(data[graph.list.name]?.files?.data);
      }
    } catch (error) {}
  };

  const handleChangePath = (path) => {
    setSelected({});
    setPath(path);
  };

  useEffect(() => {
    open &&
    handleData(path);
  }, [flag, active, open, path]);

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const openContxt = Boolean(anchorEl);
  // const handleClickContext = (event) => {
  //   event.preventDefault();
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleCloseContext = () => {
  //   setAnchorEl(null);
  // };

  // useEffect(() => {
  //   // document.addEventListener('click', handleClick);
  //   document.addEventListener('contextmenu', (event)=> openContxt && event.preventDefault());
  //   return () => {
  //     // document.addEventListener('click', handleClick);
  //     document.removeEventListener('contextmenu', (event)=> openContxt && event.preventDefault());
  //   };
  // });

  console.log("selected", selected)

  return (
    <>
      <Button
        sx={{ height: 60 }}
        size="large"
        color={!value ? 'primary' : 'secondary'}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {schema.title}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
        onClose={handleClose}
        style={{ direction: 'rtl' }}
        scroll="body"
      >
        <DialogTitle sx={{ p: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Breadcrumbs aria-label="breadcrumb">
              <Chip
                onClick={() => handleChangePath(undefined)}
                label={
                  <Typography variant="subtitle1" color="text.primary" fontSize={14}>
                    رسانه ها
                  </Typography>
                }
                avatar={<HomeRoundedIcon fontSize="inherit" />}
              />
              {broads &&
                broads.split('/').map((item, i) => {
                  const path = broads.split('/').slice(0, i).join('/');
                  return (
                    item && (
                      <Chip
                        key={i}
                        size="small"
                        disabled={i + 1 === broads.split('/').length}
                        onClick={() => handleChangePath(`${path}/${item}`)}
                        label={
                          <Typography variant="subtitle2" color="text.primary" fontSize={14}>
                            {item}
                          </Typography>
                        }
                      />
                    )
                  );
                })}
            </Breadcrumbs>
            <Stack direction="row" justifyContent="space-between" alignItems="center" columnGap={1}>
              <FolderRename path={path} old_name={selected?.name} reload={reload} />
              <FolderDeletion
                path={path}
                items={selected ? [{ key: selected.key, name: selected.name }] : []}
                // items={selected ? selected.map((item) => ({ key: item.key, name: item.name })) : []}
                reload={reload}
              />
              <FolderCreation path={path} reload={reload} />
              <FileUpload path={path} reload={reload} onChange={onChange} handleCloseParent={handleClose} />
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 1, height: 500 }}>
          <Stack height="100%">
            {loading ? (
              <Stack justifyContent="center" alignItems="center" height="100%">
                <CircularProgress size={25} />
              </Stack>
            ) : (
              <Stack direction="row" flexWrap="wrap" columnGap={1} rowGap={1}>
                {folders.map((url) => {
                  const name = url.split('/').reverse();
                  return (
                    <Card sx={{ bgcolor: selected?.path === url && '#eee' }}>
                      <CardActionArea
                        // onContextMenu={handleClickContext}
                        onClick={() => setSelected({ key: 'folder', name: name[0], path: url })}
                        onDoubleClick={() => handleChangePath(url)}
                      >
                        <Stack sx={{ width: 120, height: 120 }} alignItems="center" justifyContent="center">
                          <FolderRoundedIcon color="warning" fontSize="large" />
                          <Typography color="text.primary" variant="caption" textAlign="center">
                            {name[0]}
                          </Typography>
                        </Stack>
                      </CardActionArea>
                    </Card>
                  );
                })}
                {files.map((file) => {
                  const { basename, full_url } = file;
                  return (
                    <Card sx={{ bgcolor: selected?.path === path && '#eee' }}>
                      <CardActionArea
                        onClick={() => setSelected({ key: 'file', name: basename, path: path })}
                        onDoubleClick={() => handleChangePath(path)}
                      >
                        <CardMedia sx={{ width: 120, height: 120, position: 'relative' }} image={`https://${full_url}`}>
                          <Stack
                            sx={{ width: '100%', height: 40, position: 'absolute', left: 0, right: 0, bottom: 0 }}
                            bgcolor="#f9f9f999"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography color="text.primary" variant="caption" textAlign="center">
                              {basename}
                            </Typography>
                          </Stack>
                        </CardMedia>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </Stack>
            )}
            {/* <Stack direction="row" flexWrap="wrap" columnGap={1} rowGap={1}>
              <Tabs
                TabIndicatorProps={{ sx: { display: 'none' } }}
                // sx={{ ml: 0, bgcolor: 'transparent', borderRadius: 2 }}
                value={active}
                onChange={handleActive}
                variant="scrollable"
                scrollButtons="auto"
              >
                {folders.map((item, m) => {
                  const { id, title } = item;
                  return (
                    <Tab
                      key={m}
                      value={id}
                      label={title}
                      sx={{
                        py: 3,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        bgcolor: active === id ? '#f9f9f977' : '#fff',
                      }}
                    />
                  );
                })}
              </Tabs>

              {loading ? (
                <CircularProgress />
              ) : (
                medias.map((item, m) => {
                  const { id, title, media } = item;
                  return (
                    <Stack key={m} rowGap={1} width="100%">
                      <Typography fontSize={14} variant="subtitle1">
                        {title}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" justifyContent="space-between" columnGap={1} rowGap={1}>
                        {media.map((image, i) => (
                          // <ImagePopover image={image} />
                          <Card
                            key={i}
                            sx={{
                              width: 120,
                              height: 120,
                              border: value === String(image.id) ? '1px solid green' : '1px solid #eee',
                            }}
                          >
                            <CardActionArea onClick={() => handleChange(String(image.id))}>
                              <CardMedia
                                title={image.title}
                                image={image.full_url}
                                sx={{ bgcolor: 'cover', height: 120, opacity: value === String(image.id) ? 0.5 : 1 }}
                              />
                            </CardActionArea>
                          </Card>
                        ))}
                      </Stack>
                    </Stack>
                  );
                })
              )}
            </Stack> */}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileWidgetGallery;
