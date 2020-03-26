const {
    describe, it, before,
} = require('mocha');
const chai = require('chai');
const UserService = require('../../src/components/User/service');


const { expect } = chai;

describe('UserComponent -> service', () => {
    let id;
    let email;
    let fullName;
    const testUser = {
        email: 'mochatest@gmail.com',
        fullName: 'mocha test',
    };

    before(() => {
        UserService.create(testUser).then((result) => {
            id = result.id;
            email = result.email;
            fullName = result.fullName;
        });
    });

    it('UserComponent -> service -> create(duplicate -> get MongoError)', () => {
        UserService.create(testUser).then().catch((error) => {
            expect(error.name).to.be.equal('MongoError');
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

    it('UserComponent -> service -> findById(test new fullName)', (done) => {
        UserService.findById(id).then((result) => {
            expect(result.fullName).to.not.be.equal(fullName);
            expect(result.fullName).to.be.equal('mocha user');

            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> deleteById', async () => {
        const result = await UserService.deleteById(id);
        expect(result.deletedCount).to.be.equal(1);
    });
});
