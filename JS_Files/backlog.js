let inactiveTasks = [];


function init() {
  downloadData();
  filterInactiveTasks();
   showBacklog();
}  


function showBacklog() {
    filterInactiveTasks();
    let backlogFile = document.getElementById('backlogFile');
    backlogFile.innerHTML = ``;
    for (let i = 0; i < inactiveTasks.length; i++) {
        let task = inactiveTasks[i];
        let urgency = task['priortity'];
        backlogFile.innerHTML += `
    <div class="backlog-file" onclick="setStatus(${task['taskId']})">
    <div class="${urgency}"></div>
    <img class="creator-img" src="${task['creatorImg']}" id="creatorImg">
    <div class="creator padding-top" id="creator">${task['creator']}</div>
    <div class="title padding-top" id="title">${task['title']}</div>
    <span class="description padding-top" id="description">${task['description']}</span>
    <div class="finalday padding-top" id="finishDate">${task['expirationDate']}</div>
    <img src=./img/behalter.png class="deleteImg" onclick="deleteBacklogTask(${i})">
    </div>`;
    }
}


function deleteBacklogTask(position) {
deleteTask(position);
    showBacklog();
}


async function setStatus(taskId) {
    let task = allTasks.find( task => task.taskId === taskId);
    task.status = 'active';
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    showBacklog();
}


 function filterInactiveTasks() {
   inactiveTasks = allTasks.filter( task => task.status === 'inactive');
}

