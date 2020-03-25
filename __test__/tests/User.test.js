const { describe, it, before } = require('mocha');
const request = require('supertest');
const chai = require('chai');

const server = require('../../src/server/server');

const { expect } = chai;

describe('UserComponent -> controller', () => {
    let token;
    const testUser = {
        email: 'userTest@gmail.com',
        fullName: 'router test',
    };
    before(() => {
        request(server)
            .post('/v1/users')
            .send(testUser)
            .then((response) => {
                token = response.body;
            });
    });


    it('UserComponent -> controller -> /v1/users/', (done) => {
        request(server)
            .get('/v1/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /html/)
            .expect(200)
            .then(({ text }) => {
                expect(text).to.be.a('string');

                done();
            })
            .catch((err) => done(err));
    });

    it('UserComponent -> controller -> /v1/users/user (find user)', (done) => {
        request(server)
            .get('/v1/users/user')
            .set('authorization', token.accessToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                const user = body.data;
                expect(user).to.have.property('_id');
                expect(user).to.have.property('email');
                expect(user).to.have.property('fullName');
                expect(user.email).to.be.equal(testUser.email);

                done();
            });
    });

    it('UserComponent -> controller -> /v1/users/update', (done) => {
        request(server)
            .post('/v1/users/update')
            .set('authorization', token.accessToken)
            .send({ fullName: 'new user' })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body).to.have.property('nModified');
                expect(body.nModified).to.be.equal(1);

                done();
            });
    });

    it('UserComponent -> controller -> /v1/users/delete', (done) => {
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
