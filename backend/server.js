const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Endpoint to fetch pairs
app.get('/api/fetchPairs', (req, res) => {
  const filePath = path.resolve(__dirname, 'pairs.json');

  if (fs.existsSync(filePath)) {
    const fileData = JSON.parse(fs.readFileSync(filePath));
    res.status(200).json(fileData);
  } else {
    res.status(200).json([]);
  }
});

// Endpoint to update pairs
app.post('/api/updatePairs', (req, res) => {
  const { headValue, dinosaur, customTextInput } = req.body;
  const filePath = path.resolve(__dirname, 'pairs.json');

  let fileData = [];
  if (fs.existsSync(filePath)) {
    fileData = JSON.parse(fs.readFileSync(filePath));
  }

  const updatedPairs = fileData.filter(pair => pair.headValue !== headValue).concat([{ headValue, dinosaur, customTextInput }]);
  fs.writeFileSync(filePath, JSON.stringify(updatedPairs, null, 2));

  res.status(200).json({ message: 'Pair updated successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;