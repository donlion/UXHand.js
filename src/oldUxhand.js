
var UXHand = new function() {

    this.isIOS = function() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
    };


    //= include _modules/synchronize.js
    //= include _modules/compatibility.js
    //= include _modules/options.js
    //= include _modules/cycle.js
    //= include _modules/setupListeners.js
    //= include _modules/events.js
    //= include _modules/calc.js
    //= include _modules/session.js
    //= include _modules/domclasses.js
    //= include _modules/destroy.js
    //= include _modules/wireFrame.js
    //= include _modules/updateClass.js

    //= include _modules/listeners.js


    this.version = '0.4';

    this.init = function() {
        console.log("init");


        if (!this.compatibility()) {
            console.info("Not compatible with localStorage");
            return;
        }
        if (!this.touchTest()) {
            console.info("Not compatible with touch");
            return;
        }

        this._synchronize(function() {
            console.log("_synchronize.then");

            UXHand._setupListeners();
            UXHand.cycle();
        });


    };


    this._session = {
        hand: null,
        count: 0,
        threshold: this.options().sessionThreshold
    };

    this._data = {
        'scores': {
            left: null,
            right : null,
            both: null
        },
        'current': null
    };


    this._last = {
        start: null,
        end: null,
        drag: [],
        moved: false
    };


    this.tracking = [];


};


/*
 UXHand.init();*/
