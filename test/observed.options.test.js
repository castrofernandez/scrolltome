'use strict';

import Observed from '../src/observed';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('observed options', () => {
    beforeEach(() => sinon.stub(console, 'error'));

    afterEach(() => sinon.restore());

    it('empty', () => {
        new Observed();
        expect(console.error).not.to.have.been.called;
    });

    it('invalid options', () => {
        new Observed({}, {invalid: true});
        expect(console.error).to.be.calledOnceWith('[scrolltome] The option "invalid" is not valid.');
    });

    it('invalid type', () => {
        new Observed({}, {inViewPortHandler: {}});
        expect(console.error)
            .to.be
            .calledOnceWith('[scrolltome] The option "inViewPortHandler" is expected to be "function" but received as "object".');
    });

    it('invalid repeat', () => {
        new Observed({}, {repeat: 'INVALID'});
        expect(console.error)
            .to.be
            .calledOnceWith('[scrolltome] option "INVALID" is not valid. "repeat" options are: FIRST_IN, FIRST_OUT, FIRST_IN_AND_OUT, KEEP.');
    });

    it('valid repeat', () => {
        new Observed({}, {repeat: 'KEEP'});
        expect(console.error).not.to.have.been.called;
    });
});
