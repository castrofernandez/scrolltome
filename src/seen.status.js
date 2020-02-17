/* eslint-disable require-jsdoc */

import REPEAT from './repeat.options';
import whatsme from 'whatsme';

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
        this.inViewPort = null;
    }

    update(inViewPort = false) {
        this.hasBeenSeen = this.hasBeenSeen || inViewPort;
        this.hasBeenHidden = this.hasBeenHidden || !inViewPort;
        this.checkEntering(inViewPort);
        this.checkLeaving(inViewPort);
        this.inViewPort = inViewPort;
    }

    get finished() {
        return getHandler(this.repeat)(this.hasBeenSeen, this.hasBeenHidden);
    }

    checkEntering(inViewPort) {
        this.entering = inViewPort && !this.inViewPort;
    }

    checkLeaving(inViewPort) {
        this.leaving = !inViewPort && (this.inViewPort || whatsme.isNull(this.inViewPort));
    }
}

export default SeenStatus;
