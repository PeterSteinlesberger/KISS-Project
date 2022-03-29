setURL('http://peter-steinlesberger.developerakademie.com/KISS-Project/smallest_backend_ever');

let allTasks = [];
let btnActive = false;


/**
 * This function get executed onload and initializing ground functions of the webapp 
 * 
 */
async function init() {
  await includeHTML();
  bindGoogleTranslator();
  highlightActiveBtn();
  downloadData();
}

/**
 * Checks status from screen to trigger the showMenu function
 * 
 */
window.onresize = function () {
  showMenu();
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


/**
 * This function load data from server and parse it to allTasks
 * 
 */
async function downloadData() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  loadBackground(currentBg);
}


/**
 * This function create the task time in milliseconds alias taskId
* @param { number } 
*/
async function deleteTask(position) {
  const index = allTasks.findIndex(t => t.taskId == position);
  allTasks.splice(index, 1);
  let allTasksAsString = JSON.stringify(allTasks);
  await backend.setItem('allTasks', allTasksAsString);
}


/**
 * This function highlight the btn from the current URL and remove the CSS attributes from last highlithed btn
 * 
 */
function highlightActiveBtn() {
  let windowLocation = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
  if (windowLocation == 'dataProtection.html' || windowLocation == 'impressum.html') {
    hideActiveBtn();
  } else {
      activeBtnAddTask(windowLocation);
      activeBtnBoard(windowLocation);
      activeBtnBacklog(windowLocation);
      activeBtnDesign(windowLocation);
      activeBtnHelp(windowLocation);
    }
  }


/**
 * This function highlight the current btn and remove the CSS attrributes from last highlighted btn
 * @param {EventListener} windowLocation 
 */
function activeBtnAddTask(windowLocation) {
  if (windowLocation == 'addTask.html') {
  document.getElementById('addTaskBtn').classList.add("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
  }
}


/**
 * This function highlight the current btn and remove the CSS attrributes from last highlighted btn
 * @param {EventListener} windowLocation 
 */
function activeBtnBoard(windowLocation) {
  if (windowLocation == 'board.html') {
  document.getElementById('boardBtn').classList.add("active-btn");
  document.getElementById('addTaskBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
  }
}


/**
 * This function highlight the current btn and remove the CSS attrributes from last highlighted btn
 * @param {EventListener} windowLocation 
 */
function activeBtnBacklog(windowLocation) {
  if (windowLocation == 'backlog.html') {
  document.getElementById('backlogBtn').classList.add("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('addTaskBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
  }
}


/**
 * This function highlight the current btn and remove the CSS attrributes from last highlighted btn
 * @param {EventListener} windowLocation 
 */
function activeBtnDesign(windowLocation) {
  if (windowLocation == 'chooseBackground.html') {
  document.getElementById('designBtn').classList.add("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('addTaskBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
  }
}


/**
 * This function highlight the current btn and remove the CSS attrributes from last highlighted btn
 * @param {EventListener} windowLocation 
 */
function activeBtnHelp(windowLocation) {
  if (windowLocation == 'help.html') {
  document.getElementById('helpBtn').classList.add("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('addTaskBtn').classList.remove("active-btn");
  }
}


/**
 * This function hide the highlighted btn
 * 
 */
function hideActiveBtn() {
  document.getElementById('addTaskBtn').classList.remove("active-btn");
  document.getElementById('boardBtn').classList.remove("active-btn");
  document.getElementById('backlogBtn').classList.remove("active-btn");
  document.getElementById('designBtn').classList.remove("active-btn");
  document.getElementById('helpBtn').classList.remove("active-btn");
}


// ---------------------- google translate functions ----------------------//

/**
 * This Function bind the google translator  
 * 
 */
function bindGoogleTranslator() {
  let script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute(
    'src',
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  );
  document.body.insertAdjacentElement('beforeend', script);
}

/**
 * This Function initialize the google translator  
 * 
 */
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    defaultLanguage: 'en',
    pageLanguage: 'en',
    includedLanguages: 'de,en,es',
    autoDisplay: 'false',
    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
  }, 'google_translate_element');
}

// -----------------------------------------------------------------------//

/**
 * This function show and hide the hamburger-icon and the menu-contiainer from herader
 * 
 */
function menuBtn() {
  let menuContainer = document.getElementById('menuContainer');
  if (!btnActive) {
    menuContainer.style.display = "flex";
    btnActive = true;
  } else {
    if (btnActive) {
      menuContainer.style.display = "none";
      btnActive = false;
    }
  }
}


/**
 * This function show the menu on header when the screen get greater then 1100px
 * 
 */
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


init();



