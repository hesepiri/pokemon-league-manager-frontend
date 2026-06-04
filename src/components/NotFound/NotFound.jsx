import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        {/* Un icono o ilustración simple en texto basada en el UI Kit */}
        <div className="not-found__icon">🔎❌</div>
        <h3 className="not-found__title">No se ha encontrado nada</h3>
        <p className="not-found__description">
          Lo sentimos, pero ningún Pokémon coincide con tus criterios de
          búsqueda. Intenta verificar la ortografía o introduce otro nombre.
        </p>
      </div>
    </section>
  );
}

export default NotFound;
