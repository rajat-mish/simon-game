

var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
var userclickedpattern=[];
var started=false;
var level=0;

function nextseq(){
    var n=Math.floor(4*(Math.random()));
   return n;
}

function nextColor(){
    userclickedpattern=[];
var randomchoosencolor=buttoncolors[nextseq()];
level++;
$("#level-title").text("Level " + level);
// console.log(randomchoosencolor);
gamepattern.push(randomchoosencolor);

animateFlash(randomchoosencolor);
playaudio(randomchoosencolor);
}

// $("#"+randomchoosencolor);

function animateFlash(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
}


function animatepress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


$(document).on("keypress", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextColor();
        started = true;
    }
});

$(".btn").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextColor();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userclickedpattern[currentLevel] === gamepattern[currentLevel]) {
        console.log("success");
        if (userclickedpattern.length === gamepattern.length) {
            setTimeout(function() {
                nextColor();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playaudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(".btn").on("click",function(){
var userchoosencolor=$(this).attr("id");
userclickedpattern.push(userchoosencolor);
console.log(userclickedpattern);
playaudio(userchoosencolor);
animatepress(userchoosencolor);
checkAnswer(userclickedpattern.length-1);
});






function playaudio(color){
    var audio = new Audio(color+".mp3");
audio.play();
}



