import React from 'react';
import PropTypes from 'prop-types';
import Header from './modulos/Componentes/Header';

function Layout({ component }) {
  return (
    <>
      <Header />
      {component}

    </>
  );
}

export default Layout;
Layout.propTypes = {
  component: PropTypes.element.isRequired,
};
