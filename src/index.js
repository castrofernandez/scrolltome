'use strict';

import scrollObserver from './observer';

const scrolltome = {
    subscribe: (data = {}) => scrollObserver.subscribe(data),
};

export default scrolltome;

if (window && typeof window === 'object') {
    window['scrolltome'] = scrolltome;
}
