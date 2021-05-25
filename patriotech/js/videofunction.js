window.onload = function() {

    ChangeImage('game1','Game01img','Game01vid','video');
    ChangeImage('game2','Game02img','Game02vid','video');
    ChangeImage('game3','Game03img','Game03vid','video');
}

function ChangeImage(fold, target, target2, name) {
    var img = document.getElementById(target);
    var vid = document.getElementById(target2);
    
    if (name === "video") { vid.style.display = "block"; img.style.display = "none"; }
    else {
        vid.style.display = "none"; 
        img.style.display = "block";
        let source = vid.src;
        vid.src = '';
        vid.src = source;
    }
    if (name === "img1") { img.src='./img/'+fold+'/1.png'; }
    if (name === "img2") { img.src='./img/'+fold+'/2.png'; }
    if (name === "img3") { img.src='./img/'+fold+'/3.png'; }
    if (name === "img4") { img.src='./img/'+fold+'/4.png'; }
    if (name === "img5") { img.src='./img/'+fold+'/5.png'; }
}