let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let highScore=0;

let h4=document.querySelector('h4');
let h3=document.querySelector('h3');
let colors=['red','yellow','green','purple'];

document.addEventListener('keypress',function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }


});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250)
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250)
}


function levelUp(){
    userSeq =[];
    level++;
    h3.innerText=`Level ${level}`;
    let randomIdx=Math.floor(Math.random()*4);
    let randomColor=colors[randomIdx];
    gameSeq.push(randomColor);
    console.log(gameSeq);
    let randomBtn=document.querySelector(`.${randomColor}`);


    gameFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h3.innerHTML=`Game Over. <br>Your Score was ${level}.<br> Press any key to start again.`;
        let newScore=level;
        updateHighScore(newScore);
        h4.innerText=`High Score:${highScore}`;
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white';
        },500);
        resetGame();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute('id');
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll('.box');
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function resetGame(){
    gameSeq=[];
    userSeq=[];
    level=0;
    started=false;
}

function updateHighScore(newScore){
    if(newScore>highScore){
        highScore=newScore;
    }
}