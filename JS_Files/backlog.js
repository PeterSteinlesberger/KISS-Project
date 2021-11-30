function showBacklog() {
    let backlogFile = document.getElementById('backlogFile');
    backlogFile.innerHTML = ``;

    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let urgency = allTasks[i]['priortity'];

        backlogFile.innerHTML += `
    <div class="backlog-file">
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
