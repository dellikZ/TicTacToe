const Gameboard = (() => {
    let gameboard = [];
    const createCells = (arr) => {
        for(let i = 0; i < 9; i++) {
            let newCell = document.createElement('div');
            document.querySelector('#table').appendChild(newCell);
            newCell.classList.add('cell');
            newCell.setAttribute('index', i);
            arr.push(newCell);
        }
    }

    createCells(gameboard);

    const get2D = (arr) => {
        const newArr = [];
        while(arr.length) {
            newArr.push(arr.splice(0, 3));
        }
        return newArr;
    };

    const gameboard2D = get2D(gameboard);
    
    

    const playerFactory = (name, marker) => {
        return { name, marker };
    }

    const player1 = playerFactory('Player1', 'X');
    const player2 = playerFactory('Player2', '0');


    document.getElementById('player1').addEventListener('change', (event) => {
        player1.name = event.target.value;
    })

    document.getElementById('player2').addEventListener('change', (event) => {
        player2.name = event.target.value;
    })
    
    
    const playerTurn = (event, playerMarker) => {
        if(event.target.className === 'cell' && event.target.textContent === '') {
            event.target.textContent = playerMarker; 
        }
    }


    const checkCell = (event) => {
        if(event.target.textContent !== '') {
            return false;
        } else {
            return true;
        }
    };


    let currentPlayer = player2;
    
    const putMark = (event) => {
        let isNull = checkCell(event);
        if(isNull) {
            if(currentPlayer === player1) {
                currentPlayer = player2;
                playerTurn(event, currentPlayer.marker);
                endGame();
            } else if(currentPlayer === player2){
                currentPlayer = player1;
                playerTurn(event, currentPlayer.marker);
                endGame();
            }
        }
    }


    const startGame = () => {
        document.querySelector('#table').addEventListener('click', putMark)
    }
    

    const checkRow = (arr) => {
        for(let i = 0; i < arr.length; i++) {
                if(arr[i][0].textContent === arr[i][1].textContent && arr[i][1].textContent === arr[i][2].textContent && arr[i][0].textContent !== '') {
                    return true;
                } else {
                    continue;
                }
            
            
        } 
    };


    const checkCol = (arr) => {
        for(let j = 0; j < arr.length; j++) {
                if(arr[0][j].textContent === arr[1][j].textContent && arr[1][j].textContent === arr[2][j].textContent && arr[0][j].textContent !== '') {
                    return true;
                }
                else {
                    continue;
                }
            } 
    };


    const checkDiag = (arr) => {
            if(arr[0][0].textContent === arr[1][1].textContent && arr[0][0].textContent === arr[2][2].textContent && arr[0][0].textContent !== '') {
                return true;
            }
            if(arr[0][2].textContent === arr[1][1].textContent && arr[0][2].textContent === arr[2][0].textContent && arr[0][2].textContent !== '') {
                return true;
            }
    };


    const checkForTie = (arr) => {
        let counter = 0;
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr[i].length; j++) {
                if(arr[i][j].textContent !== '') {
                    counter++;
                }
            }
        }
        if(counter === 9) {
            return true;
        }
        
    };


    const endGame = () => {
        if(checkRow(gameboard2D) || checkCol(gameboard2D) || checkDiag(gameboard2D)) {
            document.querySelector('#table').removeEventListener('click', putMark);
            displayWinner(currentPlayer.name);
        }
        if(checkForTie(gameboard2D)) {
            displayWinner('tie');
        }
    }

    
    const displayWinner = (winner) => {
        const span = document.createElement('span');
        const playAgain = document.createElement('button');
        playAgain.textContent = 'Replay';
        if(winner === 'tie') {
            span.textContent = "It's a tie!";
        } else {
            span.textContent = `${winner} won!`;
        }
        document.querySelector('.result').appendChild(span);
        document.querySelector('.replay').appendChild(playAgain);
        playAgain.addEventListener('click', () => {
            window.location.reload();
        });
    };

    return {
        startGame
    }
})();




Gameboard.startGame();