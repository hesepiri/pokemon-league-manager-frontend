import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__avatar-container" />
        <div className="about__content">
          <h2 className="about__title">Sobre el Autor</h2>
          <p className="about__text">
            ¡Hola! Soy Héctor Pinedo, Ingeniero de Soporte y Project Lead con
            experiencia en la gestión de proyectos tecnológicos y automatización
            de procesos. Apasionado por la arquitectura de software y el
            desarrollo de soluciones robustas.
          </p>
          <p className="about__text">
            Este proyecto, Pokemon League Manager, nace con la idea de
            consolidar herramientas modernas de desarrollo frontend como React,
            empaquetado ágil con Vite y consumo eficiente de APIs asíncronas,
            demostrando que la ingeniería y la lógica estructurada van de la
            mano en el código.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
