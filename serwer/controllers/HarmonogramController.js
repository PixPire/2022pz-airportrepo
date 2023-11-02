const pool = require("../config/database");
const bodyParser = require('body-parser');

module.exports = {
  getHarmonogramId: (req, res) => {
    pool.query(
      `SELECT * FROM harmonogram_pilota WHERE id_pilota = ?`,
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log('getHarmonogramId failed');
          res.send(error);
        } else if (results.length === 0) {
          console.log(`No results found for id_pilota: ${req.params.id}`);
          res.status(404).send('Not found');
        } else {
          console.log('getHarmonogramId ok');
          res.json(results);
        }
      }
    ); 
  }
}