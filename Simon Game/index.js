let btnColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userPattern = [];

let gameStarted = false;
let levelNum = 0;

$(document).keypress(function () { 
    if(!gameStarted){
        $("#level-title").text("Level " + levelNum);
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function () { 

    let  userChose = $(this).attr("id");
    userPattern.push(userChose);

    makeSound(userChose);
    animatePress(userChose);
    
    chkAns(userPattern.length - 1);
});

function chkAns(idx){
    if(gamePattern[idx] === userPattern[idx]){
        if(userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        makeSound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press any Key on Keyboard to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {

    userPattern = [];
    levelNum++;

    $("#level-title").text("Level " + levelNum);
    let x = Math.floor(Math.random() * 4);

    let randColChosen = btnColors[x];
    gamePattern.push(randColChosen);

    let colourID = "#"+randColChosen;

    $(colourID).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randColChosen);
}


function animatePress(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    }, 100);
}

function makeSound(colour){
    let source = "sounds/" + colour + ".mp3"; 
    let sound = new Audio(source); 
    sound.play();
}

function startOver() {
    levelNum = 0;
    gamePattern = [];
    gameStarted = false;
}





