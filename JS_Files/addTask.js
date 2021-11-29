function chooseCreatorImg() {
 let creatorName = document.getElementById('creator').select();
 let creatorImg = document.getElementById('creatorImg');
if(creatorName == Peter) {
    creatorImg.src = "img/Peter.jpg";
} else 
if (creatorName == Anja) {
        creatorImg.src = "img/Anja.jpg";
} else 
if (creatorName == Markus) {
        creatorImg.src = "img/Markus.jpg";
}
}

/* keine ahnung wie man das bild aktualisiert
function showCreatorImg() {
    let creatorImg = document.getElementById('creatorImg');
}
*/
