class PokeApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Método privado para manejar la respuesta del servidor y cumplir con la rúbrica de errores
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // Si el Pokémon no existe o hay error de conexión, rechazamos la promesa
    return Promise.reject(`Error: ${res.status}`);
  }

  // 1. Búsqueda directa (Equivalente a buscar una noticia por palabra clave)
  searchPokemon(keyword) {
    // La API requiere que los nombres estén en minúsculas y sin espacios
    const cleanKeyword = keyword.toLowerCase().trim();
    return fetch(`${this._baseUrl}/pokemon/${cleanKeyword}`).then(
      this._checkResponse,
    );
  }

  // 2. Obtener un lote para llenar el grid (Equivalente al from/to y pageSize de NewsAPI)
  // Traemos un lote inicial para que el botón "Mostrar más" tenga de dónde paginar
  getInitialPokemons(limit = 100) {
    return fetch(`${this._baseUrl}/pokemon?limit=${limit}`).then(
      this._checkResponse,
    );
  }
}

// Instanciamos la clase con la URL base oficial
const pokeApi = new PokeApi({
  baseUrl: "https://pokeapi.co/api/v2",
});

export default pokeApi;
