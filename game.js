var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

for(var i=0; i<4; i++){
  var soundObject = "sound_"+buttonColors[i];
  var soundObjectURL = "sounds/"+buttonColors[i]+".mp3";
  eval("var " + soundObject+ " = new Audio('" + soundObjectURL + "')");
}
var sound_wrong = new Audio("sounds/wrong.mp3");

var isGameStarted = 0;
var level = 0;
$("body").on("keydown", function(){
  if(isGameStarted === 0){
    isGameStarted = 1;
    nextSequence();
  }
});

function nextSequence(){
  level++;
  $("h1").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  flashEffect(randomChosenColor);
  playSound(randomChosenColor);
}

var clickCounter = 0;
$(".btn").on("click", function(){
  if(isGameStarted !== 0 && clickCounter < gamePattern.length){
    var userChosenColor = this.id;
    if(gamePattern[clickCounter] == userChosenColor){
      userClickedPattern.push(userChosenColor);
      animatePressed(userChosenColor);
      playSound(userChosenColor);
      clickCounter++;
    }else{
      sound_wrong.play();
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      isGameStarted = 0;
    }
    if(isGameStarted !== 0 && clickCounter === gamePattern.length){
      setTimeout(nextSequence, 1500);
      clickCounter = 0;
    }
  }
});

function playSound(name){
  eval("sound_"+name+".play()");
}

function animatePressed(currentColor){
  var buttonID = "#"+currentColor;
  $(buttonID).addClass("pressed");
  setTimeout(function(){
    $(buttonID).removeClass("pressed");
  },100);

}

function flashEffect(currentColor){
  var buttonID = "#"+currentColor;
  $(buttonID).fadeOut().fadeIn();
}
