let inactiveTasks = [];
 

async function initBacklog() {
    includeHTML();
    await downloadData();
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
        <div class="backlog-file-container">
        <div id="tooltip1" onmouseover="showTooltip('tooltip1')" onmouseleave="hideTooltip('tooltip1')" class="backlog-file-container"> 
        <div class="backlog-file" onclick="setStatus(${task['taskId']})">
        <div class="${urgency}"></div>
        <img class="creator-img" src="${task['creatorImg']}" id="creatorImg">
        <div class="creator padding-top" id="creator">${task['creator']}</div>
        <div class="title padding-top" id="title">${task['title']}</div>
        <span class="description padding-top" id="description">${task['description']}</span>
        <div class="finalday padding-top" id="finishDate">${task['expirationDate']}</div>
        <div id="deleteInfo" class="info-box">DELETE TASK</div>
        <div id="addInfo" class="info-box">ADD TASK TO BOARD</div>
        </div> </div> 
        <div class="deleteImg-container">
        <img id="tooltip2" onmouseover="showTooltip('tooltip2')" onmouseleave="hideTooltip('tooltip2')" src=./img/trash_icon.png class="deleteImg" onclick="deleteBacklogTask(${i})">
        </div></div>`;
    }
}

function showTooltip(id) {
    console.log(id);
    let addInfo = document.getElementById('addInfo');
    let deleteInfo = document.getElementById('deleteInfo');
    if(id == 'tooltip1') {
      addInfo.style.display ="flex";
    } else 
    if(id == 'tooltip2') {
        deleteInfo.style.display ="flex";
      }
}

function hideTooltip(id) {
    let addInfo = document.getElementById('addInfo');
    let deleteInfo = document.getElementById('deleteInfo');
    if(id == 'tooltip1') {
      addInfo.style.display ="none";
     } else 
     if(id == 'tooltip2') {
        deleteInfo.style.display ="none";
     }
}


async function deleteBacklogTask(position) {
    await deleteTask(position);
    showBacklog();
}


async function setStatus(taskId) {
    let task = allTasks.find(task => task.taskId === taskId);
    task.status = 'active';
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    showBacklog();
}


function filterInactiveTasks() {
    inactiveTasks = allTasks.filter(task => task.status === 'inactive');
}

   