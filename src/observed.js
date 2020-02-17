/* eslint-disable require-jsdoc */

import REPEAT from './repeat.options';
import SeenStatus from './seen.status';
import whatsme from 'whatsme';

import {
    isInViewPort,
    getElementData,
    checkRepeatValue,
    areOptionsValid,
} from './utils';

class Observed {
    constructor(element = {}, options = {}) {
        const {inViewPortHandler = () => {}, outOfViewPortHandler, repeat = REPEAT.FIRST_IN} = options;

        this.valid = areOptionsValid(options) && whatsme.isDefined(REPEAT[repeat]);
        checkRepeatValue(repeat);

        this.element = element;
        this.inViewPortHandler = inViewPortHandler;
        this.repeat = repeat;

        this.mustHandleOut = !!outOfViewPortHandler;
        this.outOfViewPortHandler = outOfViewPortHandler || (() => {});

        this.status = new SeenStatus(repeat);
    }

    evaluate(direction) {
        return this.valid ? this.doEvaluate(isInViewPort(this.element), direction) : false;
    }

    doEvaluate(inViewPort, direction) {
        this.update(inViewPort);
        this.check(direction);
    }

    update(inViewPort) {
        this.status.update(inViewPort);
        this.inViewPort = inViewPort;
    }

    check(direction) {
        return this.checkEntering(direction) || this.checkLeaving(direction);
    }

    checkEntering(direction) {
        return this.status.entering ? this.enteringInViewPort(direction) : false;
    }

    checkLeaving(direction) {
        return this.status.leaving ? this.leavingViewPort(direction) : false;
    }

    enteringInViewPort(direction) {
        this.inViewPortHandler(this.getElementData(direction));
        return true;
    }

    leavingViewPort(direction) {
        this.outOfViewPortHandler(this.getElementData(direction));
        return true;
    }

    getElementData(direction) {
        return getElementData(this.element, direction);
    }

    get finished() {
        return !this.valid || this.status.finished;
    }
}

export default Observed;
