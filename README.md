- [1. Project Description](#1-project-description)
- [2. How it works](#2-how-it-works)
  - [2.1 Control FLow Overview](#21-control-flow-overview)
  - [2.2 Search Array / Search Algorithm](#22-search-array--search-algorithm)
- [3. Installation](#3-installation)
- [4. Potential future features](#4-potential-future-features)
  - [4.1 Self solving algorithm](#41-self-solving-algorithm)
  - [4.2 Improved mine map generation](#42-improved-mine-map-generation)
- [5. Contact](#5-contact)

# 1. Project Description

Built with:

-   Javascript

A recreation of the game Mieesweeper.

Game features implemented:

-   A square grid, customizable based on user input.
-   A random mine generator, customizable based on user input.
-   Core game mechanic of revealing squares up to all squares bordering mines,
    and showing the counter for all adjacent mines if there are any.
-   Flag planting on right click
-   Win / lose conditions
-   First click loss protection (mines are re-generated to guaranteee the user's
    first click is not a mine)

# 2. How it works

## 2.1 Control FLow Overview

The main data structure is first intiialized as an array of objects, with each
cell on the grid being represented by an object. The HTML is then populated with
button elements in a grid layout via the DOM, referencing the main array. On
click, the main game functions are executed with the coordinates of the HTML
button being passed to the main array, after which the HTML elements are
re-rendered at the end of turn referencing the array.

## 2.2 Search Array / Search Algorithm

On clicking a cell, the coordinates of the target cell are passed to a search
function which returns an array of coordinates of the 8 adjacent cells to be
searched by the algorithm. Each cell is then evaluated on the 3 following
conditions:

1. Is the clicked cell a mine? If yes, end game.
2. Does the cell have any adjacent mines? If yes, count the number of adjacent
   mines and update its counter in the center cell.
3. If 1 and 2 are false, then the function is called recursively on the array of
   adjacent cells that was returned by the aforementioned search function.

# 3. Installation

Clone the repo

https://github.com/byeonkho/minesweeper

# 4. Potential future features

## 4.1 Self solving algorithm

A self solving algorithm that plays the game itself. Would be a necessary
precursor to 4.2.

## 4.2 Improved mine map generation

A key issue with the game is that "gambling" or "guessing" isn't very fun - for
example, where there are no cells left on the map where the probability of it
not being a mine is 1. In this developer's opinion, a fun game of minesweeper
should keep such instances of guessing to a minimum.

One potential way to approach this issue is by first creating a self solving
algorithm in # 4.1. Since it would likely work on the basis on probability (e.g
first open all cells that are P = 1, then all cells with the next highest P and
so on) the improved mine map generator should only select instances of generated
mine maps where there is a low occurence of low P choices.

# 5. Contact

byeon.kho@gmail.com

Project link: https://github.com/byeonkho/minesweeper
