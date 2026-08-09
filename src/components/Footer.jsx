import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} HarshaVardhan Reddy Kunam. All Rights Reserved. Built with React &amp; Vite.</p>
      </div>
    </footer>
  );
};

export default Footer;
