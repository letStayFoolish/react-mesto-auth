import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer container">
      <p className="footer__licence">&copy; {year} Mesto Russia</p>
    </footer>
  );
};
export default Footer;
