const assert = require('assert');     //asert lib
const request = require('supertest'); //http assertion lib
const index = require('../index');    //index js

//first testcase
describe('Check if api url is reachable', () => {
    it('should return 200 (Status OK)', async () => {
        await request(index.app).get('/api/notes').expect(200);
    });
});

//second testcase
describe('Check if notes are returned', () => {
    it('count should be 4', async () => {
        var notes = await(await request(index.app).get('/api/notes')).body;

        assert.equal(Object.keys(notes).length, 3);
    });
});

//third testcase
describe('Check if note with id 1 is retured', () => {
    it('id should be 1', async () => {
        var note = await(await request(index.app).get('/api/notes/1')).body;
        assert.equal(note['id'], 1);
    });
});

//fourth testcase
describe('Check if note have all properties', () => {
    it('id should have id, content, date and important', async () => {
        var notes = await(await request(index.app).get('/api/notes')).body;

        for(note in notes)
        {
            assert.equal(notes[note].hasOwnProperty('id'), true);
            assert.equal(notes[note].hasOwnProperty('content'), true);
            assert.equal(notes[note].hasOwnProperty('date'), true);
            assert.equal(notes[note].hasOwnProperty('important'), true);
        }
    });
});

//stop http server
index.httpserver.close();
    