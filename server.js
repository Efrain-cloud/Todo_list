// server.js (Backend)
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const taskRoutes = require('./routes/taskRoutes'); // Importar rutas de tareas
app.use('/tareas', taskRoutes); // Montar las rutas

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
