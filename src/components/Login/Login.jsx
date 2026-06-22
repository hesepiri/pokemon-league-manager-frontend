import React, { useEffect } from "react";
import "../Popup/Popup.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login({ isOpen, onClose, onLogin, onSwitchToRegister, apiError }) {
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
      onLogin(values.email, values.password);
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
        <h2 className="popup__title">Inicia sesión</h2>

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
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="popup__input-error">{errors.password}</span>

          {apiError && <p className="popup__api-error">{apiError}</p>}

          <button
            type="submit"
            className={`popup__submit-button ${!isValid ? "popup__submit-button_disabled" : ""}`}
            disabled={!isValid}
          >
            Inicia sesión
          </button>
        </form>

        <p className="popup__switch-text">
          o{" "}
          <button
            type="button"
            className="popup__switch-button"
            onClick={onSwitchToRegister}
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
