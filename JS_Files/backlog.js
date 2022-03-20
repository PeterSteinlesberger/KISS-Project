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
        backlogFile.innerHTML += `<div style="padding: 12px"> 
        <div class="backlog-file-container">
        <div id="tooltip1" onmouseover="showTooltip('tooltip1')" onmouseleave="hideTooltip('tooltip1')" > 
        <div id="backlogFile" class="backlog-file" onclick="setStatus(${task['taskId']})">
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
        <img id="tooltip2" onmouseover="showTooltip('tooltip2')" onmouseleave="hideTooltip('tooltip2')" src=./img/trash_icon.png class="deleteImg" onclick="deleteBacklogTask(${i})">
        </div></div></div>`;
    }
}

function showTooltip(id) {
    console.log(id);
    let addInfo = document.getElementById('addInfo');
    let deleteInfo = document.getElementById('deleteInfo');
    let deleteImgContainer = document.getElementById('deleteImgContainer');
    let trashImg = document.getElementById('tooltip2');
    let toolTip1 = document.getElementById('tooltip1');
    if(id == 'tooltip1') {
      addInfo.style.display ="flex";

    } else 
    if(id == 'tooltip2') {
        deleteInfo.style.display ="flex";
        deleteImgContainer.style.border ="1px solid red";
        deleteImgContainer.style.borderLeft ="none";
        // deleteImgContainer.classList.add('delete-red');
        // toolTip1.classList.add('backlog-file-red');
        trashImg.src ="./img/trash_icon_red.png";
      }
 
}

function hideTooltip(id) {
    let addInfo = document.getElementById('addInfo');
    let deleteInfo = document.getElementById('deleteInfo');
    let deleteImgContainer = document.getElementById('deleteImgContainer');
    if(id == 'tooltip1') {
      addInfo.style.display ="none";
     } else 
     if(id == 'tooltip2') {
        deleteInfo.style.display ="none";
        deleteImgContainer.style.border ="1px solid blue"; 
        
        let trashImg = document.getElementById('tooltip2');
        trashImg.src ="./img/trash_icon.png";
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

   