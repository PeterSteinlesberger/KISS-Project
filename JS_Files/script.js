setURL('http://peter-steinlesberger.developerakademie.com/KISS-Project/smallest_backend_ever');

let allTasks = [];
let btnActive = false;

async function init() {
  await includeHTML();
  bindGoogleTranslator();
  highlightActiveBtn();
}


// ------------------- includeHTML function -----------------//

/* Loop through a collection of HTML elements with data-template as attribute: */
/* Make an HTTP request using the attribute value as the file name: */
/* Remove this attribute and call this function once more */
/* Exit the function: */
async function includeHTML() {
  try {
    let templateContainers = document.querySelectorAll('[data-template]');
    for (let i = 0; i < templateContainers.length; i++) {
      let elmnt = templateContainers[i];
      let templatePath = elmnt.getAttribute('data-template');
      let response = await fetch(templatePath);
      if (response.status == 200) {
        elmnt.innerHTML = await response.text();
      } else {
        elmnt.innerHTML = response.statusText;
      }
      elmnt.removeAttribute('data-template');
      await includeHTML();
      return;
    }
  } catch (error) {
    console.error(error);
  }
}


async function downloadData() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  loadBackground(currentBg);
}


/**
* @param { number } - position created task time in milliseconds alias taskId
*/
async function deleteTask(position) {
  const index = allTasks.findIndex(t => t.taskId == position);
  allTasks.splice(index, 1);
  let allTasksAsString = JSON.stringify(allTasks);
  await backend.setItem('allTasks', allTasksAsString);
}



function highlightActiveBtn() {
  let windowLocation = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
  console.log('windowLocation:', windowLocation);
  if (windowLocation == 'dataProtection.html' || windowLocation == 'impressum.html') {
    document.getElementById('addTaskBtn').classList.remove("active-btn");
    document.getElementById('boardBtn').classList.remove("active-btn");
    document.getElementById('backlogBtn').classList.remove("active-btn");
    document.getElementById('designBtn').classList.remove("active-btn");
    document.getElementById('helpBtn').classList.remove("active-btn");
  } else {
    if (windowLocation == 'addTask.html') {
      activeBtnAddTask();
    }
    if (windowLocation == 'board.html') {
      activeBtnBoard();
    }
    if (windowLocation == 'backlog.html') {
      activeBtnBacklog();
    }
    if (windowLocation == 'chooseBackground.html') {
      activeBtnDesign();
    }
    if (windowLocation == 'help.html') {
      activeBtnHelp();
    }
  }
}


function activeBtnAddTask() {
  document.getElementById('addTaskBtn').classList.add("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
}


function activeBtnBoard() {
  document.getElementById('boardBtn').classList.add("active-btn");
  document.getElementById('addTaskBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
}


function activeBtnBacklog() {
  document.getElementById('backlogBtn').classList.add("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('addTaskBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
}


function activeBtnDesign() {
  document.getElementById('designBtn').classList.add("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('addTaskBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
}

function activeBtnHelp() {
  document.getElementById('helpBtn').classList.add("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('addTaskBtn').classList.remove("active-btn");
}


// ---------------------- google translate functions ----------------------//
function bindGoogleTranslator() {
  let script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute(
    'src',
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  );
  document.body.insertAdjacentElement('beforeend', script);
}




function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    defaultLanguage: 'en',
    pageLanguage: 'en',
    includedLanguages: 'de,en,es',
    autoDisplay: 'true',
    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
  }, 'google_translate_element');
}

// ------------------------------------------------------------------


function menuBtn() {
  let menuContainer = document.getElementById('menuContainer');
  if (!btnActive) {
    menuContainer.style.display = "flex";
    btnActive = true;
  }
  else {
    if (btnActive) {
      menuContainer.style.display = "none";
      btnActive = false;
    }
  }

}

function showMenu() {
  if (window.innerWidth > 1100) {
    let menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = "flex";
    btnActive = false;
  } else {
    menuContainer.style.display = "none";
    btnActive = true;
  }
}

window.onresize = function () {
  showMenu();
}

init();



