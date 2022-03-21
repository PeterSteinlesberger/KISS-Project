 async function initAddTask() {
  includeHTML();  
 await downloadData();
}


async function createTask() {
  let title = document.getElementById('inputTitle').value;
  let description = document.getElementById('description').value;
  let priortity = document.getElementById('priortity').value;
  let expirationDate = document.getElementById('expirationDate').value;
  let creator = document.getElementById('creator').value;
  let createdAt = new Date().getTime();
  let creatorImg = document.getElementById('creatorImg').src;

  let task = {
    'taskId': createdAt,
    'list': "todo",
    'status': "inactive",
    'title': title,
    'description': description,
    'priortity': priortity,
    'expirationDate': expirationDate,
    'creator': creator,
    'createdAt': createdAt,
    'creatorImg': creatorImg
  };

  allTasks.push(task);
  let allTasksAsString = JSON.stringify(allTasks);
  await backend.setItem('allTasks', allTasksAsString);
}


function chooseCreatorImg() {
 let creatorName = document.getElementById('creator').value;
 let creatorImg = document.getElementById('creatorImg');
if(creatorName == 'peter') {
    creatorImg.src = './img/creators/Peter.jpg';
} else 
if (creatorName == 'anja') {
        creatorImg.src = './img/creators/Anja.png';
} else 
if (creatorName == 'markus') {
        creatorImg.src = './img/creators/Markus.PNG';
}
}

function showInfoContainer() {
  document.getElementById('confirmationContainer').style.visibility ="visible";
}

function visibleInfoContainer() {
  document.getElementById('confirmationContainer').style.visibility ="hidden";
}
