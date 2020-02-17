'use strict';

import scrollObserver from './scroll.observer';

const scrolltome = {
    subscribe: (element = {}, data = {}) => scrollObserver.subscribe(element, data),
};

export default scrolltome;

if (window && typeof window === 'object') {
    window['scrolltome'] = scrolltome;
}

window.addEventListener('scroll', () => scrollObserver.onScroll());
