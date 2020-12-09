const fs = require('fs');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const request = require('supertest');
const Artist = require('../lib/models/Artist');

describe('CRUD routes for Artist model', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('Returns all artists via GET', async() => {
    const artists = await Promise.all([
      {
        name: 'Lane 8',
        genre: 'deep house'
      },
      {
        name: 'Above & Beyond',
        genre: 'trance'
      },
      {
        name: 'Billie Eilish',
        genre: 'electropop'
      }
    ].map(artist => Artist.insert(artist)));

    const res = await request(app)
      .get('/api/v1/artists');
    
    expect(res.body).toEqual(expect.arrayContaining(artists));
    expect(res.body).toHaveLength(artists.length);
  });

  it('Adds an artist via POST', async() => {
    const res = await request(app)
      .post('/api/v1/artists')
      .send({
        name: 'Lane 8',
        genre: 'deep house'
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Lane 8',
      genre: 'deep house'
    });

  });

  it('Finds an artist by id via GET', async() => {
    const artist = await Artist.insert({
      name: 'Lights',
      genre: 'electropop'    
    });

    const res = await request(app)
      .get(`/api/v1/artists/${artist.id}`);

    expect(res.body).toEqual({
      id: '1',
      name: 'Lights',
      genre: 'electropop'
    });
  });

  it('Updates an artist by id via PUT', async() => {
    const artist = await Artist.insert({
      name: 'Felix Cartal',
      genre: 'house'    
    });

    const res = await request(app)
      .put(`/api/v1/artists/${artist.id}`)
      .send({
        name: 'Felix Cartal',
        genre: 'electro house'
      });

    expect(res.body).toEqual({
      id: artist.id,
      name: 'Felix Cartal',
      genre: 'electro house'
    });
  });

  it('Removes an artist by id via DELETE', async() => {
    const artist = await Artist.insert({
      name: 'Outkast',
      genre: 'hip hop'
    });

    const res = await request(app)
      .delete(`/api/v1/artists/${artist.id}`)
      .send({
        name: 'Outkast',
        genre: 'hip hop'
      });

    expect(res.body).toEqual({
      id: artist.id,
      name: 'Outkast',
      genre: 'hip hop'
    });
  });

});
