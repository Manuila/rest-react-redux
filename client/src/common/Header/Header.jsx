import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import Title from '../Title/Title';

function Header({ label }) {
  return (
    <header className="page__header">
      <Title label={label} />
    </header>
  );
}
Header.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Header;
