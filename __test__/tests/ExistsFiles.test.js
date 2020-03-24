const chai = require('chai');
const path = require('path');
const { describe, it } = require('mocha');


// expect path
chai.use(require('chai-fs'));

const { expect } = chai;

describe('EXIST FILES', () => {
    it('CodeStyle', (done) => {
        expect(path.join(__dirname, '../../.eslintrc.json')).to.be.a.path();

        done();
    });
    it('project files', (done) => {
        expect(path.join(__dirname, '../../src/components/User')).to.be.a.path();
        expect(path.join(__dirname, '../../src/components/Jwt')).to.be.a.path();

        done();
    });
});
