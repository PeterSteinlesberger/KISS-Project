let backgrounds = [
    './img/backgrounds/background.jpg', './img/backgrounds/abstract_plants.png', './img/backgrounds/cartoon_house.jpg', './img/backgrounds/family_clouds.jpg',
    './img/backgrounds/flowers.png', './img/backgrounds/green_leaves.png', './img/backgrounds/mountain.jpg',
    './img/backgrounds/hands_on.jpg', './img/backgrounds/team-spirit.jpg', './img/backgrounds/tropic_leaves.png', './img/backgrounds/wall.jpg',
    './img/backgrounds/ozean.jpg', './img/backgrounds/snow.jpg', './img/backgrounds/winter_forest.jpg', './img/backgrounds/mountains.jpg',
    './img/backgrounds/futuristic.jpg', './img/backgrounds/budapest.jpg'
];
let currentBg = '0';


async function initDesign() {
    showSmallPictures();
  await downloadData();
}


function showSmallPictures() {
    for (let i = 0; i < backgrounds.length; i++) {
        document.getElementById('small-pictures').innerHTML += `<img src="${backgrounds[i]}" class="small-picture" id="currentpic${i}" onclick="changeBg(${i})">`
    }
}


function changeBg(j) {
    console.log("currentpic:", j);
    let pos = backgrounds.indexOf(j);
    document.body.style.backgroundImage = '';
    document.body.style.backgroundImage = `url(${backgrounds[pos]})`;
    saveBackground(j);
}


async function loadBackground(currentBg) { 
    let pos = currentBg;
    await downloadFromServer();
    currentBg = backend.getItem('background');
    console.log('pos:', pos);
    document.body.style.backgroundImage = `url(${currentBg})`;
}


async function saveBackground(index) {
    await backend.setItem('background', backgrounds[index]);
    loadBackground(currentBg);
}