import { Suspense } from 'react';
import { LinearProgress, styled } from '@mui/material';

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%'
});

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;