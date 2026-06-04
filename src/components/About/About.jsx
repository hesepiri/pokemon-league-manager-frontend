import React from "react";
import "./About.css";
// Puedes usar una imagen tuya que tengas en assets o un avatar por defecto temporal
import avatarImg from "../../images/hector_github.png";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        {/* Columna Izquierda: Imagen redonda del autor */}
        <div className="about__avatar-container">
          <img
            src={avatarImg}
            alt="Héctor Pinedo - Desarrollador"
            className="about__avatar"
          />
        </div>
        {/* Columna Derecha: Bloque de contenido de texto */}
        <div className="about__content">
          <h2 className="about__title">Sobre el autor</h2>
          <p className="about__description">
            ¡Hola! Soy Héctor Pinedo, Ingeniero de Soporte y Líder de Proyecto
            enfocado en el desarrollo de soluciones robustas y automatización.
            Actualmente me encuentro desarrollando este Gestor de la Liga
            Pokémon como proyecto final del bootcamp de Desarrollo Web
            full-stack, integrando tecnologías modernas como React, JavaScript y
            metodologías BEM.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
