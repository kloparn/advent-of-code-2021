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
            if (isWinningBoard(board)) {
              winningTicket.drawnTicket = drawnTicket;
              winningTicket.board = board;
            }
          }
        }
      }
    }
  }

  let sumOfNonePlusNumbers = winningTicket.board.reduce((num, curr) => {
    const sum = curr
      .filter((e) => !e.includes("+"))
      .reduce((s, c) => {
        return parseInt(c) + s;
      }, 0);
    return parseInt(num) + parseInt(sum);
  }, 0);

  console.log(
    `The score of the first winning board is then: ${
      winningTicket.drawnTicket
    } * ${sumOfNonePlusNumbers} = ${
      winningTicket.drawnTicket * sumOfNonePlusNumbers
    }`
  );

  const winningTickets = {};

  for (const drawnTicket of drawnTickets) {
    for (const [boardIndex, board] of Object.entries(boards)) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < 5; j++) {
          if (board[i][j] === drawnTicket) {
            if (!winningTickets[boardIndex]) board[i][j] = `+${board[i][j]}`;
            if (isWinningBoard(board) && !winningTickets[boardIndex]) {
              winningTickets[boardIndex] = {
                drawnTicket: drawnTicket,
                board: board,
                winOrder: Object.keys(winningTickets).length,
              };
            }
          }
        }
      }
    }
  }

  sumOfNonePlusNumbers = undefined;
  const finalTicket = {};
  for (const wonTicked of Object.values(winningTickets)) {
    if (wonTicked.winOrder === Object.keys(winningTickets).length - 1) {
      finalTicket.drawnTicket = wonTicked.drawnTicket;

      sumOfNonePlusNumbers = wonTicked.board.reduce((num, curr) => {
        const sum = curr
          .filter((e) => !e.includes("+"))
          .reduce((s, c) => {
            return parseInt(c) + s;
          }, 0);
        return parseInt(num) + parseInt(sum);
      }, 0);
    } else if (sumOfNonePlusNumbers) break;
  }

  console.log(
    `The score for the last winning board is then: ${
      finalTicket.drawnTicket
    } * ${sumOfNonePlusNumbers} = ${
      finalTicket.drawnTicket * sumOfNonePlusNumbers
    }`
  );
})();
