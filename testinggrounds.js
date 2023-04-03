// INITIALIZE GLOBAL VARIABLES

const gridContainer = [];
let globalGridLength = 0;
let searchArray = [];
let clickedCoords = null;
let centerCellIndex = null;


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
      alert("too many mines")
      return
    }

    while (minesPlaced < numOfMines) {
        const random = Math.floor(Math.random() * gridContainer.length);
        if (gridContainer[random].isMine) {
            continue
        } else {
            gridContainer[random].isMine = true;
        }

        minesPlaced++;
    }
};


// INITIALIZE GAME STATE

generateGrid(10);
generateMines(5);

const containerEl = document.querySelector(".container");

// sets grid rows and columns based on globalGridLength.
containerEl.style.gridTemplateRows = `repeat(${globalGridLength}, 40px)`;
containerEl.style.gridTemplateColumns = `repeat(${globalGridLength}, 40px)`;

// creates buttons and assigns coords to ID from the gridContainer array.
for (i = 0; i < gridContainer.length; i++) {
  const newButton = document.createElement("button");
  newButton.setAttribute("id", gridContainer[i].coords);
  if (gridContainer[i].isRevealed === false) {
      newButton.classList.add("notRevealed")
  }
  if (gridContainer[i].isMine === true) {
    newButton.classList.add("isMine")
}
  containerEl.appendChild(newButton);
}

// HOW TO ENSURE THAT FIRST CELL CLICKED IS NOT A MINE??

// 1. this is beyond scope of MVP.
// 2. SOLUTIONS
//    a. if first cell clicked is a mine, refresh the board and start again

// SEARCH KEY

// this function takes in the coordinates of the clicked cell and returns the 8 adjacent (or less) cells to be searched in an array.
//    return an array of 9 elements (including center cell) containing the object positions within the data structure to be evaluated.
//    e.g passing in a cell with coordinates (1,1) will return an array of [(0,0), (1,0), (2, 0), (0, 1) etc..
//    representing the 8 adjacent cells. if the returned cell does not exist in the grid, then return null for that element.

const searchKey = ([x, y]) => {

    let searchArray = [];
    let index = 0;

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

    for (i = 0; i < clickedCoords.length; i++) {
        clickedCoords[i] = parseInt(clickedCoords[i]);
    }
};

// checks if the clicked cell is a mine.
const checkMine = () => {
    let index = gridContainer.findIndex((el) => {
        return JSON.stringify(el.coords) === JSON.stringify(clickedCoords);
    });
    centerCellIndex = index
    if (gridContainer[index].isMine === true) {
        console.log("boomz");
    }
 
};

// checks 8 adjacent cells and updates center cell with count of mines.
const checkAdjMines = (array) => {
  let mineCount = 0
  for (i of array) {
    if (i === null) {
      continue
    }
    let index = gridContainer.findIndex((el) => {
        return JSON.stringify(el.coords) === JSON.stringify(i);
    });
    if (gridContainer[index].isMine === true) {
      mineCount++
    }
}
  gridContainer[centerCellIndex].mineCounter = mineCount
  console.log("minecounter", gridContainer[centerCellIndex].mineCounter)
}

const runSearch = () => {
  const searchArray = searchKey(clickedCoords);
    checkMine()
    checkAdjMines(searchArray)

    // returns the index of the gridContainer el cell matching coordinates of searchArray.
    for (i of searchArray) {

        let index = gridContainer.findIndex((el) => {
            return JSON.stringify(el.coords) === JSON.stringify(i);
        });
        // console.log(index);
    }
};

containerEl.addEventListener("click", returnCoords);
containerEl.addEventListener("click", runSearch);

