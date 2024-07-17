/**
 * @brief Servidor de Películas con Express
 * @author Leandro J. Aguierre
 * @date 30/06/2024
 * @version 0.1
 * @note Usar node --watch index_mongo_db.js
 */

const uri = 'mongodb+srv://laguierre:laguierre@moviescluster.m9vmapd.mongodb.net/movies?retryWrites=true&w=majority&appName=MoviesCluster';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json()); // Middleware para parsear JSON

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Definir el esquema y el modelo de películas, especificando la colección
const movieSchema = new mongoose.Schema({
    titulo: String,
    director: String,
    anio_estreno: Number,
    genero: String
}, { collection: 'movies_collection' });

const Movie = mongoose.model('Movie', movieSchema);

/**
 * @brief Raíz del server
 */
app.get('/', (request, response) => {
    response.send('<h1>Raíz de Colección de Película</h1>');
});

/**
 * @brief Trae todas las películas
 */
app.get('/api/movies', async (request, response) => {
    const movies = await Movie.find();
    response.json(movies);
});

/**
 * @brief Trae la película por ID. Si no existe devuelve un mensaje de error
 */
app.get('/api/movies/:id', async (request, response) => {
    try {
        const movie = await Movie.findById(request.params.id);
        if (movie) {
            response.json(movie);
        } else {
            response.status(404).json({ message: `Elemento '${request.params.id}' no existe` });
        }
    } catch (error) {
        response.status(400).json({ message: 'ID inválido' });
    }
});

/**
 * @brief Agrega una película a través de un JSON del tipo
 * {
        "titulo": String,
        "director": String,
        "anio_estreno": Number,
        "genero": String
    }   
 */
app.post('/api/movies', async (request, response) => {
    const body = request.body;

    if (!body.titulo || !body.director || !body.anio_estreno || !body.genero) {
        return response.status(400).json({
            message: 'Los campos titulo, director, anio_estreno y genero son obligatorios'
        });
    }

    const newMovie = new Movie({
        titulo: body.titulo,
        director: body.director,
        anio_estreno: body.anio_estreno,
        genero: body.genero
    });

    const savedMovie = await newMovie.save();
    response.status(201).json({
        message: 'Película agregada correctamente',
        movie: savedMovie
    });
});

/**
 * @brief Eliminar una película determinada por ID. Si no existe da error
 */
app.delete('/api/movies/:id', async (request, response) => {
    try {
        const movie = await Movie.findByIdAndDelete(request.params.id);
        if (movie) {
            response.status(200).json({ message: `Elemento '${request.params.id}' eliminado correctamente` });
        } else {
            response.status(404).json({ message: 'Elemento no encontrado' });
        }
    } catch (error) {
        response.status(400).json({ message: 'ID inválido' });
    }
});

/**
 * @brief http://localhost:3001/
 */
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
