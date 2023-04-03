const runSearch = (newCoords) => {
    if (firstClick === true) {
        const searchArray = searchKey(clickedCoords);

        if (checkMine() === "end") {
            // check center cell if isMine
            console.log("end");
            return;
        }
        checkAdjMines(searchArray); // check 8 adj cells if any mines

        if (foundMine === true) {
            return;
        } else {
            firstClick = false;
            // F U C K
            for (i of searchArray) {
                // check searchArray if no mines found
                let index = gridContainer.findIndex((el) => {
                    return JSON.stringify(el.coords) === JSON.stringify(i);
                });
                if (index === -1) {
                    continue;
                }

                let newCoords = gridContainer[index].coords;
                runSearch(newCoords);
            }
        }
    } else if (firstClick === false) {
        const searchArray = searchKey(newCoords);
        checkAdjMines(searchArray);
        if (foundMine === true) {
            return;
        } else {
            firstClick = false;
            // F U C K
            for (i of searchArray) {
                // check searchArray if no mines found
                let index = gridContainer.findIndex((el) => {
                    return JSON.stringify(el.coords) === JSON.stringify(i);
                });
                if (index === -1) {
                    continue;
                }

                let newCoords = gridContainer[index].coords;
                runSearch(newCoords);
            }
        }
    }
};
