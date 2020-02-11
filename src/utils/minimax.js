import { getOpenIndexes, getPlayerTileIndexes, WIN_COMBOS } from '../utils/utils';
import { playerA, playerB } from '../data/players';

const checkWinner = (newTiles, player) => {
    let winner = false;
    const playerIndexes = getPlayerTileIndexes(newTiles, player);

    WIN_COMBOS.forEach(combo => {
        if (combo.every(elem => playerIndexes.indexOf(elem) > -1)) {
            winner = true;        
        }  
    })
    return winner;
}

function minimax(newBoard, user){  
    //available spots
    var availSpots = getOpenIndexes(newBoard);
  
    // checks for the terminal states such as win, lose, and tie 
    //and returning a value accordingly
    if (checkWinner(newBoard, playerA)){
       return {score:-10};
    }
    else if (checkWinner(newBoard, playerB)){
      return {score:10};
      }
    else if (availSpots.length === 0){
      return {score:0};
    }
  
    // an array to collect all the objects
    var moves = [];
  
    // loop through available spots
    for (let i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot 
      var move = {};
      move.index = availSpots[i];
  
      // set the empty spot to the current player
      newBoard[availSpots[i]] = user.xo;
  
      /*collect the score resulted from calling minimax 
        on the opponent of the current player*/
      if (user.type==='robot'){
        let result = minimax(newBoard, playerA);
        move.score = result.score;
      }
      else{
        let result = minimax(newBoard, playerB);
        move.score = result.score;
      }
  
      // reset the spot to empty
      newBoard[availSpots[i]] = '';
  
      // push the object to the array
      moves.push(move);
    }
  
    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if (user.type==='robot'){
      let bestScore = -10000;
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{
  
  // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
  // return the chosen move (object) from the moves array
    return moves[bestMove];
  }
export default minimax;