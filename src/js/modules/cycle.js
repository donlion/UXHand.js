this.cycle = function() {
	console.info("cycle");

	try {
		this._calc();
	} catch(e) {
		console.log("No touches to calculate");
	} finally {
		var _data = this._data;

		this._domClasses(_data);

		this._synchronize();

		this._last.move = false;
		this._last.drag = [];
	}

};