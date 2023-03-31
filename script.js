// DATA STRUCTURE

https://imgur.com/a/m1h43Zu

const gridContainer = [];

const generateGrid = (gridLength) => {
  for (let x = 1; x <= gridLength; x++) {
    for (let y = 1; y <= gridLength; y++) {
      const newCellObj = { coords: [x, y] };
      gridContainer.push(newCellObj);
    }
  }
};

generateGrid(10)


// HOW TO ENSURE THAT FIRST CELL CLICKED IS NOT A MINE??

// 1. this is beyond scope of MVP.
// 2. SOLUTIONS
//    a. if first cell clicked is a mine, refresh the board and start again


// SEARCH KEY

// this function takes in the coordinates of the clicked cell and returns the 8 adjacent (or less) cells to be searched in an array.

const searchKey = (cellCoordinates) => {
   // return an array of 8 elements containing the object positions within the data structure to be evaluated.
   // e.g passing in a cell with coordinates (1,1) will return an array of [(0,0), (1,0), (2, 0), (0, 1) etc.. 
   // representing the 8 adjacent cells. if the returned cell does not exist in the grid, then return undefined / some boolean.

// SEARCH ARRAY

// the array to be used in the SEARCH ALGORITHM.
// this array should also include the center cell so it can be referenced.
   return searchArray
}

// SEARCH ALGORITHM

// 1. starting from the center cell, then top left to bottom right of the SEARCH ARRAY grid, evaluate each element of the SEARCH ARRAY for the following:
// 2. evaluate the following conditions:
//    a. checks if the clicked cell is a mine.
//       i. if yes, game over.
//       ii. if no, proceed to 3.
// 3. evaluate cell in SEARCH ARRAY 
const searchCellsForMine = (searchArray) => {
    let mineCount = 0
    for (cell in searchArray) {
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

const searchCellsNoMine = (searchArray) => {
   for (cell in searchArray) {
    // checks for undefined cells (out of grid) and skips.
        if (cell === out of grid) {
            continue
   }
        if (cell.alreadySearched === true) {
            continue
        }
        if (cell != mine) {
            searchAlgo(cell.coordinates)
   }
}
}

const searchAlgo = (cellCoordinates) => {
   
    let searchArray = searchKey(cellCoordinates)
    searchCellsForMine(searchArray)

    if (minecount === 0) {
        searchCellsNoMine(searchArray)
//    b. if cell is not a mine, execute SEARCH KEY and run SEARCH ALGORITHM on current centered cell.
//       i. if any mines are found, add MINECOUNT += (n) and do not execute further search loops after all 8 adjacent cells are evaluated.
//      ii. if no mines are found, execute SEARCH KEY on EACH CELL OF THE CURRENT SEARCHARRAY. use booleans here to exclude already searched cells.
}
}
