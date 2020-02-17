'use strict';

import {isInViewPort} from '../src/utils';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const VIEWPORT_HEIGHT = 800;
const window = {height: undefined};

const mockElement = (element = {}) => ({
    getBoundingClientRect: () => element,
});

describe('utils', () => {
    beforeEach(() => sinon.stub(window, 'height').returns(VIEWPORT_HEIGHT));

    afterEach(() => sinon.restore());

    it('isInViewPort: before viewport', () => {
        expect(isInViewPort(mockElement({
            top: -10,
            bottom: -5,
        }))).to.be.false;
    });

    it('isInViewPort: bottom in viewport', () => {
        expect(isInViewPort(mockElement({
            top: -10,
            bottom: 10,
        }))).to.be.true;
    });

    it('isInViewPort: top and bottom in viewport', () => {
        expect(isInViewPort(mockElement({
            top: 1,
            bottom: 10,
        }))).to.be.true;
    });

    it('isInViewPort: top before viewport and bottom after viewport', () => {
        expect(isInViewPort(mockElement({
            top: -10,
            bottom: 900,
        }))).to.be.true;
    });

    it('isInViewPort: top in viewport', () => {
        expect(isInViewPort(mockElement({
            top: 700,
            bottom: 900,
        }))).to.be.true;
    });

    it('isInViewPort: after viewport', () => {
        expect(isInViewPort(mockElement({
            top: 900,
            bottom: 920,
        }))).to.be.false;
    });
});
