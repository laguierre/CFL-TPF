/**
 * @brief Servidor de Películas con Express
 * @author Leandro J. Aguierre
 * @date 30/06/2024
 * @version 0.1
 * @note Usar node --watch index.js
 */

const express = require('express')
const app = express()
// Importar el archivo movies
let movies = require('./movies')

/**
 * @brief Raíz del server
 */
app.get('/', (request, response) => {
    response.send('<h1>Raíz de Colección de Película</h1>')
})

/**
 * @brief Trae todas las películas
 */
app.get('/api/movies', (request, response) => {
    response.json(movies)
})

/**
 * @brief Trae la película por ID. Si no existe devuelve un mensaje de error
 */
app.get('/api/movies/:id', (request, response) => {
    const id = request.params.id
    const movie = movies.find(movie => movie.id == id)
    if (movie) {
        response.json(movie)
    } else {
        response.status(404).json({ message: `Elemento '${id}' no existe` })
    }
})

// Middleware para parsear JSON
app.use(express.json())

/**
 * @brief Agrega una película a través de un JSON del tipo
 * {
        "titulo": String,
        "director": String,
        "anio_estreno": Number,
        "genero": String
    }   
 * Asigna un ID nuevo consecutivo al último de la lista
 */
app.post('/api/movie', (request, response) => {
    const body = request.body

    if (!body.titulo || !body.director || !body.anio_estreno || !body.genero) {
        return response.status(400).json({
            message: 'Los campos titulo, director, anio_estreno y genero son obligatorios'
        })
    }

    // Crear un arreglo de todos los IDs
    const ids = movies.map(movie => movie.id);

    // Encontrar el ID máximo en el arreglo de IDs
    let maxId = -Infinity;
    for (let i = 0; i < ids.length; i++) {
        if (ids[i] > maxId) {
             maxId = ids[i];
        }
    }
    // Hacer un ID consecutivo al último
    const newId = movies.length > 0 ? maxId + 1 : 1;

    const newMovie = {
        id: newId,
        titulo: body.titulo,
        director: body.director,
        anio_estreno: body.anio_estreno,
        genero: body.genero
    }

    movies = movies.concat(newMovie)
    // Devuelve un JSON de la película creada
    response.status(201).json(newMovie)
})

/**
 * @brief Eliminar una película determinada por ID. Si no existe da error
 */
app.delete('/api/movies/:id', (request, response) => {
    const id = Number(request.params.id)
    const movie = movies.find(movie => movie.id === id)

    if (movie) {
        movies = movies.filter(movie => movie.id !== id)
        response.status(200).json({ message: `Elemento '${id}' eliminado correctamente` })
    } else {
        response.status(404).json({ message: 'Elemento no encontrado' })
    }
})

/**
 * @brief Modificar una película por ID
 * Busca una película por su ID y actualiza sus datos con el.
 */
app.put('/api/movies/:id', (request, response) => {
    const id = Number(request.params.id);
    const body = request.body;

    // Encuentra la película por su ID
    const index = movies.findIndex(movie => movie.id === id);

    if (index !== -1) {
        // Actualiza la película con los datos proporcionados en el cuerpo de la solicitud
        movies[index].titulo = body.titulo;
        movies[index].director = body.director;
        movies[index].anio_estreno = body.anio_estreno;
        movies[index].genero = body.genero;

        // Devuelve la película modificada
        response.json(movies[index]);
    } else {
        // Si no se encuentra la película, devuelve un error 404
        response.status(404).json({ message: 'Elemento no encontrado' });
    }
});

/**
 * @brief http://localhost:3001/
 */
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
