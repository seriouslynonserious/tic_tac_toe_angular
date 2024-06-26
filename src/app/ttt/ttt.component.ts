import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ttt',
  templateUrl: './ttt.component.html',
  styleUrls: ['./ttt.component.css']
})
export class TttComponent implements OnInit {

  ngOnInit(): void {
    let allCells = localStorage.getItem("cells");
    this.cells = allCells ? JSON.parse(allCells) : Array(10).fill(null);

    let allMovesStr = localStorage.getItem("moves");
    this.moves = allMovesStr ? JSON.parse(allMovesStr) : [];

    let playerAName = localStorage.getItem("playerAName");
    this.playerA.name = playerAName ? playerAName : "PlayerA";

    let playerBName = localStorage.getItem("playerBName");
    this.playerB.name = playerBName ? playerBName : "PlayerB";

    let playerATurn = localStorage.getItem("playerATurn");
    this.playerA.isTurn = playerATurn ? JSON.parse(playerATurn) : true;

    let playerBTurn = localStorage.getItem("playerBTurn");
    this.playerB.isTurn = playerBTurn ? JSON.parse(playerBTurn) : false;
  }

  playerA: Player = new Player("PlayerA", "X", true, false);
  playerB: Player = new Player("PlayerB", "O", false, false);

  cells: string[] = Array(10).fill(null);
  gameStatus: string = "Game is active";
  moves: string[] = [];
  winGridComb: number[] = [];

  updatePlayerName(playerLabel: string) {
    if (playerLabel === 'A') {
      if (this.playerA.isEditing && !this.playerA.name.trim()) {
        this.playerA.name = "PlayerA"; // Default value
      }
      this.playerA.isEditing = !this.playerA.isEditing;
      localStorage.setItem('playerAName', this.playerA.name);
    }
    if (playerLabel === 'B') {
      if (this.playerB.isEditing && !this.playerB.name.trim()) {
        this.playerB.name = "PlayerB"; // Default value
      }
      this.playerB.isEditing = !this.playerB.isEditing;
      localStorage.setItem('playerBName', this.playerB.name);
    }
  }

  makeMove(index: number) {
    if (this.cells[index] != null || this.gameStatus !== "Game is active") {
      return;
    }

    const player = this.playerA.isTurn ? this.playerA : this.playerB;
    this.cells[index] = player.symbol;
    this.moves.unshift(`${player.name} moved to position ${index}`);

    localStorage.setItem('moves', JSON.stringify(this.moves));
    localStorage.setItem('cells', JSON.stringify(this.cells));
    localStorage.setItem('playerATurn', JSON.stringify(this.playerA.isTurn));
    localStorage.setItem('playerBTurn', JSON.stringify(this.playerB.isTurn));

    this.checkGameState();

    if (this.gameStatus === "Game is active") {
      this.playerA.isTurn = !this.playerA.isTurn;
      this.playerB.isTurn = !this.playerB.isTurn;
      localStorage.setItem('playerATurn', JSON.stringify(this.playerA.isTurn));
      localStorage.setItem('playerBTurn', JSON.stringify(this.playerB.isTurn));
    }
  }

  checkGameState() {
    const player = this.playerA.isTurn ? this.playerA : this.playerB;
    const winCombinations = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
      [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
      [1, 5, 9], [3, 5, 7] // diagonals
    ];

    for (let comb of winCombinations) {
      let [a, b, c] = comb;
      if (this.cells[a] === player.symbol && this.cells[b] === player.symbol && this.cells[c] === player.symbol) {
        this.gameStatus = `${player.name} wins!`;
        this.winGridComb = comb;
        return;
      }
    }

    let isDraw = true;
    for (let i = 1; i < 10; i++) {
      if (this.cells[i] == null) {
        isDraw = false;
        break;
      }
    }
    if (isDraw) {
      this.gameStatus = `Game is a draw. Click on reset button`;
    }
  }

  resetGame() {
    this.cells = Array(10).fill(null);
    this.gameStatus = "Game is active";
    this.playerA.isTurn = true;
    this.playerB.isTurn = false;
    this.moves = [];
    this.winGridComb = [];

    localStorage.clear();
  }
}

class Player {
  name: string;
  symbol: string;
  isTurn: boolean;
  isEditing: boolean;

  constructor(name: string, symbol: string, isTurn: boolean, isEditing: boolean) {
    this.name = name;
    this.symbol = symbol;
    this.isTurn = isTurn;
    this.isEditing = isEditing;
  }
}
