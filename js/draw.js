var drawModule = (function() {
	var bodySnake = function (x, y) {
		// This is the single square
		ctx.fillStyle = '#2ecc71';
		ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);

	}

	var pizza = function(x, y) {
		//This is the border of the pizza
		ctx.fillStyle = '#e74c3c';
		ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
	}

	var scoreText = function() {
		//How many pizzas did the snake ate
		var score_text = "Score: " + score;
		ctx.fillStyle = '#2980b9';
		ctx.fillText(score_text, 145, h-5);
	}

	var drawSnake = function() {
		// Initially the body of the snake wil be formed by 5 squares
		var length = 4;
		snake = [];

		// Using a "For" loop we push the 5 elements inside the array (squares)
		// Every element will have x = 0 and the y will take the value of the index

		for (var i = length; i >= 0; i--) {
			snake.push({x:i, y:0});
		}
	}


	var createFood = function() {
		food = {
			// Generate random numbers
			x: Math.floor((Math.random() * 30) + 1),
			y: Math.floor((Math.random() * 30) + 1)
		}

		//Look at the position of the snake's body
		for (var i=0; i>snake.length; i++) {
			var snakeX = snake[i].x;
			var snakeY = snake[i].y;

			if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
				food.x = Math.floor((Math.random() * 30) + 1);
				food.y = Math.floor((Math.random() * 30) + 1);
			}
		}
	}

	var checkCollision = function(x, y, array) {
		for(var i = 0; i < array.length; i++){
			if (array[i].x === x && array[i].y === y) {
				return true;
			}
		}
		return false;
	}

	var paint = function() {
		//Let's draw the space in wich the snake will move
		ctx.fillStyle = '#C9E8E8';
		ctx.fillRect(0, 0, w, h);

		//Give it a border 
		ctx.strokeStyle = '#ecf0f1';
		ctx.strokeRect(0, 0, w, h);

		// Disable start button while you're playing
		btn.setAttribute('disabled', true);

		var snakeX = snake[0].x;
		var snakeY = snake[0].y;

		/*
		Make the snake move.
		Use a variable ('direction') to control the movement.
		To move the snake, pop out the last element of the array and shift it on the top as first element.
		*/

		if (direction == 'right') {
			snakeX ++;
		} else if (direction == 'left') {
			snakeX --;
		} else if (direction == 'up') {
			snakeY --;
		} else if (direction == 'down') {
			snakeY ++;
		}

		/* If the snake touches the canvas border or itself, it will die.
		Therefore if x or y of an element of the snake don't fit inside the canvas, the game will be stopped.
		If the checkCollision is true, it means that the snake has crashed on its body itself, then the game will be stopped.
		*/
		if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
			//Stop the game

			//Make the start button enable again
			btn.removeAttribute('disabled', true);

			//Clean up the canvas
			ctx.clearRect(0, 0, w, h);
			gameloop = clearInterval(gameloop);
			return;
		}

		// If the snake eats the food it becomes longer and this means that, in this case, you shouldn't pop out the last element of the array
		if (snakeX == food.x && snakeY == food.y) {
			//Create a new square instead of moving the tail
			var tail = {
				x: snakeX,
				y: snakeY
			};
			score++;

			//Create new food
			createFood();
		} else {

			//Pop out the last cell
			var tail = snake.pop();
			tail.x = snakeX;
			tail.y = snakeY;
		}

		// Puts the tail as the first cell
		snake.unshift(tail);

		// For each element of the array create a square using the bodySnake function we created before
		for (var i = 0; i < snake.length; i++) {
			bodySnake(snake[i].x, snake[i].y);
		}

		// Create food using the pizza function

		pizza(food.x, food.y);

		// Put the score text

		scoreText();
		}

	var init = function() {
		direction = 'down';
		drawSnake();
		createFood();
		gameloop = setInterval(paint, 80);
	}

	//You need to return only the init function at the end of the Module

	return {
		init: init
	};


	//Close the module

}());



















