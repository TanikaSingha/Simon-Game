let gameSeq=[];
let userSeq=[];
let highscore=0;
let btns=["yellow","red","green","purple"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;

        levelUp();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    // random btn choose
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameflash(randbtn);
}
function gethighscore(){
    if(level>highscore){
        highscore=level;
    }
    return highscore;
}
function checkAns(index){
    if(gameSeq[index]===userSeq[index]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        let highscore=gethighscore();
        h2.innerHTML=`Game Over! Your score was <b>${level}</b>.<br>Press any key to start again.<br>Highest Score : ${highscore}`;
        document.querySelector("body").style.backgroundImage="url(err.jpg)";
        setTimeout(function(){
            document.querySelector("body").style.backgroundImage="url(bggrid.jpg)";
        },200);
        reset();
    }
}
function btnPress(){
    let btn=this;
    userflash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}