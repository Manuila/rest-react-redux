import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Title/Title';

import './header.scss';


const Header = ({ label }) => (
  <header className="page__header">
    <Title label={label} />
  </header>
);

Header.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Header;
