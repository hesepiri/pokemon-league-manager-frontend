import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; {currentYear} Pokemon League Manager. Desarrollado por Héctor
          Pinedo.
        </p>
        <nav className="footer__navigation">
          <ul className="footer__links">
            <li className="footer__item">
              <a
                href="https://github.com/hesepiri"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://tripleten.com/es-mex/?from=us"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                TripleTen
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
