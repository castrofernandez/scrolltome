'use strict';

import ScrollObserver from '../src/scroll.observer';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const VIEWPORT_HEIGHT = 800;
const window = {height: undefined};

describe('scroll.observer', () => {
    beforeEach(() => {
        beforeEach(() => sinon.stub(window, 'height').returns(VIEWPORT_HEIGHT));
    });

    afterEach(() => sinon.restore());

    it('FIRST_IN in viewport', () => {
        const inViewPortHandler = sinon.spy();
        const outOfViewPortHandler = sinon.spy();
        const element = {top: 10, bottom: 20};

        ScrollObserver.subscribe({getBoundingClientRect: () => element}, {
            inViewPortHandler,
            outOfViewPortHandler,
            repeat: 'FIRST_IN',
        });

        ScrollObserver.evaluate();

        expect(inViewPortHandler).to.have.been.calledOnce;
        expect(outOfViewPortHandler).not.to.have.been.called;
        expect(ScrollObserver.subscribers.length).to.be.equal(0);
    });

    it('FIRST_IN / KEEP in viewport', () => {
        const inViewPortHandlerFirstIn = sinon.spy();
        const outOfViewPortHandlerFirstIn = sinon.spy();
        const elementFirstIn = {top: 10, bottom: 20};

        const inViewPortHandlerKeep = sinon.spy();
        const outOfViewPortHandlerKeep = sinon.spy();
        const elementKeep = {top: 200, bottom: 300};

        ScrollObserver.subscribe({getBoundingClientRect: () => elementFirstIn}, {
            inViewPortHandler: inViewPortHandlerFirstIn,
            outOfViewPortHandler: outOfViewPortHandlerFirstIn,
            repeat: 'FIRST_IN',
        });

        ScrollObserver.subscribe({getBoundingClientRect: () => elementKeep}, {
            inViewPortHandler: inViewPortHandlerKeep,
            outOfViewPortHandler: outOfViewPortHandlerKeep,
            repeat: 'KEEP',
        });

        ScrollObserver.evaluate();

        expect(inViewPortHandlerFirstIn).to.have.been.calledOnce;
        expect(outOfViewPortHandlerFirstIn).not.to.have.been.called;
        expect(inViewPortHandlerKeep).to.have.been.calledOnce;
        expect(outOfViewPortHandlerKeep).not.to.have.been.called;
        expect(ScrollObserver.subscribers.length).to.be.equal(1);
    });
});
