import React, { useEffect } from "react";
import "../Popup/Popup.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register({ isOpen, onClose, onRegister, onSwitchToLogin, apiError }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(values.email, values.password, values.name);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup popup_opened">
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar"
        ></button>
        <h2 className="popup__title">Regístrate</h2>

        <form className="popup__form" onSubmit={handleSubmit} noValidate>
          <label className="popup__label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="popup__input"
            placeholder="Introduce tu correo electrónico"
            required
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className="popup__input-error">{errors.email}</span>

          <label className="popup__label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="popup__input"
            placeholder="Introduce tu contraseña"
            required
            minLength="6"
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="popup__input-error">{errors.password}</span>

          <label className="popup__label">Nombre de usuario</label>
          <input
            type="text"
            name="name"
            className="popup__input"
            placeholder="Introduce tu nombre de usuario"
            required
            minLength="2"
            maxLength="30"
            value={values.name || ""}
            onChange={handleChange}
          />
          <span className="popup__input-error">{errors.name}</span>

          {apiError && <p className="popup__api-error">{apiError}</p>}

          <button
            type="submit"
            className={`popup__submit-button ${!isValid ? "popup__submit-button_disabled" : ""}`}
            disabled={!isValid}
          >
            Regístrate
          </button>
        </form>

        <p className="popup__switch-text">
          o{" "}
          <button
            type="button"
            className="popup__switch-button"
            onClick={onSwitchToLogin}
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
