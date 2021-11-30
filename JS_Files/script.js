setURL('http://peter-steinlesberger.developerakademie.com/KISS-Project/smallest_backend_ever');


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };


  let allTasks = [];

  async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    showBacklog();
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


async function deleteTask(position) {
  allTasks.splice(position, 1);
  
  let allTasksAsString = JSON.stringify(allTasks);
  await backend.setItem('allTasks', allTasksAsString);
  showBacklog();
}