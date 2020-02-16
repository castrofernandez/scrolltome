/* eslint-disable require-jsdoc */
import setupme from 'setupme';
import REPEAT from './repeat.options';
import SeenStatus from './seen.status';

const LOG_NAME = 'scrolltome';

const DEFAULT_OPTIONS = {
    element: {},
    inViewPortHandler: () => {},
    outOfViewPortHandler: () => {},
    repeat: REPEAT.FIRST_IN,
};

const getViewPortHeight = () => window.innerHeight || document.documentElement.clientHeight;

const checkLocation = ({top, bottom}) => (top > 0 || bottom > 0) && top < getViewPortHeight();

const getRect = (element) => element.getBoundingClientRect();

const getData = ({top, bottom}) => ({top, bottom});

const isInViewPort = (element = {}) => checkLocation(getRect(element));

const getElementData = (el, direction) => ({
    ...getData(getRect(el)),
    direction,
});

const getValidRepeats = () => Object.keys(REPEAT).join(', ');

const checkRepeatValue = (repeat) => REPEAT[repeat] ?
    true :
    console.error(`[${LOG_NAME}] option "${repeat}" is not valid. "repeat" options are: ${getValidRepeats()}.`);

const areOptionsValid = (options) => setupme.validate(DEFAULT_OPTIONS, options, {logName: LOG_NAME}).success;

class Observed {
    constructor(options = {}) {
        const {element = {}, inViewPortHandler = () => {}, outOfViewPortHandler, repeat = REPEAT.FIRST_IN} = options;

        this.valid = areOptionsValid(options) && REPEAT[repeat];
        checkRepeatValue(repeat);

        this.element = element;
        this.inViewPortHandler = inViewPortHandler;
        this.repeat = repeat;

        this.mustHandleOut = !!outOfViewPortHandler;
        this.outOfViewPortHandler = outOfViewPortHandler || (() => {});

        this.inViewPort = false;

        this.status = new SeenStatus();
    }

    evaluate(direction) {
        return this.valid ? this.doEvaluate(isInViewPort(this.element), direction) : false;
    }

    doEvaluate(inViewPort, direction) {
        this.check(inViewPort, direction);
        this.update(inViewPort);
    }

    update(inViewPort) {
        this.status.update(inViewPort);
        this.inViewPort = inViewPort;
    }

    check(inViewPort, direction) {
        return (
            this.checkEntering(inViewPort, direction) ||
            this.checkLeaving(inViewPort, direction)
        );
    }

    checkEntering(inViewPort, direction) {
        return inViewPort && !this.inViewPort ? this.isEnteringInViewPort(direction) : false;
    }

    checkLeaving(inViewPort, direction) {
        return !inViewPort && this.inViewPort ? this.isLeavingViewPort(direction) : false;
    }

    isEnteringInViewPort(direction) {
        this.inViewPortHandler(this.getElementData(direction));
        return true;
    }

    isLeavingViewPort(direction) {
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
