import {
    iOSTest,
    localStorageTest,
    touchTest
} from './modules/getters/featureTests';


class UXHand {
    constructor(options={}) {
        if (!localStorageTest()) {
            console.info("Not compatible with localStorage");
            return;
        }
        if (!touchTest()) {
            console.info("Not compatible with touch");
            return;
        }

        let defaultConfig = {
            certainty: 0.2,
            cycleDelay: 20000,
            destroyClasses: true,
            destroyData: true,
            root: document.body,
            threshold: 50,
            sessionThreshold: 10
        };

        this._config = Object.assign({}, defaultConfig, options);

        this._session = {
            hand: null,
            count: 0,
            threshold: this._config.sessionThreshold
        };
    }


    get isIOS() {
        return iOSTest();
    }


}

module.exports = {
    UXHand: UXHand
};
