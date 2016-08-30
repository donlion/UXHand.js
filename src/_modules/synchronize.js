this._synchronize = function(callback) {
	console.log("_synchronize");


	var localData = JSON.parse(localStorage.getItem("UXHandData"));

	if (
		this._data.scores.left == null
		&& this._data.scores.right == null
		&& this._data.scores.both == null
		&& localData
		) {
		

		if (localData.current) {
			this.updateClass(localData.current);
		}

		this._data = localData;

	} else {
		localStorage.setItem("UXHandData", JSON.stringify(this._data));
	}

	if (callback) {
		callback();
	}
};