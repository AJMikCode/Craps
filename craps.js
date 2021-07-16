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
  for (let y in whatYouBetOn) {
    var allNumsDeactivate = "#betOn" + y;
    $(allNumsDeactivate).prop("disabled", true);
  }
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

// Part 1 of adding chip amount to the numbers themselves by using prompt field and storing into dictionary
// var names need to be changed
function typeBet(fieldClickedOn) {
  if (playerBetAmt <= walletAmt) {
    var typeValue = prompt(
      "Please Type in The Amount youd Like for us to put on this number"
    );
    debugger;
    var cnvrtStrToInt = parseInt(typeValue);
    var convertIdToString = fieldClickedOn.toString();
    var combineStrToId = "#" + convertIdToString;

    whatYouBetOn[fieldClickedOn] = cnvrtStrToInt + whatYouBetOn[fieldClickedOn];
    $(combineStrToId).text(whatYouBetOn[fieldClickedOn]);

    walletAmt = 500;
    walletAmt = walletAmt - whatYouBetOn[fieldClickedOn];
    $("#walletAmt").text(walletAmt);
    console.log("wallet amt", walletAmt);
  } else {
    alert(
      "You have nore more money, please subtract your bet from the current number or Roll the Dice!"
    );
  }
}

// Part 2 of adding chip amount but instead by clicking on chips and adding amount by clicking on chip Amount and a number itself instead of typing
// Better names of var no need ot be changed
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

// Generate Two Dice when Roll Dice button is clicked.
// Both dice variables stored separately
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


function changeNumToName(num) {
  debugger;
  if(num == 4) {
    num = "numberFour"
    var deactivateOriginalNum = "#betOn" + num;
    $(deactivateOriginalNum).prop("disabled", true)
    walletAmt = whatYouBetOn.numberFour + walletAmt;

  } else if(num == 5) {
    num = "numberFive"
    var deactivateOriginalNum = "#betOn" + num;
    $(deactivateOriginalNum).prop("disabled", true)
  } else if(num == 6) {
    num = "numberSix"
    var deactivateOriginalNum = "#betOn" + num;
    $(deactivateOriginalNum).prop("disabled", true)
  } else if(num == 8) {
    num = "numberEight"
    var deactivateOriginalNum = "#betOn" + num;
    $(deactivateOriginalNum).prop("disabled", true)
  } else if(num == 9) {
    num = "numberNine"
    var deactivateOriginalNum = "#betOn" + num;
    $(deactivateOriginalNum).prop("disabled", true)
  } else if(num == 10) {
    num = "numberTen"
    var deactivateOriginalNum = "#betOn" + num;
    $(deactivateOriginalNum).prop("disabled", true);
  } 
  walletAmt = walletAmt + whatYouBetOn[num];
  var selectedNum = "#" + num;
  whatYouBetOn[num] = 0;
  $("#walletAmt").text(walletAmt);
  $(selectedNum).text(0);
}

//Sets a Number if it ranges from(4,5,6,8,9,10), Pays 1-1 on Pass Line for(7,11), If money on 2,3,11,12 preSet, still paid out 
 var comeOutNumber = undefined;
 function setNumber() {
   debugger;
   console.log(isNaN(comeOutNumber));
   if (isNaN(comeOutNumber) == true) {
     comeOutNumber = numbersRolled[0] + numbersRolled[1];
     console.log(comeOutNumber);

     if (comeOutNumber == 7) {
       walletAmt = whatYouBetOn.passLineAmt + walletAmt;
       $("#walletAmt").text(walletAmt);
       oneTimeBets(comeOutNumber);
       numbersRolled.splice(0, 2);
       comeOutNumber = undefined;
     } else if (comeOutNumber == 11) {
       walletAmt = whatYouBetOn.passLineAmt + walletAmt;
       calculatePayout();
       oneTimeBets(comeOutNumber);
       $("#walletAmt").text(walletAmt);
       numbersRolled.splice(0, 2);
       comeOutNumber = undefined;
     } else if (comeOutNumber == 2 || comeOutNumber == 3 || comeOutNumber == 12) {
       calculatePayout();
       oneTimeBets(comeOutNumber);
       $("#walletAmt").text(walletAmt);
       numbersRolled.splice(0, 2);
       comeOutNumber = undefined;
     } else {
       for (let x in whatYouBetOn) {
         var allNumsActive = "#betOn" + x;
         $(allNumsActive).prop("disabled", false);
       }
       changeNumToName(comeOutNumber);
       numbersRolled.splice(0, 2);
       oneTimeBets(comeOutNumber);
     }
   } else {
     if(comeOutNumber == numbersRolled[0] + numbersRolled[1]) {
      walletAmt = whatYouBetOn.passLineAmt + walletAmt;
      for (let x in whatYouBetOn) {
        var allNumsActive = "#betOn" + x;
        $(allNumsActive).prop("disabled", true);
      }
      comeOutNumber = undefined;
     }
     calculatePayout();
     //oneTimeBets(numbersRolled[0] + numbersRolled[1]);
   }
 }

// Part 3 of Craps Game calculating Payout and storing payout
//First part will Set Function to check hardways by only using one switch caser instead of both as shown on bottom.
var storedWinnings = 0;
// function checkIfNumberBetOn(numberBetOn) {
//   if(whatYouBetOn[numberBetOn]) {
//     return amtWon;
//   }
// }

//Check Hardways within one switch statement
function checkHardWays() {
  debugger;
  if (numbersRolled[0] == numbersRolled[1]) {
    switch (numbersRolled[0]) {
      case 2:
        if (whatYouBetOn["hardFour"] > 0) {
          amtWon = whatYouBetOn["hardFour"] * 8;
          walletAmt = walletAmt + amtWon;
          alert("You have won " + amtWon + " on hard Four!");
          return true;
        }
      case 3:
        if (whatYouBetOn["hardSix"] > 0) {
          amtWon = whatYouBetOn["hardSix"] * 10;
          walletAmt = walletAmt + amtWon;
          alert("You have won " + amtWon + " on hard Six!");
          return true;
        }
      case 4:
        if (whatYouBetOn["hardEight"] > 0) {
          amtWon = whatYouBetOn["hardEight"] * 10;
          walletAmt = walletAmt + amtWon;
          alert("You have won " + amtWon + " on hard Eight!");
          return true;
        }
      case 5:
        if (whatYouBetOn["hardTen"] > 0) {
          amtWon = whatYouBetOn["hardTen"] * 8;
          walletAmt = walletAmt + amtWon;
          alert("You have won " + amtWon + " on hard Ten!");
          return true;
        }
    }
  } else {
    return false;
  }
}

//Removes The One Roll Bets unless they're the number
function oneTimeBets(wonOnOneTimeBetNum) {
  if (wonOnOneTimeBetNum == 2) {
    whatYouBetOn.numberThree = 0;
    $("#numberThree").text(0);
    whatYouBetOn.numberEleven = 0;
    $("#numberEleven").text(0);
    whatYouBetOn.numberTwelve = 0;
    $("#numberTwelve").text(0);
  } 
  
  else if (wonOnOneTimeBetNum == 3) {
    whatYouBetOn.numberTwo = 0;
    $("#numberTwo").text(0);
    whatYouBetOn.numberEleven = 0;
    $("#numberEleven").text(0);
    whatYouBetOn.numberTwelve = 0;
    $("#numberTwelve").text(0);
  } 
  
  else if (wonOnOneTimeBetNum == 11) {
    whatYouBetOn.numberTwo = 0;
    $("#numberTwo").text(0);
    whatYouBetOn.numberThree = 0;
    $("#numberThree").text(0);
    whatYouBetOn.numberTwelve = 0;
    $("#numberTwelve").text(0);
  } 
  
  else if (wonOnOneTimeBetNum == 12) {
    whatYouBetOn.numberTwo = 0;
    $("#numberTwo").text(0);
    whatYouBetOn.numberThree = 0;
    $("#numberThree").text(0);
    whatYouBetOn.numberEleven = 0;
    $("#numberEleven").text(0);
  }

  else {
    whatYouBetOn.numberTwo = 0;
    $("#numberTwo").text(0);
    whatYouBetOn.numberThree = 0;
    $("#numberThree").text(0);
    whatYouBetOn.numberEleven = 0;
    $("#numberEleven").text(0);
    whatYouBetOn.numberTwelve = 0;
    $("#numberTwelve").text(0);
  }
}

function removeBets() {
  debugger;
  numbersRolled.splice(0, 2);
  for (let k in whatYouBetOn) {
    whatYouBetOn[k] = 0;
    console.log(whatYouBetOn[k]);
    var numBetOnRemoved = "#" + k;
    $(numBetOnRemoved).text(0);
  }

  for (let y in whatYouBetOn) {
    var allNumsDeactivate = "#betOn" + y;
    $(allNumsDeactivate).prop("disabled", true);
  }
  $("#rollDice").prop("disabled", true);
  comeOutNumber = undefined;
}

function calculatePayout() {
  debugger;
  var amtWon = 0;
  var diceTotal = numbersRolled[0] + numbersRolled[1];

  if (diceTotal == 7) {
    removeBets();
  } else {
    switch (diceTotal) {
      case 2:
        if (whatYouBetOn["numberTwo"] > 0) {
          amtWon = whatYouBetOn["numberTwo"] * 15;
          walletAmt = walletAmt + amtWon;
        }
        break;
      case 3:
        if (whatYouBetOn["numberThree"] > 0) {
          amtWon = whatYouBetOn["numberThree"] * 15;
          walletAmt = walletAmt + amtWon;
        }
        break;
      case 4:
        if (checkHardWays() == false) {
          removeSingularBet("hardFour");
        }
        if (whatYouBetOn["numberFour"] > 0) {
          amtWon = Math.floor(whatYouBetOn["numberFour"] * 1.8);
          walletAmt = walletAmt + amtWon;
        }
        oneTimeBets();
        break;
      case 5:
        if (whatYouBetOn["numberFive"] > 0) {
          amtWon = Math.floor(whatYouBetOn["numberFive"] * 1.4);
          walletAmt = walletAmt + amtWon;
        }
        oneTimeBets();
        break;
      case 6:
        if (checkHardWays() == false) {
          removeSingularBet("hardSix");
        }
        if (whatYouBetOn["numberSix"] > 0) {
          amtWon = Math.floor((whatYouBetOn["numberSix"] * 7) / 6);
          walletAmt = walletAmt + amtWon;
        }
        oneTimeBets();
        break;
      case 8:
        if (checkHardWays() == false) {
          removeSingularBet("hardEight");
        }
        if (whatYouBetOn["numberEight"] > 0) {
          amtWon = Math.floor((whatYouBetOn["numberEight"] * 7) / 6);
          walletAmt = walletAmt + amtWon;
        }
        oneTimeBets();
        break;
      case 9:
        if (whatYouBetOn["numberNine"] > 0) {
          amtWon = Math.floor(whatYouBetOn["numberNine"] * 1.4);
          walletAmt = walletAmt + amtWon;
        }
        oneTimeBets();
        break;
      case 10:
        if (checkHardWays() == false) {
          removeSingularBet("hardTen");
        }
        if (whatYouBetOn["numberTen"] > 0) {
          amtWon = Math.floor(whatYouBetOn["numberTen"] * 1.8);
          walletAmt = walletAmt + amtWon;
        }
        oneTimeBets();
        break;
      case 11:
        if (whatYouBetOn["numberEleven"] > 0) {
          amtWon = whatYouBetOn["numberEleven"] * 15;
          walletAmt = walletAmt + amtWon;
        }
        break;
      case 12:
        if (whatYouBetOn["numberTwelve"] > 0) {
          amtWon = whatYouBetOn["numberTwelve"] * 30;
          walletAmt = walletAmt + amtWon;
        }
        break;
    }

    //debugger;
    prevWonAmt = storedWinnings + amtWon;
    //wonAmtArry.push(amtWon);
    storedWinnings = prevWonAmt;
    // walletAmt = walletAmt + storedWinnings;
    alert("You have won " + amtWon + " on the number " + diceTotal);
    $("#walletAmt").text(walletAmt);
    console.log(storedWinnings);
    numbersRolled.splice(0, 2);
  }
}

function removeSingularBet(numBetOn) {
  debugger;
  whatYouBetOn[numBetOn] = 0;
  var numBetOnId = "#" + numBetOn;
  $(numBetOnId).text(0);
}
