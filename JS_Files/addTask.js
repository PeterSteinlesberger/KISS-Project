let allTasks = [];

function createTask() {
    let title = document.getElementById('inputTitle').value;
    let description = document.getElementById('description').value;
    let priortity = document.getElementById('priortity').value;
    let expirationDate = document.getElementById('expirationDate').value;
    let creator = document.getElementById('creator').value;
   let createdAt = new Date().getTime();

    let task = {
        'title': title,
        'description': description,
        'priortity': priortity,
        'expirationDate': expirationDate,
        'creator': creator,
      'createdAt': createdAt
    };

    allTasks.push(task);
    console.log(allTasks);
}