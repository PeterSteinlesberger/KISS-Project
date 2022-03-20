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
        <div id="addTask" onmouseover="showTooltip('addTask')" onmouseleave="hideTooltip('addTask')" > 
        <div id="task" class="backlog-file" onclick="setStatus(${task['taskId']})">
        <div class="${urgency}"></div>
        <img class="creator-img" src="${task['creatorImg']}" id="creatorImg">
        <div class="creator padding-top" id="creator">${task['creator']}</div>
        <div class="title padding-top" id="title">${task['title']}</div>
        <span class="description padding-top" id="description">${task['description']}</span>
        <div class="finalday padding-top" id="finishDate">${task['expirationDate']}</div>
        <div id="deleteInfo" class="info-box">DELETE TASK</div>
        <div id="addInfo" class="info-box">ADD TASK TO BOARD</div>
        </div> </div> 
        <div id="deleteImgContainer" class="delete-img-container">
        <img id="deleteTask" onmouseover="showTooltip('deleteTask')" onmouseleave="hideTooltip('deleteTask')" src=./img/trash_icon.png class="deleteImg" onclick="deleteBacklogTask(${i})">
        </div></div>`;
    }
}



function showTooltip(id) {
    let addInfo = document.getElementById('addInfo');
    let deleteInfo = document.getElementById('deleteInfo');
    let task = document.getElementById('task');
    let deleteImgContainer = document.getElementById('deleteImgContainer');
    let trashImg = document.getElementById('deleteTask');
    if (id == 'addTask') {
        addInfo.style.display = "flex";
        deleteImgContainer.style.borderLeft = "none";
    } else
        if (id == 'deleteTask') {
            deleteInfo.style.display = "flex";
            deleteInfo.style.color = "red";
            deleteImgContainer.style.border = "1px solid red";
            deleteImgContainer.style.borderLeft = "none";
            task.style.border = "1px solid red";
            task.style.borderRight = "none";
            trashImg.src = "./img/trash_icon_red.png";
        }

}

function hideTooltip(id) {
    let addInfo = document.getElementById('addInfo');
    let deleteInfo = document.getElementById('deleteInfo');
    let deleteImgContainer = document.getElementById('deleteImgContainer');
    let task = document.getElementById('task');
    let trashImg = document.getElementById('deleteTask');
    if (id == 'addTask') {
        addInfo.style.display = "none";
    } else
        if (id == 'deleteTask') {
            deleteInfo.style.display = "none";
            deleteImgContainer.style.border = "solid 1px rgb(0, 114, 255)";
            deleteImgContainer.style.borderLeft = "none";
            task.style.border = "1px solid rgb(0, 114, 255)";
            task.style.borderRight = "none";
            trashImg.src = "./img/trash_icon.png";
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

