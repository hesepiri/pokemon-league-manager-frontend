class PokeApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // Controlador de respuestas nativo exigido por la rúbrica [cite: 45, 46]
  _checkResponse(res) {
    if (res.ok) {
      return res.json(); // [cite: 46]
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // 1. Búsqueda individual original (Mantiene tu lógica limpia)
  searchPokemon(keyword) {
    const cleanKeyword = keyword.toLowerCase().trim();
    return fetch(`${this._baseUrl}/pokemon/${cleanKeyword}`).then(
      this._checkResponse,
    );
  }

  // 2. Método de lote para resolver el Grid de 3 columnas (Exigido por la Etapa 1.2)
  getInitialPokemons(limit = 100) {
    return fetch(`${this._baseUrl}/pokemon?limit=${limit}`).then(
      this._checkResponse,
    );
  }
}

const pokeApi = new PokeApi({
  baseUrl: "https://pokeapi.co/api/v2",
});

export default pokeApi;
