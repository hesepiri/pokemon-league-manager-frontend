import { useEffect } from "react";
import "./PopupWithForm.css";

function PopupWithForm({ isOpen, onClose }) {
  // Escuchador para la tecla ESC
  useEffect(() => {
    // Si el popup no está abierto, no agregamos el evento
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    // Limpiamos el evento al desmontar o cerrar el componente
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  // Manejador para cerrar al hacer clic en el overlay (fuera del contenedor)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        {/* Botón X de cierre superior derecho */}
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <h3 className="popup__title">Acceso a la Liga Pokémon</h3>

        <form className="popup__form">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="popup__input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="popup__input"
            required
          />
          <button type="submit" className="popup__submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
