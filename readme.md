# Movie Server with Express and MongoDB

Implementa una servidor de pelicular usando Express.js and MongoDB. Permite operaciones CRUD a través de un API REST

## Author
- Leandro J. Aguierre
- Fecha: 03/07/2024
- Version: 0.1
- Trabajo Final Práctico - CFL JUL 2024

### Notas
- Ejecutando el archivo index.js levanta el archivo local movies.js (node --watch index.js)
- Ejecutando el archivo index_mongo_db.js levanta la Base de Datos desde MongoDB (node --watch index_mongo_db.js).
- En el archivo LocalHost.postman_collection.json está las peticiones para que sean usadas por Postman.

## Installation

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/laguierre/CFL-TPF.git
   cd CFL-TPF

2. Instalar dependencias:
npm install

3. Set up MongoDB:

Crear la Base de Datos (movies) y obtener la conexióin URI.
Reemplazar el URI en index_mongo_db.js con esa conexión. 

4. Subir el server:

npm start

### API Endpoints
- Obtiene todas las películas de la base de datos.

`GET /api/movies`
    
Nota: si el archivo se levanta localmente, los ID serán consecutivos. Si se hace la lectura desde MongoDB los _id son generados automativamente por la DB.

- Obtiene una pelicula por el ID (_id) único de la Base de Datos.

`GET /api/movies/:id`

Nota: si el archivo se levanta localmente, los ID serán de 1 a 10. Si se hace la lectura desde MongoDB, primero se deben obteberlos los _id para hacer esta consulta.

- Agrega una nueva pelicula a la DB. Requiere un JSON como parámetro. Ejemplo:
    
`POST /api/movies`
    
```
{
    "titulo": "The Prestige",
    "director": "Christopher Nolan",
    "anio_estreno": 2006,
    "genero": "Drama"
}
```

- Actualiza una pelicula existente en la DB por un _id conocido. Requiere un JSON como parámetro. Ejemplo:

`PUT /api/movies/:id`

```
{
    "titulo": "The Prestige",
    "director": "Christopher Nolan",
    "anio_estreno": 2006,
    "genero": "Drama"
}
```

Elimina una Película de la Base de Datos por medio del _id único.

`DELETE /api/movies/:id`

Nota: si el archivo se levanta localmente, los ID serán de 1 a 10. Si se hace la lectura desde MongoDB, primero se deben obteberlos los _id para hacer esta consulta.
