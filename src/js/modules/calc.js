this._calc = function() {

	if (!this._last) {
		return;
	}

	var _last = this._last;

	var output = [];


	var vectors = [
		{
			y: _last.start.touches[0].clientY,
			x: _last.start.touches[0].clientX
		},
		{
			y: _last.end[0].clientY,
			x: _last.end[0].clientX
		}
	];



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
			output.push("downw");
		}


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
	}


};