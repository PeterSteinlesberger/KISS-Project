let backgrounds = ['./img/backgrounds/abstract_plants.png', './img/backgrounds/cartoon_house.jpg',
    './img/backgrounds/family_clouds.jpg', './img/backgrounds/family_sunset.jpg', 
    './img/backgrounds/flowers.png', './img/backgrounds/green_leaves.png', 
    './img/backgrounds/hands_on.jpg', './img/backgrounds/team-spirit.jpg', 
    './img/backgrounds/together.jpg', './img/backgrounds/tropic_leaves.png', 
    './img/backgrounds/wall.jpg'
];
let currentBg = '';


function showSmallPictures() {
    for (let i = 0; i < backgrounds.length; i++) {
        document.getElementById('small-pictures').innerHTML += `<img src="${backgrounds[i]}" class="small-picture" id="currentpic${i}" onclick="changeBg(${i})">`
    }
}


function changeBg(j) {
 let pos = backgrounds.indexOf(currentBg);
 document.getElementById('currentpic' + pos).classList.remove('active-picture');
 document.getElementById('bg').style.backgroundImage = '';
 document.getElementById('bg').style.backgroundImage = `url(${backgrounds[j]})`;
saveBackground(j);
}


async function loadBackground() {
    await downloadFromServer();
    currentBg = backend.getItem('background');
    let pos = backgrounds.indexOf(currentBg);
    if (window.location.href.endsWith('design.html')) {
        document.getElementById('currentpic' + pos).classList.add('active-picture');
    }
    document.getElementById('bg').style.backgroundImage = `url(${currentBg})`;
}


async function saveBackground(index) {
    await backend.setItem('background', backgrounds[index]);
    loadBackground();
}