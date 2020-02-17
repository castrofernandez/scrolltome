/* eslint-disable require-jsdoc */

const getDirection = (previousPosition) => previousPosition - window.scrollY >= 0 ? 'UP' : 'DOWN';

import Observed from './observed';

const evaluateSubscribers = (subscribers = [], direction) => subscribers.forEach((item) => item.evaluate(direction));

const filterFinished = (subscribers = []) => subscribers.filter(({finished}) => !finished);

class Observer {
    constructor() {
        this.subscribers = [];
        this.previousScrollPosition = 0;
    }

    subscribe(element = {}, data = {}) {
        const obs = new Observed(element, data);
        this.subscribers.push(obs);
        obs.evaluate(this.direction);
    }

    evaluate() {
        evaluateSubscribers(this.subscribers, this.direction);
        this.subscribers = filterFinished(this.subscribers);
    }

    onScroll() {
        this.evaluate();
        this.previousScrollPosition = window.scrollY;
    }

    get direction() {
        return getDirection(this.previousScrollPosition);
    }
}

const scrollObserver = new Observer();

export default scrollObserver;
