const assert = require('assert');     //asert lib
const request = require('supertest'); //http assertion lib
const index = require('../index');    //index js

//first testcase
// eslint-disable-next-line no-undef
describe('Check if api url is reachable', () => {
    // eslint-disable-next-line no-undef
    it('should return 200 (Status OK)', async () => {
        await request(index.app).get('/api/notes').expect(200);
    });
});

//second testcase
// eslint-disable-next-line no-undef
describe('Check if notes are returned', () => {
    // eslint-disable-next-line no-undef
    it('count should be 4', async () => {
        var notes = await(await request(index.app).get('/api/notes')).body;

        assert.equal(Object.keys(notes).length, 3);
    });
});

//third testcase
// eslint-disable-next-line no-undef
describe('Check if note with id 1 is retured', () => {
    // eslint-disable-next-line no-undef
    it('id should be 1', async () => {
        var note = await(await request(index.app).get('/api/notes/1')).body;
        assert.equal(note['id'], 1);
    });
});

//fourth testcase
// eslint-disable-next-line no-undef
describe('Check if note have all properties', () => {
    // eslint-disable-next-line no-undef
    it('id should have id, content, date and important', async () => {
        var notes = await(await request(index.app).get('/api/notes')).body;

        for(var note in notes)
        {
            assert.equal(Object.prototype.hasOwnProperty.call(notes[note], "id"));
            assert.equal(Object.prototype.hasOwnProperty.call(notes[note], "content"));
            assert.equal(Object.prototype.hasOwnProperty.call(notes[note], "date"));
            assert.equal(Object.prototype.hasOwnProperty.call(notes[note], "important"));
            /*assert.equal(notes[note].hasOwnProperty('id'), true);
            assert.equal(notes[note].hasOwnProperty('content'), true);
            assert.equal(notes[note].hasOwnProperty('date'), true);
            assert.equal(notes[note].hasOwnProperty('important'), true);*/
        }
    });
});

//stop http server
index.httpserver.close();
    