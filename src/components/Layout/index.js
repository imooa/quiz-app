import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 60px)' }}>
        {children}
      </main>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;