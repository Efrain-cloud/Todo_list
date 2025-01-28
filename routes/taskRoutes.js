const express = require('express');
const router = express.Router();

let tareas = []; // Almacén en memoria
let idCounter = 1;

// Obtener todas las tareas
router.get('/', (req, res) => {
    res.json(tareas);
});

// Crear una nueva tarea
router.post('/', (req, res) => {
    const { titulo, descripcion, status } = req.body;
    const nuevaTarea = { id: idCounter++, titulo, descripcion, status: status || 'Pendiente' };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// Actualizar una tarea
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, status } = req.body;
    const tarea = tareas.find(t => t.id === parseInt(id));

    if (tarea) {
        tarea.titulo = titulo || tarea.titulo;
        tarea.descripcion = descripcion || tarea.descripcion;
        tarea.status = status || tarea.status;
        res.json(tarea);
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tareas = tareas.filter(t => t.id !== parseInt(id));
    res.json({ message: 'Tarea borrada satisfactoriamente' });
});

module.exports = router;
