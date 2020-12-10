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

    static async find() {
      const { rows } = await pool.query('SELECT * FROM albums');

      return rows.map(row => new Album(row));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM albums WHERE id=$1',
        [id]);

      return new Album(rows[0]);
    }

    static async update(id, { title, year, artistId }) {
      const { rows } = await pool.query(`
        UPDATE albums
            SET title=$1,
            year=$2,
            artist_id=$3
        WHERE id=$4
        RETURNING *`,
      [title, year, artistId, id]);

      return new Album(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query('DELETE FROM albums WHERE id=$ RETURNING *',
        [id]);

      return new Album(rows[0]);
    }

};
