const pool = require('../utils/pool');

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
    
};
