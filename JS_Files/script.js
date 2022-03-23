setURL('http://peter-steinlesberger.developerakademie.com/KISS-Project/smallest_backend_ever');

let allTasks = [];


async function init() {
  await includeHTML();
  bindGoogleTranslator();
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

// function highlightActiveBtn() {
//   setTimeout(() => { 
//     let windowLocation = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
//     console.log('windowLocation:', windowLocation);
//   }, 1000);
// }

// async function highlightActiveBtn() {
//   await let windowLocation = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
//     console.log('windowLocation:', windowLocation);
// }

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


init();



