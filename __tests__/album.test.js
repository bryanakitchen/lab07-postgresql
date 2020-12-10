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

  it('Returns all albums via GET', async() => {
    const artist = await Artist.insert({
      name: 'Outkast',
      genre: 'hip hop'
    });
  
    const albums = await Promise.all([
      {
        title: 'ATLiens',
        year: '1996',
        artistId: artist.id
      },
      {
        title: 'Aquemini',
        year: '1998',
        artistId: artist.id
      },
      {
        title: 'Stankonia',
        year: '2000',
        artistId: artist.id
      },
    ].map(album => Album.insert(album)));

    const res = await request(app)
      .get('/api/v1/albums');

    expect(res.body).toEqual(expect.arrayContaining(albums));
    expect(res.body).toHaveLength(albums.length);
  });

  it('Finds an album by id via GET', async() => {
    const artist = await Artist.insert({
      name: 'Outkast',
      genre: 'hip hop'
    });

    const album = await Album.insert({
      title: 'ATLiens',
      year: '1996',
      artistId: artist.id
    });

    const res = await request(app)
      .get(`/api/v1/albums/${album.id}`);
          
    expect(res.body).toEqual({
      id: '1',
      title: 'ATLiens',
      year: '1996',
      artistId: artist.id
    });
  });

  it('Updates an album by id via PUT', async() => {
    const artist = await Artist.insert({
      name: 'Outkast',
      genre: 'hip hop'
    });
      
    const album = await Album.insert({
      title: 'ATLiens',
      year: '1997',
      artistId: artist.id
    });
      
    const res = await request(app)
      .put(`/api/v1/albums/${album.id}`)
      .send({
        title: 'ATLiens',
        year: '1996',
        artistId: artist.id
      });

    expect(res.body).toEqual({
      id: album.id,
      title: 'ATLiens',
      year: '1996',
      artistId: artist.id
    });
  });
  
  it('Deletes an album by id via DELETE', async() => {
    const artist = await Artist.insert({
      name: 'Outkast',
      genre: 'hip hop'
    });
      
    const album = await Album.insert({
      title: 'ATLiens',
      year: '1997',
      artistId: artist.id
    });
      
    const res = await request(app)
      .put(`/api/v1/albums/${album.id}`)
      .send({
        title: 'ATLiens',
        year: '1997',
        artistId: artist.id
      });

    expect(res.body).toEqual({
      id: album.id,
      title: 'ATLiens',
      year: '1997',
      artistId: artist.id
    });
  });

});
