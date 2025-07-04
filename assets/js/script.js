const input = document.getElementById("input");
const btnAdd = document.getElementById("add");
const taskList =  document.getElementById("taskList");
const info = document.getElementById("info");

const todoList = [];
let taskFinish = 0;
let idTask = 3;

class Task {
    constructor(idTask, nameTask) {
    this.idTask = idTask;
    this.nameTask = nameTask;
    this.isComplete = false;
    };
    
    toggleComplete(){
        this.isComplete = !this.isComplete;
    };
};

const primaryTask = () => {
    const task = new Task(1, "Hacer aseo");
    const task2 = new Task(2, "Ir al supermercado");
    const task3 = new Task(3, "Cocinar");

    todoList.push(task, task2, task3);
    render();
};

const render = () => {
    taskFinish = todoList.filter(task => task.isComplete).length;

    let infoTemplate = `
        <p>Total: <strong>${todoList.length}</strong></p>
        <p>Realizadas: <strong>${taskFinish}</strong></p>
    `;
    let taskListTemplate = `
        <div class="taskListTemplate">
            <span><strong>ID</strong></span>
            <span><strong>Tarea</strong></span>
        </div>
    `;

    taskListTemplate += todoList.map(task => `
        <div class="taskListTemplate">
            <p>${task.idTask}</p>
            <p class="ptask">${task.nameTask}</p>
            <input type="checkbox" onchange="isChecked(${task.idTask})" ${task.isComplete ? "checked" : ""}>
            <button class="removeBtn" onclick="removedTask(${task.idTask})">❌</button>
        </div>
    `).join('');

    taskList.innerHTML = taskListTemplate;
    info.innerHTML = infoTemplate;
};

btnAdd.addEventListener("click", () => {
    const textInput = input.value.trim();
    if (textInput === "") return;
    idTask++;
    const task = new Task(idTask, textInput);
    todoList.push(task);
    input.value = "";
    render();
});

const isChecked = (id) => {
    const task = todoList.find(task => task.idTask == id);
    if (task) {
        task.toggleComplete();
        render();
    }
};

const removedTask = (id) =>  {
    const index = todoList.findIndex(task => task.idTask == id);
    todoList.splice(index, 1);
    render();
};

primaryTask();