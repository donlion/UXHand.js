this._calc = function() {

	if (!this._last) {
		return;
	}

	var _last = this._last;

	var output = [];


	// var vectors = [
	// 	{
	// 		y: _last.start.touches[0].clientY,
	// 		x: _last.start.touches[0].clientX
	// 	},
	// 	{
	// 		y: _last.end[0].clientY,
	// 		x: _last.end[0].clientX
	// 	}
	// ];


	var vectors = [
		{
			// y: _last.start.pageY,
			// x: _last.start.pageX
			y: _last.start.touches[0].clientY,
			x: _last.start.touches[0].clientX
		},
		{
			y: _last.end[0].clientY,
			x: _last.end[0].clientX
		}
	];

	console.log(vectors);


	var drag = function(output) {


		/*
		Measure direction Y
		*/
		if (vectors[0].y > vectors[1].y) {
			//greater than, because the browser calculates from top left
			output.push("up");
		} else if (vectors[0].y == vectors[1].y) {
			output.push("horizontal");
		} else {
			output.push("down");
		}

		console.log(UXHand.isIOS());

		if (UXHand.isIOS()) {
			if (vectors[0].x < vectors[1].x) { //greater than, because iOS calculates from top right
				output.push("left");
			} else if (vectors[0].x == vectors[1].x) {
				output.push("vertical");
			} else {
				output.push("right");
			}
		} else {
			/*
			Measure direction X
			*/
			if (vectors[0].x < vectors[1].x) { //greater than, because the browser calculates from top left
				output.push("right");
			} else if (vectors[0].x == vectors[1].x) {
				output.push("vertical");
			} else {
				output.push("left");
			}

		}


		handSize(vectors[0], vectors[1]);

	};




	var tap = function(output) {

		if (vectors[0].x < area.w) {
			console.log("Left hand");
			UXHand._data.scores.left++;
		} else if (vectors[0].x > area.w+area.x) {
			console.log("Right hand");
			UXHand._data.scores.right++;
		}

	};


	/*
	Handsize measurement in progress
	*/


	var handSize = function() {
		return;
	};

	// var handSize = function(vOne, vTwo) {

	// 	function aScreen() {
	// 		var lowerY = vOne.y > vTwo.y ? vTwo : vOne,
	// 				biggerY = vOne.y > vTwo.y ? vOne : vTwo;

	// 		var lowerX = vOne.x > vTwo.x ? vTwo : vOne,
	// 				biggerX = vOne.x > vTwo.x ? vOne : vTwo;

	// 		console.log("Y", lowerY, biggerY);

	// 		var aScreen = {
	// 			width: biggerX.x - lowerX.x,
	// 			height: biggerY.y - lowerY.y,
	// 			offset: {
	// 				x: lowerX.x,
	// 				y: lowerY.y
	// 			}
	// 		};

	// 		aScreen.ratio = aScreen.height/aScreen.width;

	// 		return aScreen;
	// 	};


	// 	function createExample() {

	// 		var settings = aScreen();

	// 		var element = document.createElement('DIV');
	// 		element.style.height = settings.height+"px";
	// 		element.style.width = settings.width+"px";
	// 		element.style.position = 'fixed';
	// 		element.style.bottom = settings.offset.y+"px";
	// 		element.style.left = settings.offset.x+"px";
	// 		element.style.backgroundColor = "rgba(0,0,0,0.2)";

	// 		console.log(settings);

	// 		document.body.appendChild(element);

	// 	};

	// 	console.log('artificialScreen', aScreen());
	// 	console.log(vOne, vTwo);

	// 	createExample();

	// };





	var area = this.wireFrame.areas();





	if (_last.moved) {
		output.push("Move detected");

		drag(output);
	} else {
		output.push("Touch detected");

		tap(output);
	}

	console.log(output.join(", "));

	if (output.indexOf("vertical") > -1) {
		if (vectors[0].x < area.w) {
			console.log("Left hand");
			this._data.scores.left++;
		} else if (vectors[0].x > area.w+area.x) {
			console.log("Right hand");
			this._data.scores.right++;
		}
	} else {

		console.log("_last", _last);

		var measurePath = {
			left: 0,
			right : 0
		};

		[].forEach.call(_last.drag, function(drag, index) {
			// var dragData = _last.drag[index].touches[0];
			var position = _last.drag[index];

			// var position = {
			// 	x: dragData.clientX,
			// 	y: dragData.clientY
			// };

			if (_last.drag[index+1]) {

				// var nextDragData = _last.drag[index+1].touches[0];
				var nextPosition = _last.drag[index+1];

				// var nextPosition = {
				// 	x: nextDragData.clientX,
				// 	y: nextDragData.clientY
				// };


				if (
					nextPosition.x > position.x
					&& nextPosition.y < position.y
					) {
					measurePath.right++;
				} else if (
					nextPosition.x < position.x 
					&& nextPosition.y < position.y
					) {
					measurePath.left++;
				} else if (
					nextPosition.x > position.x
					&& nextPosition.y > position.y
					) {
					measurePath.left++;
				} else if (
					nextPosition.x < position.x
					&& nextPosition.y > position.y
					) {
					measurePath.right++;
				}


			}

		});

		if (measurePath.left > measurePath.right) {
			console.error("LEFT");
			UXHand._data.scores.left++;
		} else if (measurePath.right > measurePath.left) {
			console.error("RIGHT");
			UXHand._data.scores.right++;
		}



	}


};