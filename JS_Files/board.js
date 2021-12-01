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