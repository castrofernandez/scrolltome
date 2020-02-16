'use strict';

import SeenStatus from '../src/seen.status';
import {expect} from 'chai';

describe('seen.status', () => {
    it('empty is FIRST_IN', () => {
        const status = new SeenStatus();
        status.update(true);
        expect(status.finished).to.be.true;
    });

    it('FIRST_IN seen', () => {
        const status = new SeenStatus('FIRST_IN');
        status.update(true);
        expect(status.finished).to.be.true;
    });

    it('FIRST_IN not seen', () => {
        const status = new SeenStatus('FIRST_IN');
        status.update(false);
        expect(status.finished).to.be.false;
    });

    it('FIRST_OUT seen', () => {
        const status = new SeenStatus('FIRST_OUT');
        status.update(true);
        expect(status.finished).to.be.false;
    });

    it('FIRST_OUT not seen', () => {
        const status = new SeenStatus('FIRST_OUT');
        status.update(false);
        expect(status.finished).to.be.true;
    });

    it('FIRST_OUT seen and hidden', () => {
        const status = new SeenStatus('FIRST_OUT');
        status.update(true);
        status.update(false);
        expect(status.finished).to.be.true;
    });

    it('FIRST_IN_AND_OUT seen', () => {
        const status = new SeenStatus('FIRST_IN_AND_OUT');
        status.update(true);
        expect(status.finished).to.be.false;
    });

    it('FIRST_IN_AND_OUT seen and hidden', () => {
        const status = new SeenStatus('FIRST_IN_AND_OUT');
        status.update(true);
        status.update(false);
        expect(status.finished).to.be.true;
    });

    it('KEEP seen', () => {
        const status = new SeenStatus('KEEP');
        status.update(true);
        expect(status.finished).to.be.false;
    });

    it('KEEP not seen', () => {
        const status = new SeenStatus('KEEP');
        status.update(false);
        expect(status.finished).to.be.false;
    });
});
