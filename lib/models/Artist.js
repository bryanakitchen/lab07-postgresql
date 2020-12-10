const pool = require('../utils/pool');
const Album = require('./Album');

module.exports = class Artist {
    id;
    name;
    genre;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.genre = row.genre;
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM artists');

      return rows.map(row => new Artist(row));
    }

    static async insert({ name, genre }) {
      const { rows } = await pool.query('INSERT INTO artists (name, genre) VALUES ($1, $2) RETURNING *',
        [name, genre]
      );

      return new Artist(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT 
          artists.*,
          array_to_json(array_agg(albums.*)) AS albums
        FROM 
          artists 
        JOIN albums
        ON artists.id = albums.artist_id
        WHERE artists.id=$1
        GROUP BY artists.id`,
        [id]);

      return {
        ...new Artist(rows[0]),
        albums: rows[0].albums.map(album => new Album(album))
      };
    }

    static async update(id, { name, genre }) {
      const { rows } = await pool.query(`
        UPDATE artists
            SET name=$1,
            genre=$2
        WHERE id=$3
        RETURNING *`,
      [name, genre, id]);

      return new Artist(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query('DELETE FROM artists WHERE id=$1 RETURNING *',
        [id]);

      return new Artist(rows[0]);
    }
    
};
