let allTasks = [];
let activeTasks = [];
let currentDraggedElement = 0;  // -- for drag&drop


async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    updateBoardHTML();
}


async function deleteTask(position) {
    allTasks.splice(position, 1);

    let allTasksAsString = JSON.stringify(allTasks);
    await backend.setItem('allTasks', allTasksAsString);
    updateBoardHTML();
}

/* Drag and Drop */

function allowDrop(ev) {
    ev.preventDefault();
}


function filterActiveTasks() {
    activeTasks = allTasks.filter(task => task.status === 'active');
}


function drag(taskID) {
    currentDraggedElement = taskID;
}


async function drop(listName) {
    let taskToMove = activeTasks.find(task => task.taskId === currentDraggedElement);
    taskToMove.list = listName;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    showTodos();
}



/* update Board HTML */


function updateBoardHTML() {
    filterActiveTasks();
    showTodoList();
    showInProgressList();
    showDoneList();
    showNotDoneList();
}


function showTodoList() {
    let list = activeTasks.filter(task => task.list === 'todo');
    let listContainer = document.getElementById('todo');
    listContainer.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        const task = list[i];
        let urgencyColor = list[i]['priortity'];

        listContainer.innerHTML += `
      <div id="${task.taskId}" class="todo" draggable="true" ondragstart="drag(${task.taskId})">
    <div class="urgency ${urgencyColor}"></div>
    <div>
        <div class="todo-cont ">
            <h3 class="todo-title">${task['title']}</h3>
            <span class="final-day">${task['expirationDate']}</span>
        </div>
        <div class="todo-cont">
            <div class="descritpion-cont">
                <span class="todo-description">${task['description']}</span>
            </div>
            <div class="trash-img"><img src=./img/behalter.png class="deleteImg"
                    onclick="deleteTask(${i})"></div>
        </div>
    </div>
  </div>
    `;
    }

}


function showInProgressList() {
    let list = activeTasks.filter(task => task.list === 'inProgress');
    let listContainer = document.getElementById('inProgress');
    listContainer.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        const task = list[i];
        let urgencyColor = list[i]['priortity'];

        listContainer.innerHTML += `
      <div id="${task.taskId}" class="todo" draggable="true" ondragstart="drag(${task.taskId})">
    <div class="urgency ${urgencyColor}"></div>
    <div>
        <div class="todo-cont ">
            <h3 class="todo-title">${task['title']}</h3>
            <span class="final-day">${task['expirationDate']}</span>
        </div>
        <div class="todo-cont">
            <div class="descritpion-cont">
                <span class="todo-description">${task['description']}</span>
            </div>
            <div class="trash-img"><img src=./img/behalter.png class="deleteImg"
                    onclick="deleteTask(${i})"></div>
        </div>
    </div>
  </div>
    `;
    }
}


function showDoneList() {
    let list = activeTasks.filter(task => task.list === 'done');
    let listContainer = document.getElementById('done');
    listContainer.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        const task = list[i];
        let urgencyColor = list[i]['priortity'];

        listContainer.innerHTML += `
      <div id="${task.taskId}" class="todo" draggable="true" ondragstart="drag(${task.taskId})">
    <div class="urgency ${urgencyColor}"></div>
    <div>
        <div class="todo-cont ">
            <h3 class="todo-title">${task['title']}</h3>
            <span class="final-day">${task['expirationDate']}</span>
        </div>
        <div class="todo-cont">
            <div class="descritpion-cont">
                <span class="todo-description">${task['description']}</span>
            </div>
            <div class="trash-img"><img src=./img/behalter.png class="deleteImg"
                    onclick="deleteTask(${i})"></div>
        </div>
    </div>
  </div>
    `;
    }
}


function showNotDoneList() {
    let list = activeTasks.filter(task => task.list === 'notDone');
    let listContainer = document.getElementById('notDone');
    listContainer.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        const task = list[i];
        let urgencyColor = list[i]['priortity'];

        listContainer.innerHTML += `
      <div id="${task.taskId}" class="todo" draggable="true" ondragstart="drag(${task.taskId})">
    <div class="urgency ${urgencyColor}"></div>
    <div>
        <div class="todo-cont ">
            <h3 class="todo-title">${task['title']}</h3>
            <span class="final-day">${task['expirationDate']}</span>
        </div>
        <div class="todo-cont">
            <div class="descritpion-cont">
                <span class="todo-description">${task['description']}</span>
            </div>
            <div class="trash-img"><img src=./img/behalter.png class="deleteImg"
                    onclick="deleteTask(${i})"></div>
        </div>
    </div>
  </div>
    `;
    }
}
