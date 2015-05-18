this.cycle = function() {
	console.info("cycle");

	this._calc();

	var _data = this._data;

	this._domClasses(_data);

	this._synchronize();

};