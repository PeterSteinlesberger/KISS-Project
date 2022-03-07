let backgrounds = ['./img/backgrounds/abstract_plants.png', './img/backgrounds/cartoon_house.jpg', './img/backgrounds/guitar.jpg',
    './img/backgrounds/family_clouds.jpg', './img/backgrounds/flowers.png', './img/backgrounds/green_leaves.png', './img/backgrounds/mountain.jpg',
    './img/backgrounds/hands_on.jpg', './img/backgrounds/team-spirit.jpg', './img/backgrounds/tropic_leaves.png', './img/backgrounds/wall.jpg',
    './img/backgrounds/ozean.jpg', './img/backgrounds/snow.jpg', './img/backgrounds/winter_forest.jpg', './img/backgrounds/mountains.jpg',
    './img/backgrounds/futuristic.jpg', './img/backgrounds/budapest.jpg'
];
let currentBg = '';


function showSmallPictures() {
    for (let i = 0; i < backgrounds.length; i++) {
        document.getElementById('small-pictures').innerHTML += `<img src="${backgrounds[i]}" class="small-picture" id="currentpic${i}" onclick="changeBg(${i})">`
      
    }
}


function changeBg(j) {
    console.log("currentpic:", j);
// let pos = backgrounds.indexOf(currentBg);
 document.body.style.backgroundImage = '';
 document.body.style.backgroundImage = `url(${backgrounds[j]})`;
saveBackground(j);
}


async function loadBackground() {
    await downloadFromServer();
    currentBg = backend.getItem('background');
   // let pos = backgrounds.indexOf(currentBg);
    if (window.location.href.endsWith('design.html')) {
        document.getElementById('currentpic' + pos).classList.add('active-picture');
    }
   // document.body.style.backgroundImage = `url(${currentBg})`;
    document.body.style.backgroundImage = `url(${backgrounds[j]})`;
}


async function saveBackground(index) {
    await backend.setItem('background', backgrounds[index]);
    loadBackground();
}