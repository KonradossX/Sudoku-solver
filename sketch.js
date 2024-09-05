let board = [];
let size = 50;
let selected = [5, 5];
let way = 0;

let numbersToFill = [];

function setup() {
  puzzleChoice(1);
  
  if (windowWidth < windowHeight)
    size = windowWidth / 9;
  else
    size = windowHeight / 9;

  createCanvas(size * 9, size * 9);

  for (y = 0; y < 9; y++) {
    for (x = 0; x < 9; x++) {
      let cell = new Cell();
      cell.X = x;
      cell.Y = y;
      board.push(cell);
    }
  }

  for (y = 0; y < 9; y++) {
    for (x = 0; x < 9; x++) {
      let num = numbersToFill[y][x];

      if (num == 0) {
        //writeNumber(x, y, num);
      } else {
        writeConstNumber(x, y, num);
      }
    }
  }

  textAlign(CENTER, CENTER);
  textSize(size * 2 / 3);
  noLoop();
}

function draw() {
  //print("draw");
  background(220);

  for (i = 0; i < board.length; i++) {
    board[i].show(size);
  }

  stroke(100);
  noFill();
  strokeWeight(4);
  rect(-4, size * 3, size * 9 + 8, size * 3);
  rect(size * 3, -4, size * 3, size * 9 + 8);
  strokeWeight(1);

  push();
  stroke(150, 150, 150, 255);
  textSize(size * 1.2);
  //text("@Kooondziu", width / 2, height / 2);
  pop();

  //solve();
}

function mousePressed() {
  switch (way) {
    case 0:
      print("af: " + allField());
      break;
    case 1:
      print("ac: " + allColumns());
      break;
    case 2:
      print("ar: " + allRows());
      break;
    case 3:
      print("as: " + allSquares());
      break;
  }

  draw();

  if (true == true) {
    way++;

    if (way > 3)
      way = 0;
  } else {
    way = 0; 
  }
}

function writeNumber(x, y, number) {
  selected = [x, y];
  let index = (y * 9) + x;
  board[index].write(number);

  for (let i = 0; i < 9; i++) {
    board[(y * 9) + i].possibleNumbers[number - 1] = 0;
    board[(i * 9) + x].possibleNumbers[number - 1] = 0;
  }

  let bigX = int(x / 3);
  let bigY = int(y / 3);

  bigX *= 3;
  bigY *= 3;

  for (let i = bigX; i < (bigX + 3); i++) {
    for (let j = bigY; j < (bigY + 3); j++) {
      board[(j * 9) + i].possibleNumbers[number - 1] = 0;
    }
  }
}

function writeConstNumber(x, y, number) {
  let index = (y * 9) + x;
  board[index].const = true;
  writeNumber(x, y, number);
}

function solve() {
  //print("solve");
  //allSingleCells();
}

function allRows() {
  let succes = false;
  for (let i = 0; i < 9; i++) {
    for (let n = 0; n < 9; n++) {
      succes = row(i, n);
      if (succes == true)
        return true;
    }
  }

  return false;
}

function row(y, number) {
  let index;
  let counter = 0;
  let position = -1;

  for (let i = 0; i < 9; i++) {
    index = (y * 9) + i;

    if (board[index].number == 0) {
      if (board[index].possibleNumbers[number - 1] == 1) {
        counter++;
        position = index;
      }
    }
  }

  if (counter == 1) {
    writeNumber((position % 9), int(position / 9), number);
    print("write x:" + (position % 9) + " y:" + int(position / 9) + " n:" + (number) + " r");
    return true;
  }

  return false;
}

function allColumns() {
  let succes = false;
  for (let i = 0; i < 9; i++) {
    for (let n = 0; n < 9; n++) {
      succes = column(i, n);
      if (succes == true)
        return true;
    }
  }

  return false;
}

function column(x, number) {
  let index;
  let counter = 0;
  let position = -1;

  for (let i = 0; i < 9; i++) {
    index = (i * 9) + x;

    if (board[index].number == 0) {
      if (board[index].possibleNumbers[number - 1] == 1) {
        counter++;
        position = index;
      }
    }
  }

  if (counter == 1) {
    writeNumber((position % 9), int(position / 9), number);
    print("write x:" + (position % 9) + " y:" + int(position / 9) + " n:" + (number) + " c");
    return true;
  }

  return false;
}

function allSquares() {
  let succes = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let n = 0; n < 9; n++) {
        succes = square(i, j, n);
        if (succes == true)
          return true;
      }
    }
  }
  
  return false; 
}

function square(bigX, bigY, number) {
  bigX *= 3;
  bigY *= 3;
  
  let index;
  let counter = 0;
  let position = -1;

  for (let i = bigX; i < (bigX + 3); i++) {
    for (let j = bigY; j < (bigY + 3); j++) {
      index = (j * 9) + i;

      if (board[index].number == 0) {
        if (board[index].possibleNumbers[number - 1] == 1) {
          counter++;
          position = index;
        }
      }
    }
  }

  if (counter == 1) {
    writeNumber((position % 9), int(position / 9), number);
    print("write x:" + (position % 9) + " y:" + int(position / 9) + " n:" + (number) + " s");
    return true;
  }

  return false;
}

function allField() {
  for (y = 0; y < 9; y++) {
    for (x = 0; x < 9; x++) {
      let index = (y * 9) + x;

      if (board[index].number == 0) {
        let counter = 0;
        let number = 0;

        for (let i = 0; i < 9; i++) {
          if (board[index].possibleNumbers[i] == 1) {
            counter++;
            number = i;
          }
        }

        if (counter == 1) {
          writeNumber(x, y, number + 1);
          print("write x:" + x + " y:" + y + " n:" + (number + 1) + " sc");
          return true;
        }
      }
    }
  }

  return false;
}

class Cell {
  constructor() {
    this.X = 0;
    this.Y = 0;
    this.number = 0; //int(random(9));
    this.const = false;
    this.possibleNumbers = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  }

  write(numberToWrite) {
    this.number = numberToWrite;
  }

  show(size) {
    if ((selected[0] == this.X) && (selected[1] == this.Y)) {
      fill(0, 255, 255);
    } else {
      let bigX = int(this.X / 3);
      let bigY = int(this.Y / 3);

      if (((bigX == 1) || (bigY == 1)) && (bigX != bigY)) {
        fill(200);
      } else {
        fill(240);
      }
    }
    stroke(180);
    rect(this.X * size, this.Y * size, size, size);

    fill(0);
    if (this.const) {
      textStyle(BOLD);
    } else {
      textStyle(NORMAL);
    }
    if (this.number != 0) {
      text(this.number, this.X * size + (size / 2), this.Y * size + (size / 2));
    } else {
      let posNum = "";
      for (let i = 0; i < 9; i++) {
        if (this.possibleNumbers[i] != 0) {
          posNum += (i + 1).toString();
        } else {
          posNum += "  ";
        }

        if (((i % 3) == 2) && (i != 8)) {
          posNum += "\n";
        }
      }

      //print(posNum);

      push();
      textSize(textSize() * 0.35);
      textStyle(NORMAL);
      text(posNum, this.X * size + (size / 2), this.Y * size + (size / 2));
      pop();
    }
  }
}