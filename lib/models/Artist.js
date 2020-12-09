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

    
};
