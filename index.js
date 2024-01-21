const tasks = [
    { id: 1, description: 'Tarea 1', completed: false },
    { id: 2, description: 'Tarea 2', completed: false },
    { id: 3, description: 'Tarea 3', completed: true }
];

const taskListElement = document.getElementById('task-list');
const totalTasksElement = document.getElementById('total-tasks');
const completedTasksElement = document.getElementById('completed-tasks');
const addTaskButton = document.getElementById('add-task-btn');

function updateTaskList() {
    taskListElement.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <span>${task.id}</span>
            <span>${task.description}</span>
            <span><input type="checkbox" onclick="toggleTask(${task.id})" ${task.completed ? 'checked' : ''}></span>
            <button onclick="deleteTask(${task.id})">X</button>
        `;
        taskListElement.appendChild(taskElement);
    });

    updateTaskCount();
}

function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    totalTasksElement.textContent = `Total de tareas: ${totalTasks}`;
    completedTasksElement.textContent = `Tareas realizadas: ${completedTasks}`;
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const description = taskInput.value.trim();

    if (description !== '') {
        const newTask = { id: tasks.length + 1, description, completed: false };
        tasks.push(newTask);
        taskInput.value = '';
        updateTaskList();
    }
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        updateTaskList();
    }
}

function toggleTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        updateTaskList();
    }
}

// Asociar la función addTask al evento clic del botón
addTaskButton.addEventListener('click', addTask);

// Mostrar tareas iniciales
updateTaskList();
