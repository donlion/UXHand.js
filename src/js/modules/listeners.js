//= include listeners/on.js

//= include listeners/off.js

//= include listeners/fireListeners.js

//= include listeners/fireEvent.js

this._listeners = [];

this.listeners = function() {
	return this._listeners;
};
