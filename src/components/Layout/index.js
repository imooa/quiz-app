import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Icon } from 'semantic-ui-react';

import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Segment textAlign="center" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '1.5em'
        }}>
          <Icon name="heart" />
          <strong>Powered by Imoogle Technology</strong>
          <div style={{ fontSize: '0.9em', marginTop: '0.5em', opacity: 0.9 }}>
            Advanced quiz platform built with modern web technologies
          </div>
        </Segment>
      </Container>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
