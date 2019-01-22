import React from 'react';
import PropTypes from 'prop-types';

import './footer.scss';


const Footer = ({ children }) => (
  <footer className="page__footer">
    {children}
  </footer>
);

Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default Footer;
