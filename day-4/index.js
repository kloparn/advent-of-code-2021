const fs = require("fs/promises");

const getBingoGame = () =>
  fs.readFile("input.txt", "utf-8").then((data) => data.split("\n"));

const createBoards = (bingoBoards) => {
  const boards = {};
  let index = 0;
  for (const board of bingoBoards) {
    if (board === "") {
      index++;
      continue;
    } else {
      if (boards[index] === undefined) boards[index] = [];
      boards[index].push(board.split(" ").filter((x) => x));
    }
  }
  return boards;
};

const isWinningBoard = (board) => {
  //vertical check
  for (let i = 0; i < 5; i++) {
    const tempArr = [];
    for (const j of board) {
      tempArr.push(j[i]);
    }
    if (tempArr.every((num) => num.includes("+"))) {
      console.log("vertical won!");
      return true;
    }
  }

  //horizontal check
  const horizontalBoardWin = board
    .map((row) => row.every((num) => num.includes("+")))
    .find((e) => e);
  if (horizontalBoardWin) return true;

  return false;
};

(async () => {
  const bingo = (await getBingoGame()).map((b) => b.replace("\r", ""));

  let drawnTickets = bingo.shift().split(",");

  //removes the empty row after the drawn tickets.
  bingo.shift();

  const boards = createBoards(bingo);

  //console.log(boards);

  const winningTicket = {};

  for (const drawnTicket of drawnTickets) {
    if (winningTicket.drawnTicket) {
      break;
    }
    for (const board of Object.values(boards)) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < 5; j++) {
          if (board[i][j] === drawnTicket) {
            board[i][j] = `+${board[i][j]}`;
            //console.log(`updated a board -> ${board[i]}`);
            //console.log(`with the index: ${i}`);
            //console.log(`on drawnTicket: ${drawnTicket}`);
            if (isWinningBoard(board)) {
              winningTicket.drawnTicket = drawnTicket;
              winningTicket.board = board;
            }
          }
        }
      }
    }
  }

  const sumOfNonePlusNumbers = winningTicket.board.reduce((num, curr) => {
    const sum = curr
      .filter((e) => !e.includes("+"))
      .reduce((s, c) => {
        return parseInt(c) + s;
      }, 0);
    return parseInt(num) + parseInt(sum);
  }, 0);

  console.log(winningTicket);
  console.log(sumOfNonePlusNumbers);
  console.log(
    `The final score is then: ${
      winningTicket.drawnTicket
    } * ${sumOfNonePlusNumbers} = ${
      winningTicket.drawnTicket * sumOfNonePlusNumbers
    }`
  );
})();
