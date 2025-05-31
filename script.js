let score = JSON.parse(localStorage.getItem('score')) || {
        
  Wins : 0,
  Losses : 0,
  Ties : 0

};

updateScoreElement();

/* if(!score){
score = {
  Wins : 0,
  Losses : 0,
  Ties : 0
};
} */

let isAutoPlaying = false;
let IntervalID;


function autoPlay(){

  if(!isAutoPlaying){
    IntervalID = setInterval(() => {
      const playermove = pick_computer_move();
      play_game(playermove);
    },1000);
    isAutoPlaying = true;
  }else{
    clearInterval(IntervalID); //stop the interval
    isAutoPlaying = false;
  }

  
}

//using keys we can play the game here.
document.body.addEventListener('keydown', (event) =>{
  if(event.key === 'r'){
    play_game('Rock');
  }else if(event.key === 'p'){
    play_game('Paper');
  }else if (event.key === 's'){
    play_game('Scissors')
  }
});

function play_game(playermove){

const computerMove = pick_computer_move();
let result ='';

if(playermove === 'Rock'){
  if(computerMove === 'Rock'){
    result = 'Tie';
  }else if (computerMove === 'Paper'){
    result = 'You Lose';
  }else{
    result = 'You Win';
  }
}else if (playermove === 'Paper'){
  if(computerMove === 'Rock'){
    result = 'You Win';
  }else if (computerMove === 'Paper'){
    result = 'Tie';
  }else{
    result = 'You Lose';
  }
}else if (playermove === 'Scissors'){
  if(computerMove === 'Rock'){
    result = 'You Lose';
  }else if (computerMove === 'Paper'){
    result = 'You Win';
  }else{
    result = 'Tie';
  }

}

if(result == 'You Win'){
  score.Wins += 1;
}else if (result == 'You Lose'){
  score.Losses += 1;
}else if (result == 'Tie'){
  score.Ties +=1;
}

localStorage.setItem('score', JSON.stringify(score));


updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You 
<img src = "/images/${playermove}-emoji.png" class="image-icon">
<img src = "/images/${computerMove}-emoji.png" class="image-icon">
Computer`;

        /* alert(`You choose ${playermove}. Computer choose ${computerMove}. ${result} 
  Wins : ${score.Wins}, Losses : ${score.Losses}, Ties : ${score.Ties}.`);*/
}

function updateScoreElement(){
document.querySelector('.js-score').innerHTML = `Wins : ${score.Wins}, Losses : ${score.Losses}, Ties : ${score.Ties}`;
}

function pick_computer_move(){

const randomNumber = Math.random();
let computerMove = ''; 

if(randomNumber >= 0 && randomNumber<1/3){
  computerMove = 'Rock';
}else if (randomNumber >=1/3 && randomNumber<2/3){
  computerMove = 'Paper';
}else{
  computerMove = 'Scissors';
}

return computerMove;
} 