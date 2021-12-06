let inactiveTasks = [];


async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || []; 
   showBacklog();
}  


function showBacklog() {
    let backlogFile = document.getElementById('backlogFile');
    backlogFile.innerHTML = ``;
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let urgency = allTasks[i]['priortity'];
        backlogFile.innerHTML += `
    <div class="backlog-file" onclick="setStatus(${task['taskId']})">
    <div class="${urgency}"></div>
    <img class="creator-img" src="${task['creatorImg']}" id="creatorImg">
    <div class="creator padding-top" id="creator">${task['creator']}</div>
    <div class="title padding-top" id="title">${task['title']}</div>
    <span class="description padding-top" id="description">${task['description']}</span>
    <div class="finalday padding-top" id="finishDate">${task['expirationDate']}</div>
    <img src=./img/behalter.png class="deleteImg" onclick="deleteTask(${i})">
    </div>`;
    }
}


async function deleteTask(position) {
    allTasks.splice(position, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    await backend.setItem('allTasks', allTasksAsString);
    showBacklog();
}


async function setStatus(taskId) {
    let task = allTasks.find( task => task.taskId === taskId);
    task.status = 'active';
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}


async function filterInactiveTasks() {
    let inactiveTask = allTasks.filter( task => task.status === 'inactive');
  await inactiveTasks.push(inactiveTask);
}

