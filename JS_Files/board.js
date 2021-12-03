
let todos = []; // -- for drag and drop
let currentDraggedElement;  // -- for drag and drop


async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];

 //   updateHtml();  -- for drag and drop
    showTodos();
}


function showTodos() {
    let todoContainer = document.getElementById('todoContainer');
    todoContainer.innerHTML = '';


    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        let urgencyColor = allTasks[i]['priortity'];

        todoContainer.innerHTML += `
      <div id="todo" class="todo">
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

async function deleteTask(position) {
    allTasks.splice(position, 1);

    let allTasksAsString = JSON.stringify(allTasks);
    await backend.setItem('allTasks', allTasksAsString);

    showTodos();
}

/* Drag and Drop */

/*
function updateHtml() {

    let todo = todos.filter(t => !t['list'] || t['list'] == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('toDo').innerHTML += `<div draggable="true" ondragstart="startDragging(${element.createdAt})" class="todo">${todo[index].taskDescription}
        </div>`;
    }


    let inProgress = todos.filter(t => t['list'] == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgress').innerHTML += `<div draggable="true" ondragstart="startDragging(${element.createdAt})" class="todo">${inProgress[index].taskDescription}
        </div>`;
    }


    let testing = todos.filter(t => t['list'] == 'Testing');

    document.getElementById('Testing').innerHTML = '';

    for (let index = 0; index < testing.length; index++) {
        const element = testing[index];
        document.getElementById('Testing').innerHTML += `<div draggable="true" ondragstart="startDragging(${element.createdAt})" class="todo">${testing[index].taskDescription}
        </div>`;
    }


    let done = todos.filter(t => t['list'] == 'Done');

    document.getElementById('Done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('Done').innerHTML += `<div draggable="true" ondragstart="startDragging(${element.createdAt})" class="todo">${done[index].taskDescription}
        </div>`;
    }

}


function startDragging(createdAt) {
    currentDraggedElement = createdAt; //!!
}

function allowDrop(ev) { //!!!
    ev.preventDefault();
}

async function moveto(list) {
    const task = todos.find(t => t.createdAt === currentDraggedElement);
    task.list = list;
    await backend.setItem('allTasks', JSON.stringify(todos));
    updateHtml();

}
*/