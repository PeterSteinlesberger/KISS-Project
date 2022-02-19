function activeLinkBoard() {
    document.getElementById('board').classList.add('active');
    document.getElementById('backlog').classList.add('active');
    document.getElementById('addTask').classList.add('active');
    document.getElementById('help').classList.add('active');
    document.getElementById('design').classList.remove('active');
}

function activeLinkBacklog() {
    document.getElementById('backlog').classList.add('active');
    document.getElementById('board').classList.remove('active');
    document.getElementById('addTask').classList.remove('active');
    document.getElementById('help').classList.remove('active');
    document.getElementById('design').classList.remove('active');
}

function activeLinkaddTask() {
    document.getElementById('addTask').classList.add('active');
    document.getElementById('board').classList.remove('active');
    document.getElementById('backlog').classList.remove('active');
    document.getElementById('help').classList.remove('active');
    document.getElementById('design').classList.remove('active');
}

function activeLinkHelp() {
    document.getElementById('help').classList.add('active');
    document.getElementById('addTask').classList.remove('active');
    document.getElementById('board').classList.remove('active');
    document.getElementById('backlog').classList.remove('active');
    document.getElementById('design').classList.remove('active');
}

function activeLinkDesign() {
    document.getElementById('design').classList.add('active');
    document.getElementById('addTask').classList.remove('active');
    document.getElementById('board').classList.remove('active');
    document.getElementById('backlog').classList.remove('active');
    document.getElementById('help').classList.remove('active');
}