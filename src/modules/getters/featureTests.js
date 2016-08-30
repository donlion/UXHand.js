/**
 * iOSTest
 * @returns {boolean}
 */
export const iOSTest = () => {
    let userAgent = window.navigator.userAgent;
    return userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
};

/**
 * localStorageTest
 * @returns {boolean}
 */
export const localStorageTest = () => {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
};

/**
 * touchTest
 * @returns {boolean}
 */
export const touchTest = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};