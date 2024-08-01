import React, { useState } from 'react';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import { Stack, Tooltip, IconButton, CircularProgress, Box } from '@mui/material';
import { LoadingMore, NewDialogActions, NewDialogContent, NewDialogTitle } from 'components';

import Model from '../Model';
import Filter from '../Filter';
import Delete from '../Delete';
import Create from '../Create';
import Assignment from '../Assignment';
import { FormattedMessage } from 'react-intl';

export default function List({
  page,
  limit,
  total,
  setPage,

  result,
  refetch,
  loading,

  title,
  isPopup,
  onClose,

  isAssign,
  onAssign,
  assigning,
  multiSelect,

  filter,
  setFilter,
  clearFilter,
  preSelected,
}) {
  const [selected, setSelected] = useState(preSelected || []);
  const [direction, setDirection] = useState('right');

  const handleSelect = (item) => {
    const selectedIndex = selected.map((item) => item.id).indexOf(item.id);
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
    if (isAssign && !multiSelect && newSelected.length > 0) {
      onAssign(newSelected, onClose);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(result);
      return;
    }
    setSelected([]);
  };

  const clearSelection = () => setSelected([]);

  const refresh = () => {
    clearSelection();
    refetch();
  };

  return (
    <>
      {isAssign && (
        <Assignment
          title={title}
          onClose={onClose}
          onAssign={onAssign}
          selected={selected}
          assigning={assigning}
          handleSelect={handleSelect}
        />
      )}
      <NewDialogTitle title={title} onClose={onClose} isPopup={isPopup}>
        <Filter
          total={total}
          init={filter}
          ids={selected}
          refetch={refetch}
          loading={loading}
          setFilter={setFilter}
          clearFilter={clearFilter}
          acception={result.length}
          selection={selected.length}
          clearSelection={clearSelection}
          handleSelectAllClick={handleSelectAllClick}
          isPopup={isPopup}
        />
      </NewDialogTitle>
      <NewDialogContent>
        <Stack p={0.5} rowGap={0.5} minHeight={isPopup ? 'calc(100vh - 245px)' : 'calc(100vh - 264px)'}>
          {result.map((model, i) => (
            <Model
              key={i}
              model={model}
              refetch={refetch}
              style={{ flex: 1 }}
              direction={direction}
              delay={(i % limit) + 1}
              checked={selected.find((select) => model.id === select.id) ? true : false}
              handleSelect={() => handleSelect({ id: model?.id, title: model.title })}
            />
          ))}
          <LoadingMore total={total} result={result.length} loading={loading} onClick={() => setPage(page + 1)} />
        </Stack>
      </NewDialogContent>
      <NewDialogActions isPopup={isPopup}>
        <Tooltip title={<FormattedMessage id="refresh" />}>
          <IconButton sx={{ bgcolor: 'action.selected', color: '#fff' }} size="medium" onClick={refresh}>
            {loading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              <RefreshRoundedIcon color="inherit" fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
        <Delete ids={selected.map((item) => item.id)} refetch={refresh} selection={selected.length > 0} />
        <Create title={<FormattedMessage id="create" />} refetch={refresh} />
      </NewDialogActions>
    </>
  );
}
