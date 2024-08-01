import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
      {meta}
    </Helmet>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
