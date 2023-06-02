var gameOver = false;
var plateau;

var rows = prompt("combien de rows ?");
var columns = prompt("combien de columns ?");

// var color1 = prompt("couleur joueur 1 ?");
var playerOne = prompt("nom du joueur 1 ?");

// var color2 = prompt("couleur joueur 2 ?");
var playerTwo = prompt("nom du joueur 2 ?");
var currentPlayer = playerOne;

var currentColumns = [];

window.onload = function () {
  if (rows > 3 && columns > 4) {
    if (rows <= columns) {
      setGame(rows, columns);
    } else {
      let winner = document.getElementById("winner");
      winner.innerText = "rows > colums impossible de créer la partie";
    }
  } else {
    let winner = document.getElementById("winner");
    winner.innerText =
      "rows et/ou columns trop petite impossible de créer la partie";
  }
  let restart = document.getElementById("restart");

  restart.style.display = "none";

  restart.onclick = function () {
    location.reload();
    console.log("restart");
  };
if (getCookie(playerOne) == "") {
  document.getElementById('redw').innerHTML = 0;
}  else {
  document.getElementById('redw').innerHTML = getCookie(playerOne);
}

if (getCookie(playerTwo) == "") {
  document.getElementById('yelloww').innerHTML = 0;
}  else {
  document.getElementById('yelloww').innerHTML = getCookie(playerTwo);
}
};

function setGame() {
  document.getElementById("winner").innerHTML = currentPlayer + " 's turn";
  plateau = [];
  for (let i = 0; i < columns; i++) {
    currentColumns[i] = rows - 1;
  }

  for (let r = 0; r < columns; r++) {
    let row = [];
    var parentDiv = document.getElementById("plateau");

    NewDiv = document.createElement("div");
    NewDiv.id = r.toString();
    parentDiv.appendChild(NewDiv);

    for (let c = 0; c < rows; c++) {
      row.push(" ");

      let jeton = document.createElement("div");
      jeton.id = r.toString() + "-" + c.toString();
      jeton.classList.add("jeton");
      jeton.addEventListener("click", setPiece);
      document.getElementById(r.toString()).append(jeton);
    }
    row.push(" ");
    if (r < rows) {
      plateau.push(row);
    }
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  c = currentColumns[r];

  if (c < 0) {
    return;
  }

  plateau[c][r] = currentPlayer;
  let jeton = document.getElementById(r.toString() + "-" + c.toString());

  if (currentPlayer == playerOne) {
    jeton.classList.add("One-piece");
    currentPlayer = playerTwo;
    document.getElementById("winner").innerHTML = currentPlayer + " 's turn";
  } else {
    jeton.classList.add("Two-piece");
    currentPlayer = playerOne;
    document.getElementById("winner").innerHTML = currentPlayer + " 's turn";
  }

  c -= 1;
  currentColumns[r] = c;

  checkWinner();
  checkNul();
}

function checkWinner() {
  // check de l'horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (plateau[r][c] != " ") {
        if (
          plateau[r][c] == plateau[r][c + 1] &&
          plateau[r][c + 1] == plateau[r][c + 2] &&
          plateau[r][c + 2] == plateau[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // check de la vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (plateau[r][c] != " ") {
        if (
          plateau[r][c] == plateau[r + 1][c] &&
          plateau[r + 1][c] == plateau[r + 2][c] &&
          plateau[r + 2][c] == plateau[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // check de la diagonale
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (plateau[r][c] != " ") {
        if (
          plateau[r][c] == plateau[r + 1][c + 1] &&
          plateau[r + 1][c + 1] == plateau[r + 2][c + 2] &&
          plateau[r + 2][c + 2] == plateau[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // check de l'autre diagonale
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (plateau[r][c] != " ") {
        if (
          plateau[r][c] == plateau[r - 1][c + 1] &&
          plateau[r - 1][c + 1] == plateau[r - 2][c + 2] &&
          plateau[r - 2][c + 2] == plateau[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

function checkNul() {
  let i = 0;
  while (i <= rows) {
    if (plateau[0][i] == " ") {
      return;
    }
    i++;
  }
  let winner = document.getElementById("winner");
  winner.innerText = "égalité !";
  restart.style.display = "block";
  gameOver = true;
}

function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (plateau[r][c] == playerOne) {
    winner.innerText = playerOne + " Wins";
    restart.style.display = "block";
    checkCookie(playerOne);
  } else {
    winner.innerText = playerTwo + " Wins";
    restart.style.display = "block";
    checkCookie(playerTwo);
  }
  gameOver = true;
}

////////////////////////////////////////////////////////////////////////////////////////


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(player) {
  let Cookie1 = getCookie(player);
  let ValueCookie = parseInt(Cookie1);
  console.log(Cookie1);
  console.log(ValueCookie);
  if (Cookie1 == "") {
      setCookie(player, 1, 365);
      console.log('rip');
  } else {
      ValueCookie++;
      setCookie(player, ValueCookie, 365);
  }
}