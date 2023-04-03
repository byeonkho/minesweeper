// INITIALIZE GLOBAL VARIABLES

const gridContainer = [];
let globalGridLength = 0;
let clickedCoords = null;
let clickedCellIndex = null;
let foundMine = false;

// GRID GENERATOR
const generateGrid = (gridLength) => {
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

// MINE GENERATOR
const generateMines = (numOfMines) => {
    let minesPlaced = 0;

    // catches infinite loop if mines generated > number of cells
    if (numOfMines > gridContainer.length) {
        alert("too many mines");
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

// INITIALIZE GAME STATE

generateGrid(10);
generateMines(15);

const containerEl = document.querySelector(".container");

const gameStateUpdate = () => {
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

        if (gridContainer[index].isRevealed === true) {
            button.classList.add("isRevealed");
        }
    }
};

// sets grid rows and columns based on globalGridLength.
containerEl.style.gridTemplateRows = `repeat(${globalGridLength}, 40px)`;
containerEl.style.gridTemplateColumns = `repeat(${globalGridLength}, 40px)`;

// creates buttons and assigns coords to ID from the gridContainer array.
for (i = 0; i < gridContainer.length; i++) {
    const newButton = document.createElement("button");
    newButton.setAttribute("id", gridContainer[i].coords);
    if (gridContainer[i].isRevealed === false) {
        newButton.classList.add("notRevealed");
    }
    if (gridContainer[i].isMine === true) {
        newButton.classList.add("isMine");
    }
    containerEl.appendChild(newButton);
}

// assigns buttons DOM element to variable after buttons created
const buttons = document.querySelectorAll("button");

// HOW TO ENSURE THAT FIRST CELL CLICKED IS NOT A MINE??

// 1. this is beyond scope of MVP.
// 2. SOLUTIONS
//    a. if first cell clicked is a mine, refresh the board and start again

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
        [x, y], //center cell (index 5)
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

// gets coords of clicked button and assigns to clickedCoords

const returnCoords = (el) => {
    const isButton = el.target.nodeName === "BUTTON";
    if (!isButton) {
        return;
    }
    clickedCoords = el.target.id.split(",");

    // converts clickedCoords array to int
    for (i = 0; i < clickedCoords.length; i++) {
        clickedCoords[i] = parseInt(clickedCoords[i]);
    }

    // assigns clicked cell index to global variable clickedCellIndex
    let index = gridContainer.findIndex((el) => {
        return JSON.stringify(el.coords) === JSON.stringify(clickedCoords);
    });
    clickedCellIndex = index;

    runSearch(clickedCoords, true);
    gameStateUpdate();
};

// checks if the clicked cell is a mine.
const checkMine = () => {
    if (gridContainer[clickedCellIndex].isMine === true) {
        console.log("boomz");
        return "end";
    }
};

// checks 8 adjacent cells and updates center cell with count of mines.
const checkAdjMines = (searchArray) => {
    let mineCount = 0;
    foundMine = false;

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

    gridContainer[centerCellIndex].mineCounter = mineCount;
    gridContainer[centerCellIndex].isRevealed = true;
    // console.log("minecounter", gridContainer[centerCellIndex].mineCounter);
};

const runSearch = (coords, firstClick) => {
    if (firstClick === true) {
        let searchArray = searchKey(coords);

        if (checkMine() === "end") {
            // check center cell if isMine
            console.log("end");
            return;
        }

        checkAdjMines(searchArray); // check 8 adj cells if any mines

        if (foundMine === true) {
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
            if (index === -1) {
                continue;
            }
            let newCoords = gridContainer[index].coords;
            // loop breaker
            if (gridContainer[index].isRevealed === false) {
                runSearch(newCoords, false);
            }
        }
    } else if (firstClick === false) {
        let searchArray = searchKey(coords);
        checkAdjMines(searchArray);

        if (foundMine === true) {
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
            if (index === -1) {
                continue;
            }
            let newCoords = gridContainer[index].coords;

            // runs recursive search if square not yet revealed
            if (gridContainer[index].isRevealed === false) {
                runSearch(newCoords, false);
            }
        }
    }
};

containerEl.addEventListener("click", returnCoords);
