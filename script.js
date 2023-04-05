// HOW TO ENSURE THAT FIRST CELL CLICKED IS NOT A MINE??

// 1. this is beyond scope of MVP.
// 2. SOLUTIONS
//    a. if first cell clicked is a mine, refresh the board and start again

// INITIALIZE GLOBAL VARIABLES

let gridContainer = [];
let globalGridLength = undefined;
let globalMines = undefined;
let buttons = undefined; // define empty var document.querySelector for all buttons

const containerEl = document.querySelector(".container");
const gridsizeInput = document.getElementById("gridsize");
const minesInput = document.getElementById("mines");
const newGameBtn = document.getElementById("newGameBtn");
const toggleMinesBtn = document.getElementById("toggleMinesBtn");

// initializes new game state on clicking "new game" button
const newGame = (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    // gets input values for gridsize / mines
    if (gridsizeInput.value) {
        globalGridLength = gridsizeInput.value;
    } else {
        globalGridLength = 10;
    }
    if (minesInput.value) {
        globalMines = minesInput.value;
    } else {
        globalMines = 10;
    }
    console.log("mines", globalMines);
    // init game state
    resetGame();
    generateGrid(globalGridLength);
    generateMines(globalMines);
    drawGrid();
    createButtons();
    gameStateUpdate();
};

// GRID DATA STRUCTURE GENERATOR
const generateGrid = (gridLength = 10) => {
    globalGridLength = gridLength;
    for (let y = 1; y <= gridLength; y++) {
        for (let x = 1; x <= gridLength; x++) {
            const newCellObj = {
                coords: [x, y],
                isRevealed: false,
                isMine: false,
                mineCounter: 0,
            };
            gridContainer.push(newCellObj);
        }
    }
};

// DRAWS GRID ON HTML - draw grid rows and columns based on globalGridLength.
const drawGrid = () => {
    containerEl.style.gridTemplateRows = `repeat(${globalGridLength}, 40px)`;
    containerEl.style.gridTemplateColumns = `repeat(${globalGridLength}, 40px)`;
};

// MINE GENERATOR
const generateMines = (numOfMines = 15) => {
    let minesPlaced = 0;

    // catches infinite loop if mines generated > number of cells
    if (numOfMines > gridContainer.length) {
        alert("Too many mines!");
        return;
    }

    while (minesPlaced < numOfMines) {
        const random = Math.floor(Math.random() * gridContainer.length);
        if (gridContainer[random].isMine) {
            continue;
        } else {
            gridContainer[random].isMine = true;
        }
        minesPlaced++;
    }
};

// toggle colour of mines
const toggleMines = () => {
    const allMines = document.querySelectorAll(".isMine");
    for (mine of allMines) {
        if (mine.style.backgroundColor === "pink") {
            mine.style.backgroundColor = "red";
        } else {
            mine.style.backgroundColor = "pink";
        }
    }
};

// CREATE BUTTON ELEMENTS AND APPEND TO HTML CONTAINER

const createButtons = () => {
    for (i = 0; i < gridContainer.length; i++) {
        const newButton = document.createElement("button");
        newButton.setAttribute("id", gridContainer[i].coords);
        newButton.classList.add("isCell");
        if (gridContainer[i].isRevealed === false) {
            newButton.classList.add("notRevealed");
        }
        if (gridContainer[i].isMine === true) {
            newButton.classList.add("isMine");
        }

        // creates flag img and appends to each button
        containerEl.appendChild(newButton);
        const flag = document.createElement("img");
        flag.setAttribute("src", "flag.webp");
        flag.classList.add("notFlagged", "flag");
        newButton.appendChild(flag);
    }
    // assigns buttons DOM element to variable after buttons created
    buttons = document.querySelectorAll(".isCell");
};

// MAIN CLICK FUNCTION TO EXECUTE

const initClick = (el) => {
    // gets coords of clicked button and assigns to clickedCoords
    const isButton = el.target.nodeName === "BUTTON";
    if (!isButton) {
        return;
    }
    let clickedCoords = el.target.id.split(",");

    // converts clickedCoords array to int
    for (i = 0; i < clickedCoords.length; i++) {
        clickedCoords[i] = parseInt(clickedCoords[i]);
    }
    runSearch(clickedCoords, true);
    gameStateUpdate();
};

// EXECUTES AT END OF TURN. RE RENDERS HTML / CSS BASED ON gridContainer state
const gameStateUpdate = () => {
    let revealedCount = 0;
    for (button of buttons) {
        // cleaning ID to be ready for index matching
        let coords = button.id;
        coords = coords.split(",");

        for (let i = 0; i < coords.length; i++) {
            coords[i] = parseInt(coords[i]);
        }

        // finding index for matching
        let index = gridContainer.findIndex((el) => {
            return JSON.stringify(el.coords) === JSON.stringify(coords);
        });

        // setting button innertext to minecount
        if (gridContainer[index].mineCounter > 0) {
            button.innerText = gridContainer[index].mineCounter;
        }

        // setting button class to isRevealed if true
        if (gridContainer[index].isRevealed === true) {
            button.classList.add("isRevealed");
            button.classList.remove("notRevealed");
            revealedCount++;
        }

        if (gridContainer.length - globalMines === revealedCount) {
            win();
        }
    }
};

// GAME OVER

const displayGameOver = () => {
    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add("gameOverContainer");

    const gameOverText = document.createElement("div");
    gameOverText.classList.add("gameOverText");
    gameOverText.innerHTML = "Game Over";

    document.body.appendChild(gameOverContainer);
    gameOverContainer.appendChild(gameOverText);

    // create new game button
    const newGameButton = document.createElement("button");
    newGameButton.innerHTML = "New Game";
    newGameButton.classList.add("newGameButton");
    gameOverContainer.appendChild(newGameButton);

    gameOverContainer.addEventListener("click", newGameClick);
};

// WIN
const win = () => {
    const winContainer = document.createElement("div");
    winContainer.classList.add("winContainer");

    const winText = document.createElement("div");
    winText.classList.add("winText");
    winText.innerHTML = "You Won!";

    document.body.appendChild(winContainer);
    winContainer.appendChild(winText);

    // create new game button
    const newGameButton = document.createElement("button");
    newGameButton.innerHTML = "New Game";
    newGameButton.classList.add("newGameButton");
    winContainer.appendChild(newGameButton);

    winContainer.addEventListener("click", newGameClick);
};

// INITIALIZES NEW GAME ON CLICKING "New Game" BUTTON
const newGameClick = (el) => {
    const isButton = el.target.nodeName === "BUTTON";
    if (!isButton) {
        return;
    }
    resetGame();
    generateGrid();
    generateMines();
    drawGrid();
    createButtons();
    gameStateUpdate();
};

// RESETS GAME BY CLEARING gridContainer AND ALL HTML ELEMENTS.
const resetGame = () => {
    while (containerEl.firstChild) {
        containerEl.removeChild(containerEl.lastChild);
    }
    gridContainer = [];
    gameOverContainer = document.querySelector(".gameOverContainer");
    winContainer = document.querySelector(".winContainer");

    if (gameOverContainer) {
        gameOverContainer.remove();
    }

    if (winContainer) {
        winContainer.remove();
    }
};

const plantFlag = (el) => {
    el.preventDefault();
    if (el.target.nodeName === "BUTTON") {
        const classList = el.target.lastChild.classList;
        for (i of classList) {
            if (i === "notFlagged") {
                el.target.lastChild.classList.remove("notFlagged");
                el.target.lastChild.classList.add("isFlagged");

                return;
            }
            if (i === "isFlagged") {
                el.target.lastChild.classList.remove("isFlagged");
                el.target.lastChild.classList.add("notFlagged");

                return;
            }
        }
    } else {
        const classList = el.target.classList;
        for (i of classList) {
            if (i === "notFlagged") {
                el.target.classList.remove("notFlagged");
                el.target.classList.add("isFlagged");

                return;
            }
            if (i === "isFlagged") {
                el.target.classList.remove("isFlagged");
                el.target.classList.add("notFlagged");

                return;
            }
        }
    }
};

// SEARCH KEY

const searchKey = ([x, y]) => {
    let searchArray = [];
    let index = 0;
    x = parseInt(x);
    y = parseInt(y);

    searchArray.push(
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x, y], //center cell (index 4)
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1]
    );

    for (el of searchArray) {
        if (
            el[0] <= 0 ||
            el[0] > globalGridLength ||
            el[1] <= 0 ||
            el[1] > globalGridLength
        ) {
            searchArray[index] = null;
        }
        index++;
    }
    return searchArray; // is an array of 9 elements
};

// checks if the clicked cell is a mine.
const checkMine = (coords) => {
    let index = gridContainer.findIndex((el) => {
        return JSON.stringify(el.coords) === JSON.stringify(coords);
    });

    if (gridContainer[index].isMine === true) {
        displayGameOver();
    }
};

// checks 8 adjacent cells and updates center cell with count of mines.
const checkAdjMines = (searchArray) => {
    let mineCount = 0;
    let foundMine = false;

    for (i of searchArray) {
        if (i === null) {
            continue;
        }
        let index = gridContainer.findIndex((el) => {
            return JSON.stringify(el.coords) === JSON.stringify(i);
        });
        if (gridContainer[index].isMine === true) {
            mineCount++;
            foundMine = true;
        }
    }
    let centerCellIndex = gridContainer.findIndex((el) => {
        return JSON.stringify(el.coords) === JSON.stringify(searchArray[4]);
    });

    gridContainer[centerCellIndex].isRevealed = true;

    // update minecount if n mines > 0 and return true condition so runSearch exits
    if (foundMine === true) {
        gridContainer[centerCellIndex].mineCounter = mineCount;
        return foundMine;
    }
};

const runSearch = (coords) => {
    // check if clicked cell is a mine
    checkMine(coords);

    let searchArray = searchKey(coords);

    // check 8 adj cells if any mines. if any found, exit
    if (checkAdjMines(searchArray) === true) {
        return;
    }

    // if no mines found

    for (array of searchArray) {
        if (array === null) {
            continue;
        }
        let index = gridContainer.findIndex((el) => {
            return JSON.stringify(el.coords) === JSON.stringify(array);
        });

        let newCoords = gridContainer[index].coords;
        // runs recursive search if square not yet revealed
        if (gridContainer[index].isRevealed === false) {
            runSearch(newCoords);
        }
    }
};

// INITIALIZE GAME STATE

generateGrid();
generateMines();
drawGrid();
createButtons();
containerEl.addEventListener("click", initClick);
containerEl.addEventListener("contextmenu", plantFlag);
newGameBtn.addEventListener("click", newGame);
toggleMinesBtn.addEventListener("click", toggleMines);
