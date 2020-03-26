const {
    describe, it, before, beforeEach,
} = require('mocha');
const request = require('supertest');
const chai = require('chai');

const server = require('../../src/server/server');

const { expect } = chai;

describe('JwtComponent', () => {
    let token;
    const testUser = {
        email: 'JwtTest@gmail.com',
        fullName: 'jwt test',
    };

    before(() => {
        request(server)
            .post('/v1/users')
            .send(testUser)
            .then((response) => {
                token = response.body;
            });
    });

    // eslint-disable-next-line func-names
    beforeEach((done) => {
        setTimeout(done, 1200);
    });

    it('JwtComponent -> controller -> /v1/jwt/token (get new refresh token)', (done) => {
        request(server)
            .get('/v1/jwt/token')
            .set('authorization', token.refreshToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body).to.have.property('refreshToken');

                done();
            });
    });

    it('JwtComponent -> controller -> /v1/jwt/logout (delete refresh token)', (done) => {
        request(server)
            .get('/v1/jwt/logout')
            .set('authorization', token.accessToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body).to.have.property('nModified');
                expect(body.nModified).to.be.equal(1);

                done();
            });
    });


    it('Delete test user', (done) => {
        request(server)
            .post('/v1/users/delete')
            .set('authorization', token.accessToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body.deletedCount).to.be.equal(1);

                done();
            });
    });
});
