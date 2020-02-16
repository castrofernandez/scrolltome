/* eslint-disable require-jsdoc */

const getDirection = (previousPosition) => previousPosition - window.scrollY >= 0 ? 'UP' : 'DOWN';

import Observed from './observed';

class Observer {
    constructor() {
        this.subscribers = [];
        this.previousScrollPosition = 0;
    }

    subscribe(data = {}) {
        const obs = new Observed(data);
        this.subscribers.push(obs);
        obs.evaluate(this.direction);
    }

    evaluate() {
        const direction = this.direction;
        this.subscribers.forEach((subscriber) => subscriber.evaluate(direction));
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

window.addEventListener('scroll', () => scrollObserver.onScroll());
