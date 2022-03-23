
let activeTasks = [];
let currentDraggedElement = 0;  // -- for drag&drop


async function initBoard() {
    includeHTML();
    await downloadData();
    updateBoardHTML();
}


/**
* @param { number } - position created task time in milliseconds alias taskId
*/
async function deleteBoardTask(position) {
    await deleteTask(position);
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
    updateBoardHTML();
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
      <div id="${task.taskId}" class="todo ${urgencyColor}" draggable="true" ondragstart="drag(${task.taskId})">
    <div>
        <div class="todo-cont ">
            <h3 class="todo-title">${task['title']}</h3>
            <span class="final-day">${task['expirationDate']}</span>
        </div>
        <div class="todo-cont">
            <div class="descritpion-cont">
                <span class="todo-description">${task['description']}</span>
            </div>
            <div class="trash-img"><img src=./img/trash_icon_white.png class="deleteImg"
                    onclick="deleteBoardTask(${list[i]['taskId']})"></div>
        </div>
    </div>
  </div> `;
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
      <div id="${task.taskId}" class="todo ${urgencyColor}" draggable="true" ondragstart="drag(${task.taskId})">
    <div>
        <div class="todo-cont ">
            <h3 class="todo-title">${task['title']}</h3>
            <span class="final-day">${task['expirationDate']}</span>
        </div>
        <div class="todo-cont">
            <div class="descritpion-cont">
                <span class="todo-description">${task['description']}</span>
            </div>
            <div class="trash-img"><img src=./img/trash_icon_white.png class="deleteImg"
                    onclick="deleteBoardTask(${list[i]['taskId']})"></div>
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
      <div id="${task.taskId}" class="todo ${urgencyColor}" draggable="true" ondragstart="drag(${task.taskId})">
    <div>
        <div class="todo-cont ">
            <h3 class="todo-title">${task['title']}</h3>
            <span class="final-day">${task['expirationDate']}</span>
        </div>
        <div class="todo-cont">
            <div class="descritpion-cont">
                <span class="todo-description">${task['description']}</span>
            </div>
            <div class="trash-img"><img src=./img/trash_icon_white.png class="deleteImg"
                    onclick="deleteBoardTask(${list[i]['taskId']})"></div>
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
      <div id="${task.taskId}" class="todo ${urgencyColor}" draggable="true" ondragstart="drag(${task.taskId})">
    <div>
        <div class="todo-cont ">
            <h3 class="todo-title">${task['title']}</h3>
            <span class="final-day">${task['expirationDate']}</span>
        </div>
        <div class="todo-cont">
            <div class="descritpion-cont">
                <span class="todo-description">${task['description']}</span>
            </div>
            <div class="trash-img"><img src=./img/trash_icon_white.png class="deleteImg"
                    onclick="deleteBoardTask(${list[i]['taskId']})"></div>
        </div>
    </div>
  </div>
    `;
    }
}

/**
 * function that highlight the board field when you move the task over it
 * @param {HTMLElement} id 
 */
 function highlight(id) {
    document.getElementById(id).classList.add('highlight-container');
  }
  

  /**
   * function that remove the highlight from the board field when you take the mouse from the board
   * @param {HTMLElement} id 
   */
  function removeHighlight(id) {
   document.getElementById(id).classList.remove('highlight-container');
  }
