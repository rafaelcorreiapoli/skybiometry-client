'use strict';

var expect = require('chai').expect;
import SkyBiometryClient from '../src/index';

describe('Sky Biometry Client', function() {
    it('throws an error if instantiated without an apiKey', function() {
        expect(() => new SkyBiometryClient()).to.throw(Error);
    });
});
