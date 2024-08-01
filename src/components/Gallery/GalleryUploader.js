import graph from './graph';
import React, { useEffect, useState } from 'react';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { isEmptyObject } from 'helpers/formatObject';
import { CircularProgress, Stack, Tooltip, alpha, useTheme } from '@mui/material';

const GalleryUploader = ({ model, refetch, path }) => {
  const theme = useTheme();
  const [attachment, setAttachment] = useState(null);
  const { userToken } = useSelector((state) => state.auth);

  const [muatate, { loading }] = useMutation(graph.upload.query, {
    context: {
      serviceName: graph.upload.serviceName,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    },
  });

  const handleSubmit = async () => {
    try {
      const { data } = await muatate({
        variables: {
          path,
          files: attachment,
          model_name: model,
          // id: modelId,
          // do_replace: 1,
          // name: formState.values?.name
        },
      });
      if (!isEmptyObject(data)) {
        refetch();
        setAttachment(null);
        data[graph.upload.name]?.messages.map((message) =>
          toast.success(String(message))
        );
      }
    } catch (error) {
      setAttachment(null);
    }
  };

  const handleFileChange = ({ target: { validity, files } }) => {
    if (validity.valid) {
      setAttachment(files);
    }
  };

  useEffect(() => {
    attachment && handleSubmit();
  }, [attachment]);

  return (
    <Stack rowGap={1}>
      <form>
        <input
          multiple
          name="file"
          type="file"
          id="file-card"
          accept="image/*"
          maxLength={5}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="gallery-upload-card">
          <Tooltip title="بارگذاری">
            <Stack
              width={60}
              height={42}
              columnGap={1}
              borderRadius={2}
              direction="row"
              color="info.main"
              fontWeight="bold"
              border="1px solid"
              alignItems="center"
              bgcolor="action.hover"
              justifyContent="center"
              borderColor="info.main"
              sx={{
                ':hover': {
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                },
              }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <AddPhotoAlternateRoundedIcon color="inherit" fontSize="small" />
              )}
            </Stack>
          </Tooltip>
        </label>
      </form>
    </Stack>
  );
};

export default GalleryUploader;
