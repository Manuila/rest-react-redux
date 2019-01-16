import React from 'react';
import PropTypes from 'prop-types';
import './footer.scss';

function Footer({ label }) {
  return (
    <footer className="page__footer">
      {label}
    </footer>
  );
}
Footer.propTypes = {
  label: PropTypes.string.isRequired,
};
export default Footer;
