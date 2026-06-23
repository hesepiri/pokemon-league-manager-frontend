# Liga Pokémon - Fase 3: Integración de Autenticación y Rutas Protegidas

Esta fase del proyecto se enfoca en asegurar la aplicación **Liga Pokémon** mediante la implementación de un sistema de autenticación completo (registro, inicio de sesión y persistencia de estado mediante JWT) y la protección de vistas exclusivas para usuarios registrados.

---

## 🚀 Nuevas Características Implementadas

- **Registro de Usuarios (`/signup`)**: Permite a nuevos entrenadores crear una cuenta proporcionando nombre, correo electrónico y contraseña.
- **Inicio de Sesión (`/signin`)**: Autentica las credenciales del usuario, genera un token JWT en el backend y lo almacena localmente en el frontend.
- **Persistencia de Sesión**: Al recargar la página, un efecto verifica la validez del token JWT guardado en el `localStorage` para mantener la sesión activa automáticamente.
- **Rutas Protegidas (`ProtectedRoute`)**: Restringe el acceso a la sección de **Pokémones Guardados** (`/saved-pokemons`). Si un usuario no autenticado intenta ingresar, es redirigido a la página principal o se le invita a iniciar sesión.
- **Modales Dinámicos**: Integración del componente `InfoTooltip` para notificar visualmente el éxito o fallo en los procesos de registro y autenticación.

---

## 🚀 Infraestructura y Entrega

El proyecto ha sido verificado y cumple con los estándares de calidad del linter y compilación.

| Requisito               | Estado | Notas                                             |
| :---------------------- | :----- | :------------------------------------------------ |
| **Build sin errores**   | Sí     | `npm run build` ejecutable y exitoso.             |
| **Lint sin errores**    | Sí     | 0 errores mediante ESLint (`npm run lint`).       |
| **Despliegue Frontend** | Sí     | Desplegado y operativo en ambiente de producción. |

### 🔗 Enlaces del Proyecto

- **Despliegue en producción (Frontend):** [https://pkmnleaguemngr-hspr.mooo.com](https://pkmnleaguemngr-hspr.mooo.com) _(Nota: Modifica este enlace si tu frontend está en otra URL de mooo.com o GitHub Pages)_
- **Repositorio de GitHub:** [https://github.com/hesepiri/pokemon-league-manager-frontend](https://github.com/hesepiri/pokemon-league-manager-frontend)

### 🛠️ Comandos Disponibles

- `npm run dev`: Inicia el servidor de desarrollo local.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist`.
- `npm run lint`: Ejecuta el analizador de código ESLint para asegurar la calidad del código.

---

## ⚙️ Configuración del Entorno (`.env.example`)

Para que el ecosistema completo (frontend y backend) funcione de manera correcta en esta fase, asegúrate de configurar las siguientes variables de entorno en el servidor:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/pokemon_league_db
```

## 🛣️ Endpoints Soportados (Rutas de la API)

La API cuenta con un manejo de seguridad basado en JWT. Los endpoints privados requieren que se envíe el token en el encabezado `Authorization: Bearer <JWT>`.

### Autenticación y Usuarios (Públicos)

- **`POST /signup`**: Registra un nuevo usuario en la base de datos.
  - _Body (JSON)_: `{ "email": "user@test.com", "password": "password123", "name": "Héctor" }`
- **`POST /signin`**: Autentica a un usuario existente y devuelve un token JWT.
  - _Body (JSON)_: `{ "email": "user@test.com", "password": "password123" }`

### Usuarios (Privados)

- **`GET /users/me`**: Obtiene el perfil del usuario autenticado actual a partir del token.

### Gestión de Pokémon (Privados)

- **`GET /pokemons`**: Recupera todos los pokémones guardados por el usuario autenticado.
- **`POST /pokemons`**: Guarda un pokémon en la lista de favoritos del usuario.
  - _Body (JSON)_:
    ```json
    {
      "keyword": "steel, rock",
      "title": "Iron-thorns",
      "text": "Quark Drive",
      "date": "21/6/2026",
      "source": "PokéAPI",
      "link": "[https://www.pokemon.com/es/pokedex/iron-thorns](https://www.pokemon.com/es/pokedex/iron-thorns)",
      "image": "[https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/995.png](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/995.png)"
    }
    ```
- **`DELETE /pokemons/:pokemonId`**: Elimina un pokémon guardado de la base de datos local usando su `_id`.

---

## 🧪 Pruebas de la API (Testing)

Puedes realizar pruebas en tus endpoints utilizando herramientas como **Postman** o directamente desde tu terminal mediante **cURL**.

### 1. Pruebas con cURL

**Registro de Usuario (`POST /signup`):**

```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "hector@test.com", "password": "password123", "name": "Héctor"}'
```

## 🛣️ Flujo de Endpoints Utilizados

El flujo de comunicación entre el frontend y el backend se realiza mediante peticiones HTTP seguras:

- **`POST /signup`**: Envía los datos del formulario de registro.
- **`POST /signin`**: Envía las credenciales y recibe el token de acceso.
- **`GET /users/me`**: Valida el JWT al cargar la aplicación para recuperar los datos del perfil del usuario.
- **`GET /pokemons`**: Carga la colección personalizada de Pokémon guardados en la base de datos local del usuario autenticado.

---

## 📁 Estructura del Código y Buenas Prácticas

Siguiendo las sugerencias de optimización para mejorar la legibilidad y el mantenimiento a largo plazo:

- Se utiliza un componente de orden superior (`ProtectedRoute`) para envolver las rutas que requieren privacidad, aislando la lógica de redirección de los componentes de vista.
