this._domClasses = function(_data) {


	var count = _data.scores.left+_data.scores.right+_data.scores.both;

	if (!_data || count < this.options().threshold) {
		return;
	}

	console.log("COUNT", count, this.options().threshold);

	console.log(_data.scores.left, _data.scores.right*(1+this.options().certainty));

	if (_data.scores.left > _data.scores.right*(1+this.options().certainty)) {
		UXHand.updateClass('lefthand');
	} else if (_data.scores.right > _data.scores.left*(1+this.options().certainty)) {
		UXHand.updateClass('righthand');
	}

	var average = (_data.scores.right+_data.scores.left)/2;

	if (_data.scores.both > average) {
		UXHand.updateClass('bothhands');
	}

};