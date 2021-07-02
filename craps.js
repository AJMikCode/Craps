var walletAmt = 500;
var playerBetAmt = 0;
var chip1 = 1;
var chip5 = 5;
var chip25 = 25;
var chip100 = 100;
var chip500 = 500;
var chip1000 = 1000;

var whatYouBetOn = {
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

$(document).ready(function () {
  $("#walletAmt").text(walletAmt);
  $("#playerBetAmt").text(playerBetAmt);
});

function setBet(chipAmt) {
$('#plusButton').click(function() {
  if (chipAmt + playerBetAmt <= walletAmt) {
    playerBetAmt = playerBetAmt + chipAmt;
    $("#playerBetAmt").text(playerBetAmt);
  } else {
    alert("You can't bet more than the money you have!");
  }
})
}

function placeBet(numberClickedOn) {
  debugger;
  if(playerBetAmt <= walletAmt) {
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
  } else{
      alert("You have nore more money, please subtract your bet from the current number or Roll the Dice!")
  }

}
