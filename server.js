const app = require('./lib/app');
const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
