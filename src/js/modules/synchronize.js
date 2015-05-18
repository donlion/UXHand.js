this._synchronize = function() {
	console.log("_synchronize");
	var deferred = Q.defer();


	var localData = JSON.parse(localStorage.getItem("UXHandData"));

	if (
		this._data.scores.left == null
		&& this._data.scores.right == null
		&& this._data.scores.both == null
		&& localData
		) {
		this._data = localData;
		deferred.resolve();
	} else {
		localStorage.setItem("UXHandData", JSON.stringify(this._data));
	}


	return deferred.promise;
};