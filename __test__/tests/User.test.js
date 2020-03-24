const { describe, it } = require('mocha');
const request = require('supertest');
const chai = require('chai');

const server = require('../../src/server/server');

const { expect } = chai;

describe('UserComponent -> controller', () => {
    it('UserComponent -> controller -> /v1/users/', (done) => {
        request(server)
            .get('/v1/users')
            // .set('Accept', 'application/json')
            .expect('Content-Type', /html/)
            .expect(200)
            .then(({ text }) => {
                expect(text).to.be.a('string');

                done();
            })
            .catch((err) => done(err));
    });
});
