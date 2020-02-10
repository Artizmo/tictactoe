// const minimax = (newTiles, player) => {
//   console.log('minimax started')
//   const freeTiles = getOpenTiles(newTiles);

//   if (checkForWinner(newTiles, playerA)) {
//     return { score: -10 };
//   }
//   if (checkForWinner(newTiles, playerB)) {
//     return { score: 10 };
//   }
//   if (freeTiles.length === 0) {
//     return { score: 0 };
//   }

//   let moves = [];
//   for (let i=0; i<freeTiles.length; i++) {
//     let move = {};
//     move.index = newTiles[freeTiles[i]];
//     newTiles[freeTiles[i]] = {
//       player
//     }

//     if (player.type === 'robot') {
//       let result = minimax(newTiles, playerA);
//       move.score = result.score;
//     } else {
//       let result = minimax(newTiles, playerB);
//       move.score = result.score;
//     }

//     newTiles[freeTiles[i]] = move.index;
//     moves.push(move);
//   }

//   let bestMove;
//   if (player.type === 'robot') {
//     let bestScore = -10000;
//     for(let i=0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   } else {
//     let bestScore = 10000;
//     for(let i=0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   }
//   return moves[bestMove];