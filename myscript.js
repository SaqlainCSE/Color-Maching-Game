var playerone=prompt('enter player one name u r red?');
var player1color='rgb(244, 65, 65)';
var playertwo=prompt('enter player one name u r blue?');
var player2color='rgb(66, 134, 244)';
//grab elements on table

var start=true;
var table=$('table tr');


function reportWin(rowNum,colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
  }


//toggle color for element
function changeColor(row,col,color){
  return table.eq(row).find('td').eq(col).find('button').css('background-color',color);

}


function returnColor(row,col){
  return table.eq(row).find('td').eq(col).find('button').css('background-color');
}


function checkBottom(col){
  var colorReport=returnColor(5,col);
  for (var row = 5; row > -1; row--) {
    colorReport=returnColor(row,col);
    if (colorReport ==='rgb(128, 128, 128)'){
      return row
    }
  }
}


function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}




function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horizontal');
        reportWin(row,col);
        return true;
      }else {
        break;
      }
    }
  }
}



function verticalWinCheck() {
  for (var row = 0; row < 7; row++) {
    for (var col = 0; col < 3; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        break;
      }
    }
  }
}



function diagonalWinCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diagonal');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diagonal');
        reportWin(row,col);
        return true;
      }else {
        break;
      }
    }
  }
}



var currentPlayer=1;
var currentName=playerone;
var currentColor=player1color;

$('h3').text(playerone+" it is your turn pick sths")

$('.board button').on('click',function(){
  var col=$(this).closest('td').index();

  // Get back bottom available row to change
  var bottomAvail = checkBottom(col);
  console.log(bottomAvail);
  // Drop the chip in that column at the bottomAvail Row
  changeColor(bottomAvail,col,currentColor);

  
  
  // Check for a win or a tie.
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName+" You won (Game Over)")
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }
  currentPlayer = currentPlayer * -1 ;

  if (currentPlayer === 1) {
    currentName = playerone;
    $('h3').text(currentName+": It is your turn, (Blue)");
    currentColor = player1color;
  }else {
    currentName = playertwo;
    $('h3').text(currentName+": It is your turn, (Red)");
    currentColor = player2color;
  }
})