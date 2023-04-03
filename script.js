// DATA STRUCTURE

const gridContainer = [];
let globalGridLength = 0;

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

//MINE GENERATOR
const generateMines = (numOfMines) => {
    let minesPlaced = 0;

    while (minesPlaced < numOfMines) {
        const random = Math.floor(Math.random() * gridContainer.length);
        gridContainer[random].isMine = true;
        minesPlaced++;
    }
};

generateGrid(5);
generateMines();

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
    x = parseInt(x)
    y = parseInt(y)
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
    // console.log(searchArray)
    return searchArray; // is an array of 9 elements
};

// SEARCH ALGORITHM

// 1. starting from the center cell, then top left to bottom right of the SEARCH ARRAY grid, evaluate each element of the SEARCH ARRAY for the following:
// 2. evaluate the following conditions:
//    a. checks if the clicked cell is a mine.
//       i. if yes, game over.
//       ii. if no, proceed to 3.
// 3. evaluate cell in SEARCH ARRAY
const searchCellsForMine = (index) => {
    let mineCount = 0
   if (gridContainer[index].isMine) === true && 
        // checks if current cell is center cell and is a mine
        if (cell === mine && cell.index === searchArray.[5]) {
           return KABOOM()
        }
        // checks for undefined cells (out of grid) and skips.
       if (cell === out of grid) {
           continue
       }
       }
       // checks if cell is a mine and adds to center cell mine count.
       if (cell === mine) {
           mineCount += 1
           cell.alreadySearched = true
       }
       update center cell minecount

   }

// const searchCellsNoMine = (searchArray) => {
//    for (cell in searchArray) {
//     // checks for undefined cells (out of grid) and skips.
//         if (cell === out of grid) {
//             continue
//    }
//         if (cell.alreadySearched === true) {
//             continue
//         }
//         if (cell != mine) {
//             searchAlgo(cell.coordinates)
//    }
// }
// }

// const searchAlgo = (cellCoordinates) => {

//     let searchArray = searchKey(cellCoordinates)
//     searchCellsForMine(searchArray)

//     if (minecount === 0) {
//         searchCellsNoMine(searchArray)
// //    b. if cell is not a mine, execute SEARCH KEY and run SEARCH ALGORITHM on current centered cell.
// //       i. if any mines are found, add MINECOUNT += (n) and do not execute further search loops after all 8 adjacent cells are evaluated.
// //      ii. if no mines are found, execute SEARCH KEY on EACH CELL OF THE CURRENT SEARCHARRAY. use booleans here to exclude already searched cells.
// }
// }

const containerEl = document.querySelector(".container");

// sets grid rows and columns based on globalGridLength.
containerEl.style.gridTemplateRows = `repeat(${globalGridLength}, 40px)`;
containerEl.style.gridTemplateColumns = `repeat(${globalGridLength}, 40px)`;


// returns ID of button on click
const returnID = (el) => {
    const isButton = el.target.nodeName === "BUTTON";
    if (!isButton) {
        return;
    }
    let clickedCoords = el.target.id.split(",")

    const searchArray = searchKey(clickedCoords)
    console.log(searchArray)
};



containerEl.addEventListener("click", returnID);

for (i = 0; i < gridContainer.length; i++) {
    const newButton = document.createElement("button");
    newButton.setAttribute("id", gridContainer[i].coords);
    if (gridContainer[i].isRevealed === false) {
        newButton.setAttribute("class", "notRevealed");
    }
    containerEl.appendChild(newButton);
}
