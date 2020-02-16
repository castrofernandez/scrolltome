/* eslint-disable require-jsdoc */

import REPEAT from './repeat.options';

const REPEAT_FINISHED_HANDLER = {
    FIRST_IN: (seen, hidden) => seen,
    FIRST_OUT: (seen, hidden) => hidden,
    FIRST_IN_AND_OUT: (seen, hidden) => seen && hidden,
    KEEP: (seen, hidden) => false,
};

const getHandler = (repeat) => REPEAT_FINISHED_HANDLER[repeat] || (() => false);

class SeenStatus {
    constructor(repeat = REPEAT.FIRST_IN) {
        this.repeat = repeat;
        this.hasBeenSeen = false;
        this.hasBeenHidden = false;
    }

    update(inViewPort = false) {
        this.hasBeenSeen = this.hasBeenSeen || inViewPort;
        this.hasBeenHidden = this.hasBeenHidden || !inViewPort;
    }

    get finished() {
        return getHandler(this.repeat)(this.hasBeenSeen, this.hasBeenHidden);
    }
}

export default SeenStatus;
