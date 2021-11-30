function showBacklog() {
 let backlogFile = document.getElementById('backlogFile'); 
 backlogFile.innerHTML = ``;



for (let i = 0; i < allTasks.length; i++) {
    let task = allTasks[i];
    backlogFile.innerHTML += `
    <div class="backlog-file">
    <div class="urgency-color" id="urgencyColor">${task['priortity']}</div>
    <img class="creator-img" src="${task['creatorImg']}" id="creatorImg">
    <div class="creator padding-top" id="creator">${task['creator']}</div>
    <div class="title padding-top" id="title">${task['title']}</div>
    <span class="description padding-top" id="description">${task['description']}</span>
    <div class="finalday padding-top" id="finishDate">${task['expirationDate']}</div>
    <img src=./img/behalter.png class="deleteImg" onclick="deleteTask(${i})">
    </div>`;
}
}

function urgencyColor() {
    let urgencyColor = document.getElementById('urgencyColor');
    if(priortity.value == normal) {
        urgencyColor.style.backgroundColor = "yellow";
    } else 
    if(priortity.value == notImportant) {
urgencyColor.style.backgroundColor = "green";
    } else {
     urgencyColor.style.backgroundColor = "red";   
    }
}