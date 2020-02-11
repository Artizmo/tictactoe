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

const bestMove = board => {
      // AI to make its turn
  let bestScore = -Infinity;
  let move;
  
  for (let i = 0; i < 9; i++) {
    // for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i] === '') {
        board[i] = playerB.xo;
        let score = minimax(board, 0, false);
        board[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    // }
  }
  console.log('board', board)
  return move
  }    

  const minimax = (board, depth, isMaximizing) => {
    let openIndexes = getOpenIndexes(board);

    if (checkWinner(board, playerB)) {
        return -10;
    } else if (checkWinner(board, playerA)) {
        return 10;
    } else if (openIndexes.length === 0) {
        return 0;
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        // for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i] === '') {
            board[i] = playerB.xo;
            let score = minimax(board, depth + 1, false);
            board[i] = '';
            bestScore = Math.max(score, bestScore);
          }
        // }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        // for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i] === '') {
            board[i] = playerA.xo;
            let score = minimax(board, depth + 1, true);
            board[i] = '';
            bestScore = Math.min(score, bestScore);
          }
        // }
      }
      return bestScore;
    }
  }

export default bestMove;