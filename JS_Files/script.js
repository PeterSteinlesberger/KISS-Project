setURL('http://peter-steinlesberger.developerakademie.com/KISS-Project/smallest_backend_ever');

 let allTasks = [];
 
 
 async function init() {
  await includeHTML();
 // bindGoogleTranslator();
}
// ------------------- new includeHTML function -----------------//

/* Loop through a collection of HTML elements with data-template as attribute: */
/* Make an HTTP request using the attribute value as the file name: */
/* Remove this attribute and call this function once more */
/* Exit the function: */
// async function includeHTML() {
//   try {
//     let templateContainers = document.querySelectorAll('[data-template]');
//     for (let i = 0; i < templateContainers.length; i++) {
//       let elmnt = templateContainers[i];
//       let templatePath = elmnt.getAttribute('data-template');
//       let response = await fetch(templatePath);
//       if (response.status == 200) {
//         elmnt.innerHTML = await response.text();
//       } else {
//         elmnt.innerHTML = response.statusText;
//       }
//       elmnt.removeAttribute('data-template');
//       await includeHTML();
//       return;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// ------------------- old includeHTML function -----------------//
 async function includeHTML() {
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
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
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
 }


async function downloadData() {
   await downloadFromServer();
allTasks = JSON.parse(backend.getItem('allTasks')) || []; 
 // activeLink();
// loadBackground();
}


async function deleteTask(position) {
  allTasks.splice(position, 1);
  let allTasksAsString = JSON.stringify(allTasks);
  await backend.setItem('allTasks', allTasksAsString);
}


// ---------------------- google translate functions ----------------------//


// function bindGoogleTranslator() {
//   let script = document.createElement('script');
//   script.setAttribute('type', 'text/javascript');
//   script.setAttribute(
//     'src',
//     '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//   );
//   document.body.insertAdjacentElement('beforeend', script);
// }

// function googleTranslateElementInit() {
//   new google.translate.TranslateElement(
//     { pageLanguage: 'en', includedLanguages: 'en,es,de' },
//     'google_translate_element'
//   );
// }

init();
