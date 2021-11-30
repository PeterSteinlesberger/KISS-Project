function chooseCreatorImg() {
 let creatorName = document.getElementById('creator').value;
 let creatorImg = document.getElementById('creatorImg');
if(creatorName == 'peter') {
    creatorImg.src = './img/Peter.jpg';
} else 
if (creatorName == 'anja') {
        creatorImg.src = './img/night.png';
} else 
if (creatorName == 'markus') {
        creatorImg.src = './img/pointer.png';
}
}

