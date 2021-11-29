function showBacklog() {
    let urgencyColor = document.getElementById('urgencyColor');
    let creator = document.getElementById('creator');
    let creatorImg = document.getElementById('creatorImg');
    let title = document.getElementById('title');
    let description = document.getElementById('descrition');
    let finishDate = document.getElementById('finishDate');
    let backlogFile = document.getElementById('backlogFile');

    backlogFile.innerHTML = ``;

for (let i = 0; i < allTasks.length; i++) {
    const element = allTasks[i];
    
}

    backlogFile.innerHTML = `
    <div class="backlog-file">
    <div class="urgency-color" id="urgencyColor"></div>
    <img class="creator-img" src="img/day.png" id="creatorImg">
    <div class="creator padding-top" id="creator">dfghdfghdfghdfgh</div>
    <div class="title padding-top" id="title">dfghdfghdfghdf</div>
    <span class="description padding-top" id="description">Lorem ipsum dolorv cv fbcg hfdfg fgh fg bsfgh sfgbh yfdgb yfg ydfg ydfgbb ydfg ydfgb yfcb yfcb yf b g elit. A distinctio error,
        possimus .</span>
    <div class="finalday padding-top" id="finishDate">dfghdfghdfghdfgh</div>
</div>
    
    
    
    `;
}