import React, { useEffect } from "react";
import "./PopupWithForm.css";

function PopupWithForm({ isOpen, onClose }) {
  // Manejador para cerrar con la tecla Esc, tal como lo pide la rúbrica
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  // Manejador para cerrar al hacer clic en el área gris externa (Overlay)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      class={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div class="popup__container">
        {/* Botón de la cruz con microanimación mediante CSS */}
        <button
          type="button"
          class="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        />

        <h2 class="popup__title">Acceso a la Liga Pokémon</h2>

        <form class="popup__form" name="login-form">
          <label class="popup__label">
            Email
            <input
              type="email"
              class="popup__input"
              placeholder="Tu correo electrónico"
              required
            />
          </label>
          <label class="popup__label">
            Contraseña
            <input
              type="password"
              class="popup__input"
              placeholder="Tu contraseña"
              required
            />
          </label>
          <button type="submit" class="popup__submit-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
