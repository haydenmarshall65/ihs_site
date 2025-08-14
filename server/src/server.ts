import express from "express"

const api = express();

const PORT = process.env.PORT || 3001;

api.get('/', (req, res) => {
  res.send('Hello World!');
});

api.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});