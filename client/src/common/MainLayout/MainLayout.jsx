import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const MainLayout = ({ children }) => (
  <Fragment>
    <Header label="React app" />
    <main className="page__body">
      { children }
    </main>
    <Footer label={`@${new Date().getFullYear()}`} />
  </Fragment>
);

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
