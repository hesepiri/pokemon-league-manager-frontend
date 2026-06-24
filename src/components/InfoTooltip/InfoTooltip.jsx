function InfoTooltip({ isOpen, onClose, onSwitchToLogin }) {
  if (!isOpen) return null;

  return (
    <div className="popup popup_opened">
      <div className="popup__overlay" onClick={onClose}></div>
      <div
        className="popup__container"
        style={{ textAlign: "center", padding: "50px 36px" }}
      >
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar"
        ></button>

        <h2
          className="popup__title"
          style={{ textAlign: "center", marginBottom: "24px" }}
        >
          ¡El registro se ha completado con éxito!
        </h2>

        <button
          type="button"
          className="popup__switch-button"
          style={{ fontSize: "18px" }}
          onClick={onSwitchToLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;
