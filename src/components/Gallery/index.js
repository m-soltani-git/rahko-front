import React, { useState, useEffect } from 'react';

import {
  Box,
  Chip,
  Card,
  Stack,
  Slider,
  Button,
  Checkbox,
  CardMedia,
  Typography,
  Breadcrumbs,
  CardActionArea,
  CircularProgress,
} from '@mui/material';

import LandscapeIcon from '@mui/icons-material/Landscape';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

import { useSelector } from 'react-redux';
import { isEmptyObject } from 'helpers/formatObject';
import { useLazyQuery } from '@apollo/client';

import graph from './graph';
import GalleryUploader from './GalleryUploader';
import GalleryAssignment from './GalleryAssignment';

import FolderRename from './FolderRename';
import FolderCreation from './FolderCreation';
import FolderDeletion from './FolderDeletion';

import { NewDialog, NewDialogActions, NewDialogContent, NewDialogTitle } from 'components';

const MediaAssignment = ({ modelId: id, model, refetch }) => {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(true);
  const [refreshModel, setRefreshModel] = useState(true);
  const [scale, setScale] = useState(120);
  const [files, setFiles] = useState([]);
  const [broads, setBroads] = useState();
  const [folders, setFolders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedPath, setSelectedPath] = useState();
  const { userToken } = useSelector((state) => state.auth);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const clearSelection = () => setSelected([]);
  const handleScale = (e, newValue) => setScale(newValue);

  const reload = (data) => {
    clearSelection();
    setFlag(!flag);
    data && setRefreshModel(!refreshModel);
  };

  const handleChangePath = (path) => {
    setSelected([]);
    setSelectedPath(path);
  };

  const handleSelect = (item) => {
    const selectedIndex = selected.map((item) => item?.id).indexOf(item.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const [getList, { loading }] = useLazyQuery(graph.list.query, {
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
      if (!isEmptyObject(data)) {
        setBroads(data[graph.list.name]?.path);
        setFolders(data[graph.list.name]?.directories);
        setFiles(data[graph.list.name]?.files?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    open && handleData(selectedPath);
  }, [flag, open, selectedPath]);

  return (
    <>
      <Button size="medium" variant="outlined" color="warning" onClick={onOpen}>
        گالری تصاویر
      </Button>
      <NewDialog label="گالری" open={open} onClose={onClose} maxWidth="xs">
        <NewDialogTitle
          title="گالری تصاویر"
          onClose={onClose}
          actions={
            <>
              <FolderRename
                path={selectedPath}
                old_name={selected[0]?.name}
                reload={reload}
                disabled={selected.length !== 1}
              />
              <FolderDeletion path={selectedPath} items={selected} reload={reload} />
              <FolderCreation path={selectedPath} reload={reload} />
            </>
          }
        >
          <Breadcrumbs sx={{ color: 'background.paper', pb: 1 }} aria-label="breadcrumb">
            <Chip
              onClick={() => handleChangePath(undefined)}
              label={
                <Typography variant="subtitle1" color="background.paper" fontSize={14}>
                  رسانه ها
                </Typography>
              }
              avatar={<HomeRoundedIcon color="inherit" fontSize="small" />}
            />
            {broads &&
              broads.split('/').map((item, i) => {
                const selectedPath = broads.split('/').slice(0, i).join('/');
                return (
                  item && (
                    <Chip
                      key={i}
                      size="small"
                      disabled={i + 1 === broads.split('/').length}
                      onClick={() => handleChangePath(`${selectedPath}/${item}`)}
                      label={
                        <Typography variant="subtitle2" color="background.paper" fontSize={14}>
                          {item}
                        </Typography>
                      }
                    />
                  )
                );
              })}
          </Breadcrumbs>
        </NewDialogTitle>
        <NewDialogContent>
            <Stack height={{xs: '100%', sm: 400}} direction="row" alignItems='self-start' overflow="scroll">
              {loading ? (
                <Stack justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress size={25} />
                </Stack>
              ) : (
                <Stack direction="row" flexWrap="wrap" rowGap={0.5} columnGap={0.5}>
                  {folders.map((url, i) => {
                    const name = url.split('/').reverse();
                    const isSelected = selected.find((select) => select.id === url);
                    return (
                      <Card
                        key={i}
                        sx={{
                          position: 'relative',
                          bgcolor: isSelected && 'action.hover',
                        }}
                      >
                        <CardActionArea onClick={() => handleChangePath(url)}>
                          <Stack
                            sx={{ height: scale, width: scale, fontSize: scale / 2, position: 'relative', pt: 3 }}
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <FolderRoundedIcon color="warning" fontSize="inherit" />
                            <Stack
                              sx={{ width: '100%', height: 32, position: 'absolute', left: 0, right: 0, bottom: 0 }}
                              bgcolor="#f9f9f999"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Typography color="text.primary" variant="caption" textAlign="center" p={1}>
                                {name[0]}
                              </Typography>
                            </Stack>
                          </Stack>
                        </CardActionArea>
                        <Checkbox
                          size="small"
                          checked={isSelected || false}
                          sx={{ position: 'absolute', left: 0, top: 0 }}
                          onChange={() =>
                            handleSelect({ id: url, key: 'folder', name: name[0], path: url, type: 'folder' })
                          }
                        />
                      </Card>
                    );
                  })}
                  {files.map((file, i) => {
                    const { path, basename, full_url, size } = file;
                    const isSelected = selected.find((select) => select.id === full_url);
                    return (
                      <Card
                        key={i}
                        sx={{
                          position: 'relative',
                          bgcolor: isSelected && 'action.hover',
                        }}
                      >
                        <CardActionArea
                          onClick={() =>
                            handleSelect({
                              id: full_url,
                              key: 'file',
                              name: basename,
                              path,
                              selectedPath,
                              size,
                              type: 'file',
                            })
                          }
                          // onClick={() => handlePreview(i)}
                          // onDoubleClick={() => handleChangePath(selectedPath)}
                        >
                          <CardMedia
                            sx={{ height: scale, width: scale, position: 'relative', backgroundPosition: 'center' }}
                            image={`https://${full_url}`}
                          >
                            <Stack
                              sx={{ width: '100%', height: 32, position: 'absolute', left: 0, right: 0, bottom: 0 }}
                              bgcolor="#f9f9f999"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Typography color="text.primary" variant="caption" textAlign="center" p={1} height="100%">
                                {basename}
                              </Typography>
                            </Stack>
                          </CardMedia>
                        </CardActionArea>
                        <Checkbox
                          size="small"
                          checked={isSelected || false}
                          sx={{ position: 'absolute', left: 0, top: 0 }}
                          onChange={() =>
                            handleSelect({
                              id: full_url,
                              key: 'file',
                              name: basename,
                              path,
                              selectedPath,
                              size,
                              type: 'file',
                            })
                          }
                        />
                      </Card>
                    );
                  })}
                </Stack>
              )}
            </Stack>
          {/* <Stack width={220} height={500} bgcolor="#f5f5f5">
              {selected.length > 0 && <FileDetails {...selected.at(-1)} />}
            </Stack> */}
          {/* </Stack> */}
        </NewDialogContent>
        <NewDialogActions>
          <Stack columnGap={1} px={1} direction="row" sx={{ width: 160 }} alignItems="center">
            <Stack
              alignItems="center"
              justifyContent="center"
              color="background.paper"
              width={24}
              height={24}
              fontSize={14}
            >
              <LandscapeIcon fontSize="inherit" />
            </Stack>
            <Slider
              sx={{ minWidth: 40 }}
              min={70}
              max={170}
              step={10}
              size="small"
              value={scale}
              onChange={handleScale}
            />
            <Stack
              alignItems="center"
              justifyContent="center"
              color="background.paper"
              width={24}
              height={24}
              fontSize={20}
            >
              <LandscapeIcon fontSize="inherit" />
            </Stack>
          </Stack>
          <Box flexGrow={1} />
          <GalleryUploader model={model} refetch={reload} path={selectedPath} />
          <GalleryAssignment
            model={model}
            modelId={id}
            refetch={refetch}
            paths={selected.map((select) => `${selectedPath}/${select.name}`)}
          />
        </NewDialogActions>
      </NewDialog>
    </>
  );
};

export default MediaAssignment;
