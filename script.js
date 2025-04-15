const cell = document.querySelectorAll(".cell");
 const turnIndicator = document.getElementById("turn");
 const result = document.getElementById("result");
 const resetButton = document.getElementById("reset");
 
 let currentPlayer = "X";
 let gameBoard = Array(9).fill("");
 let gameActive = true;
 
 const winningConditions = [
     [0, 1, 2], [3, 4, 5], [6, 7, 8],
     [0, 3, 6], [1, 4, 7], [2, 5, 8],
     [0, 4, 8], [2, 4, 6]
 ]
 
 function checkWin(){
     for(let condition of winningConditions){
         let [a, b, c]  = condition;
         if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
             gameActive = false;
             result.textContent  = `${currentPlayer} Win!`;
             condition.forEach(index => cell[index].classList.add("winner"));
             resetButton.style.display = "block";
             return;
         }
     }
     if(!gameBoard.includes("")){
         gameActive = false;
         result.textContent = "It's  a Draw!";
         resetButton.style.display = "block";
     }
 }
 function handleCellClick(e){
     const index = e.target.dataset.index;
     if(gameBoard[index] || !gameActive) return;
     gameBoard[index] = currentPlayer;
     e.target.textContent = currentPlayer;
     checkWin();
     currentPlayer = currentPlayer === "X" ? "O" : "X";
     turnIndicator.textContent = currentPlayer;
 }
 function resetGame(){
     gameBoard.fill("");
     cell.forEach(cell => {
         cell.textContent = "";
         cell.classList.remove("winner");
     });
     gameActive = true;
     currentPlayer = "X";
     turnIndicator.textContent = currentPlayer;
     result.textContent = "";
     resetButton.style.display = "none";
 }
 cell.forEach(cell => cell.addEventListener("click", handleCellClick));
 resetButton.addEventListener("click", resetGame);