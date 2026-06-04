import React from "react";
import "./Footer.css";

// Importamos tus archivos SVG desde tu carpeta de imágenes
import githubIcon from "../../images/github-logo-svgrepo-com.svg";
import linkedinIcon from "../../images/linkedin-logo-svgrepo-com.svg";
import mailIcon from "../../images/mail-svgrepo-com.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Lado izquierdo: Derechos reservados */}
        <p className="footer__copyright">
          © {currentYear} Pokémon League Manager. Desarrollado por Héctor
          Pinedo.
        </p>

        {/* Lado derecho: Enlaces y redes sociales en un solo bloque */}
        <div className="footer__navigation">
          <nav>
            <a
              href="https://tripleten.mx/"
              className="footer__link-text"
              target="_blank"
              rel="noreferrer"
            >
              TripleTen
            </a>
          </nav>

          <ul className="footer__social-icons">
            <li className="footer__social-item">
              <a
                href="https://github.com/hesepiri"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
              >
                <img src={githubIcon} alt="GitHub" className="footer__icon" />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="https://www.linkedin.com/in/hectors-pinedorivera"
                className="footer__social-link"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="footer__icon"
                />
              </a>
            </li>
            <li className="footer__social-item">
              <a
                href="mailto:hector.pinedorivera@gmail.com"
                className="footer__social-link"
                title="Correo Electrónico"
              >
                <img src={mailIcon} alt="Contacto" className="footer__icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
