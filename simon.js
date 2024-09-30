var buttonColors = ["red", "blue", "yellow", "green"];

var gamePattern = [];

var userClickPattern = [];

var start = false;
var level = 0;

// this is for keypressing to start the game
$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level "+ level);
        gameSequence();
        start = true;
    } 
});

// this is for checking the answer that user choose correct or not.
function answerCheck(recentLevel){
    if(gamePattern[recentLevel] === userClickPattern[recentLevel]){
        console.log("Success");
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                gameSequence(); 
            },1000);
        }
    }
    else{
        console.log("Wrong");
        soundPlay("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

// this is use for when user click to add animation, sound and the answerchecking functions will call.
$(".btn").click(function(){
    var userChosedColor = $(this).attr("id");
    userClickPattern.push(userChosedColor);

    console.log(userClickPattern);

    soundPlay(userChosedColor);
    animateColor(userChosedColor);
    answerCheck(userClickPattern.length-1);
})

function gameSequence(){
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomColor = Math.floor(Math.random() * 4);

    var randomChoseColour = buttonColors[randomColor];

    gamePattern.push(randomChoseColour);
    console.log(gamePattern);

    $("#"+ randomChoseColour).fadeIn(100).fadeOut(100).fadeIn(100);

    soundPlay(randomChoseColour);  
}

function soundPlay(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateColor(recentColor){
    $("#" + recentColor).addClass("pressed");

    setTimeout(function(){
        $(".btn").removeClass("pressed"); 
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}

 