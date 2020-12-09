const pool = require('../utils/pool');

module.exports = class Album {
    id;
    title;
    year;
    artistId;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.year = String(row.year);
      this.artistId = row.artist_id;
    }

    static async insert({ title, year, artistId }) {
      const { rows } = await pool.query('INSERT INTO albums (title, year, artist_id) VALUES ($1, $2, $3) RETURNING *',
        [title, year, artistId]);

      return new Album(rows[0]);
    }

};
