import React from 'react';
import { Stack, Button, CircularProgress } from '@mui/material';

export default function LoadingMore({ total, result, loading, onClick }) {
  return (
    <Stack alignItems="center" justifyContent="center" flex={1} pb={10}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Button disabled={total === result} onClick={onClick}>
          {total === result
            ? result > 0
              ? 'برای مشاهده نتایج بیشتر فیلترها را تغییر دهید'
              : 'موردی یافت نشد!'
            : 'بیشتر'}
        </Button>
      )}
    </Stack>
  );
}
