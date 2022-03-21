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
    renderBacklog();
}


function renderBacklog() {
    for (let i = 0; i < inactiveTasks.length; i++) {
        let task = inactiveTasks[i];
        let urgency = task['priortity'];
        backlogFile.innerHTML += ` 
        <div id="addTask${i}" class="backlog-file-container">
        <div  onmouseover="showTooltip('addTask${i}',  ${i})" onmouseleave="hideTooltip('addTask${i}', ${i})" > 
        <div id="task${i}" class="backlog-file" onclick="setStatus(${task['taskId']})">
        <div class="${urgency}"></div>
        <img id="creatorImg" class="creator-img" src="${task['creatorImg']}" >
        <div id="creator" class="creator padding-top" >${task['creator']}</div>
        <div id="title" class="title padding-top" >${task['title']}</div>
        <span id="description" class="description padding-top" >${task['description']}</span>
        <div id="finishDate" class="finalday padding-top" >${task['expirationDate']}</div>
        <div id="deleteInfo${i}" class="info-box">DELETE TASK</div>
        <div id="addInfo${i}" class="info-box">ADD TASK TO BOARD</div>
        </div> </div> 
        <div id="deleteImgContainer${i}" class="delete-img-container">
        <img id="deleteTask${i}" onmouseover="showTooltip('deleteTask${i}', ${i})" onmouseleave="hideTooltip('deleteTask${i}', ${i})" src=./img/trash_icon.png class="deleteImg" onclick="deleteBacklogTask(${i})">
        </div></div>`;
    }
}


function showTooltip(id, index) {
    console.log('id:', id); 
    console.log('addTask:', 'addtask' + index );
    let addInfo = document.getElementById('addInfo' + index);
    let deleteInfo = document.getElementById('deleteInfo' + index);
    let task = document.getElementById('task' + index);
    let deleteImgContainer = document.getElementById('deleteImgContainer' + index);
    let trashImg = document.getElementById('deleteTask' + index);
    if (id == 'addTask' + index) {
        onHoverStyleAddInfo(addInfo, deleteImgContainer);
    } else
        if (id == 'deleteTask' + index) {
            onHoverStyleDeleteInfo(deleteInfo, task, deleteImgContainer, trashImg);
        }
}


function hideTooltip(id, index) {
    let addInfo = document.getElementById('addInfo' + index);
    let deleteInfo = document.getElementById('deleteInfo' + index);
    let deleteImgContainer = document.getElementById('deleteImgContainer' + index);
    let task = document.getElementById('task' + index);
    let trashImg = document.getElementById('deleteTask' + index);
    if (id == 'addTask' + index) {
        onMouseLeaveStyleAddInfo(addInfo, deleteImgContainer);
    } else
        if (id == 'deleteTask' + index) {
            onMouseLeaveStyleDeleteInfo(deleteInfo, task, deleteImgContainer, trashImg);
        }
}


function onHoverStyleAddInfo(addInfo, deleteImgContainer) {
    addInfo.style.display = "flex";
    deleteImgContainer.style.borderLeft = "none";
    deleteImgContainer.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
}


function onHoverStyleDeleteInfo(deleteInfo, task, deleteImgContainer, trashImg) {
    deleteInfo.style.display = "flex";
    deleteInfo.style.color = "red";
    deleteInfo.style.width = "100%";
    deleteInfo.style.left = "0";
    deleteImgContainer.style.border = "1px solid red";
    deleteImgContainer.style.borderLeft = "none";
    deleteImgContainer.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
    task.style.border = "1px solid red";
    task.style.borderRight = "none";
    trashImg.src = "./img/trash_icon_red.png";
}


function onMouseLeaveStyleAddInfo(addInfo, deleteImgContainer) {
    addInfo.style.display = "none";
    deleteImgContainer.style.backgroundColor = "rgba(0, 0, 0, 0.60)";
}


function onMouseLeaveStyleDeleteInfo(deleteInfo, task, deleteImgContainer, trashImg) {
    deleteInfo.style.display = "none";
    deleteImgContainer.style.border = "solid 1px rgb(0, 114, 255)";
    deleteImgContainer.style.borderLeft = "none";
    task.style.border = "1px solid rgb(0, 114, 255)";
    task.style.borderRight = "none";
    trashImg.src = "./img/trash_icon.png";
    deleteImgContainer.style.backgroundColor = "rgba(0, 0, 0, 0.60)";
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

