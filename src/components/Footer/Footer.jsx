import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="footer">
      <div class="footer__container">
        <p class="footer__copyright">
          &copy; {currentYear} Pokemon League Manager. Desarrollado por Héctor
          Pinedo.
        </p>
        <nav class="footer__navigation">
          <ul class="footer__links">
            <li class="footer__item">
              <a
                href="https://github.com/hesepiri"
                class="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li class="footer__item">
              <a
                href="https://tripleten.com"
                class="footer__link"
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
