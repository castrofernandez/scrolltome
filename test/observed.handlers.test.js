'use strict';

import Observed from '../src/observed';
import {isInViewPort} from '../src/utils';

import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const DIRECTION = 'down';

const VIEWPORT_HEIGHT = 800;
const window = {height: undefined};

const mockElement = (element = {}) => ({
    getBoundingClientRect: () => element,
});

const mockInViewPort = () => mockElement({top: 10, bottom: 20});

const mockOutViewPort = () => mockElement({top: -100, bottom: -80});

const mockAndEvaluate = (mock, repeat) => {
    const inHander = sinon.spy();
    const outHander = sinon.spy();

    const observed = new Observed(mock, {
        repeat,
        inViewPortHandler: inHander,
        outOfViewPortHandler: outHander,
    });

    observed.evaluate(DIRECTION);

    return {
        inHander,
        outHander,
        finished: observed.finished,
        observed,
    };
};

describe('observed handlers', () => {
    beforeEach(() => {
        beforeEach(() => sinon.stub(window, 'height').returns(VIEWPORT_HEIGHT));
    });

    afterEach(() => sinon.restore());

    it('FIRST_IN in viewport', () => {
        const {inHander, outHander, finished} = mockAndEvaluate(mockInViewPort(), 'FIRST_IN');

        expect(inHander).to.have.been.calledOnce;
        expect(outHander).to.not.have.been.called;
        expect(finished).to.be.true;
    });

    it('FIRST_IN out of viewport', () => {
        const {inHander, outHander, finished} = mockAndEvaluate(mockOutViewPort(), 'FIRST_IN');

        expect(inHander).to.not.have.been.called;
        expect(outHander).to.have.been.calledOnce;
        expect(finished).to.be.false;
    });

    it('FIRST_IN out of viewport / in viewport', () => {
        let element = {top: -100, bottom: -80};
        const {inHander, outHander, observed} = mockAndEvaluate({
            getBoundingClientRect: () => element,
        }, 'FIRST_IN');

        element = {top: 10, bottom: 20};
        observed.evaluate(DIRECTION);

        expect(inHander).to.have.been.calledOnce;
        expect(outHander).to.have.been.calledOnce;
        expect(observed.finished).to.be.true;
    });

    it('FIRST_OUT in viewport', () => {
        const {inHander, outHander, finished} = mockAndEvaluate(mockInViewPort(), 'FIRST_OUT');

        expect(inHander).to.have.been.calledOnce;
        expect(outHander).to.not.have.been.called;
        expect(finished).to.be.false;
    });

    it('FIRST_OUT in viewport / out of viewport', () => {
        let element = {top: 10, bottom: 20};
        const {inHander, outHander, observed} = mockAndEvaluate({
            getBoundingClientRect: () => element,
        }, 'FIRST_OUT');

        element = {top: -100, bottom: -80};
        observed.evaluate(DIRECTION);

        expect(inHander).to.have.been.calledOnce;
        expect(outHander).to.have.been.calledOnce;
        expect(observed.finished).to.be.true;
    });

    it('FIRST_OUT out of viewport', () => {
        const {inHander, outHander, finished} = mockAndEvaluate(mockOutViewPort(), 'FIRST_OUT');

        expect(inHander).to.not.have.been.called;
        expect(outHander).to.have.been.calledOnce;
        expect(finished).to.be.true;
    });

    it('FIRST_IN_AND_OUT in viewport / out of viewport', () => {
        let element = {top: 10, bottom: 20};
        const {inHander, outHander, observed} = mockAndEvaluate({
            getBoundingClientRect: () => element,
        }, 'FIRST_IN_AND_OUT');

        element = {top: -100, bottom: -80};
        observed.evaluate(DIRECTION);

        expect(inHander).to.have.been.calledOnce;
        expect(outHander).to.have.been.calledOnce;
        expect(observed.finished).to.be.true;
    });

    it('KEEP in viewport / out of viewport', () => {
        let element = {top: 10, bottom: 20};
        const {inHander, outHander, observed} = mockAndEvaluate({
            getBoundingClientRect: () => element,
        }, 'KEEP');

        element = {top: -100, bottom: -80};
        observed.evaluate(DIRECTION);

        expect(inHander).to.have.been.calledOnce;
        expect(outHander).to.have.been.calledOnce;
        expect(observed.finished).to.be.false;
    });
});
