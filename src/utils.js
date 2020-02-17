import setupme from 'setupme';
import REPEAT from './repeat.options';

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

export {
    isInViewPort,
    getElementData,
    checkRepeatValue,
    areOptionsValid,
};
