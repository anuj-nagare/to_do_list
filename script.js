// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    
    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.addEventListener('click', () => {
        const newText = prompt('Enter new task:');
        if (newText !== null && newText.trim() !== '') {
            taskItem.textContent = newText.trim();
            updateTasks();
        }
    });
    
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        updateTasks();
    });
    
    // Append buttons to task item
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

// Function to update tasks in local storage
function updateTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        tasks.push(taskItem.textContent);
    });
    saveTasks(tasks);
}

// Event listener for adding a task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        updateTasks();
    }
});

// Load tasks when the page loads
window.addEventListener('DOMContentLoaded', loadTasks);
