this.drag = function() {

	var touch = _this.touch;

	var vectors = [
		{
			y: touch.start.touches[0].clientY,
			x: touch.start.touches[0].clientX
		},
		{
			y: touch.end.changedTouches[0].clientY,
			x: touch.end.changedTouches[0].clientX
		}
	];

	var directionY = function() {
		if (vectors[0].y > vectors[1].y) { //greater than, because the browser calculates from top left
			$("#textfield").prepend("it's upwards<br />");
			return "up";

		} else if (vectors[0].y == vectors[1].y) {
			$("#textfield").prepend("it's horizontal<br />");
			return "none";

		} else {
			$("#textfield").prepend("it's downwards<br />");
			return "down";

		}
	};

	var directionX = function() {
		if (vectors[0].x < vectors[1].x) { //greater than, because the browser calculates from top left
			$("#textfield").prepend("it's rightwards<br />");
			return "right";

		} else if (vectors[0].x == vectors[1].x) {
			$("#textfield").prepend("it's vertical<br />");
			return "none";

		} else {
			$("#textfield").prepend("it's leftwards<br />");
			return "left";

		}
	};

	// directionY();
	// directionX();


	_this.createTouch({
		type: "drag",
		directionX: directionX(),
		directionY: directionY(),
		distance: 0,
		hand: "none",
		score: 0
	});

};