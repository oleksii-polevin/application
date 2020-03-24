const {
    describe, it, before, after,
} = require('mocha');
const chai = require('chai');
const UserService = require('../../src/components/User/service');


const { expect } = chai;

describe('UserComponent -> service', () => {
    let id;
    let email;
    let fullName;
    before(() => {
        UserService.create({
            email: 'mochatest@gmail.com',
            fullName: 'mocha test',
        }).then((result) => {
            id = result.id;
            email = result.email;
            fullName = result.fullName;
        });
    });

    it('UserComponent -> service -> findAll', (done) => {
        UserService.findAll().then((result) => {
            expect(result).to.be.an('array');

            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> findById', (done) => {
        UserService.findById(id).then((result) => {
            expect(result).to.have.property('_id');
            expect(result).to.have.property('email');
            expect(result).to.have.property('fullName');
            expect(result.id).to.be.equal(id);

            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> findByEmail', (done) => {
        UserService.findByEmail(email).then((result) => {
            expect(result).to.have.property('_id');
            expect(result.id).to.be.equal(id);
            expect(result.email).to.be.equal('mochatest@gmail.com');

            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> updateById', (done) => {
        UserService.updateById(id, { fullName: 'mocha user' }).then((result) => {
            expect(result.nModified).to.be.equal(1);

            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> findById(negative after updating)', (done) => {
        UserService.findById(id).then((result) => {
            expect(result.fullName).to.not.be.equal(fullName);

            done();
        }).catch((error) => {
            done(error);
        });
    });

    after(() => {
        UserService.deleteById(id);
    });
});
