import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        {/* El icono triste y estilizado del Figma oficial (imagen_32.png) */}
        <div className="not-found__icon-container">
          <svg
            className="not-found__icon"
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="48" r="46" stroke="#D1D1D1" strokeWidth="3" />
            <circle cx="34" cy="38" r="4" fill="#D1D1D1" />
            <circle cx="62" cy="38" r="4" fill="#D1D1D1" />
            <path
              d="M32 68C32 60 40 56 48 56C56 56 64 60 64 68"
              stroke="#D1D1D1"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h3 className="not-found__title">No se encontró nada</h3>
        <p className="not-found__description">
          Lo sentimos, pero ningún Pokémon coincide con tus términos de
          búsqueda.
        </p>
      </div>
    </section>
  );
}

export default NotFound;
