var walletAmt = 500;
var playerBetAmt = 0;
var chip1 = 1;
var chip5 = 5;
var chip25 = 25;
var chip100 = 100;
var chip500 = 500;
var chip1000 = 1000;

var whatYouBetOn = {
  passLineAmt: 0,
  numberTwo: 0,
  numberThree: 0,
  numberFour: 0,
  numberFive: 0,
  numberSix: 0,
  numberEight: 0,
  numberNine: 0,
  numberTen: 0,
  numberEleven: 0,
  numberTwelve: 0,
  hardFour: 0,
  hardSix: 0,
  hardEight: 0,
  hardTen: 0,
};

var numbersRolled = [];
var wonAmtArry = [];

$(document).ready(function () {
  $("#walletAmt").text(walletAmt);
  $("#playerBetAmt").text(playerBetAmt);
  $("#rollDice").prop("disabled", true);
  $("#passLineBtn").click(function () {
    //debugger;
    if (whatYouBetOn["passLineAmt"] > 0) {
      $("#rollDice").prop("disabled", false);
    }
  });
});

//Part 1 of Placing Chips and Storing Them Internally
function setBet(chipAmt) {
  // $('#plusButton').click(function() {
  if (chipAmt + playerBetAmt <= walletAmt) {
    playerBetAmt = playerBetAmt + chipAmt;
    $("#playerBetAmt").text(playerBetAmt);
  } else {
    alert("You can't bet more than the money you have!");
  }
}

function typeBet(fieldClickedOn) {
  if (playerBetAmt <= walletAmt) {
    var boomerBet = prompt(
      "Please Type in The Amount youd Like for us to put on this number"
    );

    console.log(fieldClickedOn);
    var fields = fieldClickedOn.toString();
    var fields2 = "#" + fields;

    var boomerBet2 = parseInt(boomerBet);
    whatYouBetOn[fieldClickedOn] = boomerBet2;
    $(fields2).text(boomerBet2);
    walletAmt = walletAmt - boomerBet2;
    $("#walletAmt").text(walletAmt);
    console.log("wallet amt", walletAmt);
  } else {
    alert(
      "You have nore more money, please subtract your bet from the current number or Roll the Dice!"
    );
  }
}

function placeBet(numberClickedOn) {
  //debugger;
  if (playerBetAmt <= walletAmt) {
    prevBetAmt = whatYouBetOn[numberClickedOn] + playerBetAmt;
    whatYouBetOn[numberClickedOn] = prevBetAmt;
    console.log(prevBetAmt);

    var numberSelectedId = "#" + numberClickedOn;
    console.log(numberSelectedId);

    var numBet = numberSelectedId.toString(); //; +'BetAmt';
    $(numBet).text(prevBetAmt);
    walletAmt = walletAmt - playerBetAmt;
    $("#walletAmt").text(walletAmt);
    console.log("wallet amt", walletAmt);
    console.log(whatYouBetOn[numberClickedOn]);
  } else {
    alert(
      "You have nore more money, please subtract your bet from the current number or Roll the Dice!"
    );
  }
}

function generateDice() {
  var randomNumber1 = Math.floor(Math.random() * 6 + 1);
  $("#img1").attr(
    "src",
    "Dice images/Dice-" + randomNumber1.toString() + ".png"
  );
  numbersRolled.push(randomNumber1);

  var randomNumber2 = Math.floor(Math.random() * 6 + 1);
  $("#img2").attr(
    "src",
    "Dice images/Dice-" + randomNumber2.toString() + ".png"
  );
  numbersRolled.push(randomNumber2);
  console.log(numbersRolled);
}

var storedWinnings = 0;

function calculatePayout() {
  //debugger;
  var amtWon = 0;
  var diceTotal =
    numbersRolled[0] +
    numbersRolled[1];

  if (diceTotal == 7) {
    removeBets();
  } else {
    switch (diceTotal) {
      case 3:
        if (whatYouBetOn["numberThree"] > 0) {
          amtWon = whatYouBetOn["numberThree"] * 15;
          walletAmt = walletAmt + amtWon;
          break;
        }
      case 4:
        if (whatYouBetOn["numberFour"] > 0) {
          amtWon = Math.floor(whatYouBetOn["numberFour"] * 1.8);
          walletAmt = walletAmt + amtWon;
          break;
        }
      case 5:
        if (whatYouBetOn["numberFive"] > 0) {
          amtWon = Math.floor(whatYouBetOn["numberFive"] * 1.4);
          walletAmt = walletAmt + amtWon;
          break;
        }
      case 6:
        if (whatYouBetOn["numberSix"] > 0) {
          amtWon = Math.floor((whatYouBetOn["numberSix"] * 7) / 6);
          walletAmt = walletAmt + amtWon;
          break;
        }
      case 8:
        if (whatYouBetOn["numberEight"] > 0) {
          amtWon = Math.floor((whatYouBetOn["numberEight"] * 7) / 6);
          walletAmt = walletAmt + amtWon;
          break;
        }
      case 9:
        if (whatYouBetOn["numberNine"] > 0) {
          amtWon = Math.floor(whatYouBetOn["numberNine"] * 1.4);
          walletAmt = walletAmt + amtWon;
          break;
        }
      case 10:
        if (whatYouBetOn["numberTen"] > 0) {
          amtWon = Math.floor(whatYouBetOn["numberTen"] * 1.8);
          walletAmt = walletAmt + amtWon;
          break;
        }
      case 11:
        if (whatYouBetOn["numberEleven"] > 0) {
          amtWon = whatYouBetOn["numberEleven"] * 15;
          walletAmt = walletAmt + amtWon;
          break;
        }
    }

    if (
      numbersRolled[0] ==
      numbersRolled[1]
    ) {
      if (
        whatYouBetOn["numberTwo"] > 0 &&
        numbersRolled[numbersRolled.length - 1] == 1
      ) {
        amtWon = whatYouBetOn["numberTwo"] * 30;
        walletAmt = walletAmt + amtWon;
      } else if (
        whatYouBetOn["hardFour"] > 0 &&
        numbersRolled[numbersRolled.length - 1] == 2
      ) {
        amtWon = whatYouBetOn["hardFour"] * 8;
        walletAmt = walletAmt + amtWon;
      } else if (
        whatYouBetOn["hardSix"] > 0 &&
        numbersRolled[numbersRolled.length - 1] == 3
      ) {
        amtWon = whatYouBetOn["hardSix"] * 10;
        walletAmt = walletAmt + amtWon;
      } else if (
        whatYouBetOn["hardEight"] > 0 &&
        numbersRolled[numbersRolled.length - 1] == 4
      ) {
        amtWon = whatYouBetOn["hardEight"] * 10;
        walletAmt = walletAmt + amtWon;
      } else if (
        whatYouBetOn["hardTen"] > 0 &&
        numbersRolled[numbersRolled.length - 1] == 5
      ) {
        amtWon = whatYouBetOn["hardTen"] * 8;
        walletAmt = walletAmt + amtWon;
      } else if (
        whatYouBetOn["numberTwelve"] > 0 &&
        numbersRolled[numbersRolled.length - 1] == 6
      ) {
        amtWon = whatYouBetOn["numberTwelve"] * 30;
        walletAmt = walletAmt + amtWon;
      }
    }
    debugger;
    prevWonAmt = storedWinnings + amtWon;
    //wonAmtArry.push(amtWon);
    storedWinnings = prevWonAmt;
    // walletAmt = walletAmt + storedWinnings;
    alert("You have won " + amtWon + " on the number " + diceTotal);
    $("#walletAmt").text(walletAmt);
    console.log(storedWinnings);
    numbersRolled.splice(0,2);
  }
}
function removeBets() {
  numbersRolled.splice(0,2);
}
