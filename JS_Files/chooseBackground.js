let backgrounds = [
    './img/backgrounds/background.jpg', './img/backgrounds/abstract.jpg', './img/backgrounds/bryce-canyon.jpg', './img/backgrounds/cloud.jpg',
    './img/backgrounds/flowers.png', './img/backgrounds/green_leaves.png', './img/backgrounds/earth.jpg','./img/backgrounds/forest-gdff8551a2_1920.jpg',
    './img/backgrounds/glacier.jpg', './img/backgrounds/hands_on.jpg', './img/backgrounds/team-spirit.jpg', './img/backgrounds/tropic_leaves.png',
    './img/backgrounds/mountains.jpg','./img/backgrounds/futuristic.jpg', './img/backgrounds/budapest.jpg','./img/backgrounds/hills.jpg',
    './img/backgrounds/mountains1.jpg','./img/backgrounds/sunset.jpg','./img/backgrounds/trees.jpg','./img/backgrounds/buildings-gb999c4003_1920.jpg',
    // './img/backgrounds/fantasy-g8189c655f_1920.jpg','./img/backgrounds/pexels-artem-beliaikin-853199.jpg','./img/backgrounds/pexels-martin-damboldt-814499.jpg',
    // './img/backgrounds/pexels-pixabay-221433.jpg','./img/backgrounds/pexels-pixabay-414110.jpg','./img/backgrounds/pexels-thanhhoa-tran-1447092.jpg',
    // './img/backgrounds/pexels-visit-greenland-360912.jpg','./img/backgrounds/raisting-satellite-gd13375a08_1920.jpg','./img/backgrounds/sea-ge7ea75908_1920.jpg',
    // './img/backgrounds/dial-g165225af7_1920.jpg'
];
let currentBg = '';


async function initDesign() {
    showSmallPictures();
  await downloadData();
}


function showSmallPictures() {
    for (let i = 0; i < backgrounds.length; i++) {
        document.getElementById('smallImages').innerHTML += `<img src="${backgrounds[i]}" class="small-picture" id="currentpic${i}" onclick="changeBg(${i})">`
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

function closeImgContainer() {
    document.getElementById('imgContainer').style.display = "none";
}