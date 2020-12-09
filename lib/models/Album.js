const pool = require('../utils/pool');

module.exports = class Album {
    id;
    title;
    year;
    artist_id;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.year = row.year;
      this.artistId = row.artist_id;
    }


};
