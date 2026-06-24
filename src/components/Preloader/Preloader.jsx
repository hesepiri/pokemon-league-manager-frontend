import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      {/* El círculo giratorio animado */}
      <i className="preloader__circle"></i>
      <p className="preloader__text">
        Buscando en la base de datos de la Liga...
      </p>
    </div>
  );
}

export default Preloader;
