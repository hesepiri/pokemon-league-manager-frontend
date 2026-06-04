import React from "react";
import "./About.css";

function About() {
  return (
    <section class="about">
      <div class="about__container">
        <div class="about__avatar-container" />
        <div class="about__content">
          <h2 class="about__title">Sobre el Autor</h2>
          <p class="about__text">
            ¡Hola! Soy Héctor Pinedo, Ingeniero de Soporte y Project Lead con
            experiencia en la gestión de proyectos tecnológicos y automatización
            de procesos. Apasionado por la arquitectura de software y el
            desarrollo de soluciones robustas.
          </p>
          <p class="about__text">
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
