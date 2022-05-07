import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Header from './modulos/Componentes/Header';

function Layout({ component }) {
  return (
    <Box style={{ marginBottom: 50 }}>
      <Header />
      {component}
    </Box>
  );
}

export default Layout;
Layout.propTypes = {
  component: PropTypes.element.isRequired,
};
