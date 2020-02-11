var numSquares = 6;
var colors = [];
var pickedColor;
var h1 = document.querySelector('h1');
var squares = document.querySelectorAll('.square');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');


init();

function init(){
	// event listeners for mode buttons
	setUpModeButtons();
	setUpSquares();
	reset();
}


function setUpModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener('click', function(){
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === 'Easy' ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener('click', function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!';
				resetButton.textContent = 'Play Again?';
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = 'Try Again!';
			}
		});
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	// pick a new random color
	pickedColor = pickColor();
	// change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = 'New Colors';
	messageDisplay.textContent = '';
	// change color of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = 'block';
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = 'none'; 
		}
	}
	h1.style.backgroundColor = 'steelblue';
}

resetButton.addEventListener('click', function(){
	reset();
});

function changeColors(color){
	// loop through all square 
	// change each color to match given color string
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	// pick a random number within the range of
	// indices in the color array
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// make an array
	var arr = [];
	// add num random colors to the array
	for(var i = 0; i < num; i++){
		// get random color and push into arr
		arr.push(randomColor());
	}
	// return array
	return arr;
}

function randomColor(){
	// pick an R, a G, and a B {0 - 255}
	var r = Math.floor(Math.random() * 256);	// generates num from 0 to 255
	var g = Math.floor(Math.random() * 256);	// generates num from 0 to 255
	var b = Math.floor(Math.random() * 256);	// generates num from 0 to 255
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}