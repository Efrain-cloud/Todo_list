const apiBase = 'http://localhost:3000/tareas';

async function verTarea() {
    try {
        const response = await fetch(apiBase);
        if (!response.ok) {
            throw new Error('No se pudieron recuperar las tareas.');
        }
        const tareas = await response.json();
        rendertareas(tareas);
    } catch (error) {
        console.error('Error al recuperar tareas:', error);
        alert('No se pudieron cargar las tareas. Vuelva a intentarlo más tarde.');
    }
}

// function rendertareas(tareas) {
//     const tareasDiv = document.getElementById('tareas');
//     tareasDiv.innerHTML = '';

//     tareas.forEach(tarea => {
//         const tareaDiv = document.createElement('div');
//         tareaDiv.className = 'tarea';
//         tareaDiv.innerHTML = `
//             <h3>${tarea.titulo}</h3>
//             <p>${tarea.descripcion}</p>
//             <p>Estatus: ${tarea.status}</p>
//             <button onclick="actualizarTarea(${tarea.id})">Editar</button>
//             <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
//         `;
//         tareasDiv.appendChild(tareaDiv);
//     });
// }
document.getElementById('verTareas').addEventListener('click', () => {
    verTarea();
    document.getElementById('tareas').style.display = 'block';
});

document.getElementById('ocultarTareas').addEventListener('click', () => {
    document.getElementById('tareas').style.display = 'none';
});
// function rendertareas(tareas) {
//     const tareasDiv = document.getElementById('tareas');
//     tareasDiv.innerHTML = '';

//     const table = document.createElement('table');
//     table.className = 'tareas-table';
//     table.innerHTML = `
//         <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>Título</th>
//                 <th>Descripción</th>
//                 <th>Estatus</th>
//                 <th>Acciones</th>
//             </tr>
//         </thead>
//         <tbody>
//             ${tareas.map(tarea => `
//                 <tr>
//                     <td>${tarea.id}</td>
//                     <td>${tarea.titulo}</td>
//                     <td>${tarea.descripcion}</td>
//                     <td>${tarea.status}</td>
//                     <td>
//                         <button onclick="actualizarTarea(${tarea.id})"class="btn-edit">Editar</button>
//                         <button onclick="eliminarTarea(${tarea.id})" class="btn-delete">Eliminar</button>
//                     </td>
//                 </tr>
//             `).join('')}
//         </tbody>
//     `;

//     tareasDiv.appendChild(table);
// }
function rendertareas(tareas) {
    const tareasDiv = document.getElementById('tareas');
    tareasDiv.innerHTML = ''; // Limpia el contenedor antes de agregar contenido.

    // Crea la tabla y añade clases si es necesario
    const table = document.createElement('table');
    table.className = 'tareas-table';

    // Crea el thead
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estatus</th>
            <th>Acciones</th>
        </tr>
    `;

    // Crea el tbody
    const tbody = document.createElement('tbody');
    tareas.forEach(tarea => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.titulo}</td>
            <td>${tarea.descripcion}</td>
            <td>${tarea.status}</td>
            <td>
                <button onclick="actualizarTarea(${tarea.id})" class="btn-edit">Editar</button>
                <button onclick="eliminarTarea(${tarea.id})" class="btn-delete">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    tareasDiv.appendChild(table);
}


function ocultarTarea() {
    const tareasDiv = document.getElementById('tareas');
    tareasDiv.innerHTML = '';
}

async function crearTarea() {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;

    if (titulo) {
        try {
            const response = await fetch(apiBase, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo, descripcion })
            });

            if (!response.ok) {
                throw new Error('No se pudo agregar la tarea.');
            }

            alert('¡Tarea creada exitosamente!');
        } catch (error) {
            console.error('Error al agregar tarea:', error);
            alert('No se pudo agregar la tarea. Inténtelo de nuevo más tarde.');
        }

        document.getElementById('titulo').value = '';
        document.getElementById('descripcion').value = '';
    } else {
        alert('Se requiere título para agregar una tarea.');
    }
}

async function actualizarTarea(id) {
    const nuevoTitulo = prompt('Ingrese un nuevo título:');
    const nuevaDescrip = prompt('Ingrese una nueva descripción:');
    const nuevoEstatus = prompt('Ingrese el nuevo estado (pendiente/completa):');

    try {
        const response = await fetch(`${apiBase}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: nuevoTitulo, descripcion: nuevaDescrip, status: nuevoEstatus })
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar la tarea.');
        }

        alert('¡Tarea actualizada exitosamente!');
        verTarea();
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        alert('No se pudo actualizar la tarea. Inténtelo de nuevo más tarde.');
    }
}

async function eliminarTarea(id) {
    try {
        const response = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error('No se pudo eliminar la tarea.');
        }

        alert('¡Tarea eliminada exitosamente!');
        verTarea();
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        alert('No se pudo eliminar la tarea. Inténtelo de nuevo más tarde.');
    }
}

verTarea();
