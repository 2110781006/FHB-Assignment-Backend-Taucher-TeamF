const assert = require('assert');     //asert lib
const index = require('../index');    //index js
const request = require('supertest'); //http assertion lib

describe('Simple Math Test', () => {
    it('should return 2', () => {
        request(index.app).get('/api/notes').expect(200);
        assert.equal(1 + 1, 2);
    });
});
    