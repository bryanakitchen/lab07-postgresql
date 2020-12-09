const fs = require('fs');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const request = require('supertest');
const Album = require('../lib/models/Album');
const Artist = require('../lib/models/Artist');

describe('CRUD routes for Album model', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
    
  afterAll(() => {
    return pool.end();
  });

  it('Adds an album via POST', async() => {
    const artist = await Artist.insert({
      name: 'Outkast',
      genre: 'hip hop'
    });
    
    const res = await request(app)
      .post('/api/v1/albums')
      .send({
        title: 'ATLiens',
        year: '1996',
        artistId: artist.id
      });

    expect(res.body).toEqual({
      id: '1',
      title: 'ATLiens',
      year: '1996',
      artistId: artist.id
    });
  });

//   it('');


});
