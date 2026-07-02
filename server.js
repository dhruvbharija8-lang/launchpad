const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const rootDir = path.join(__dirname);
const adminDir = path.join(rootDir, 'admin');

app.use('/admin', express.static(adminDir));
app.use('/admin/*', (req, res) => {
  res.sendFile(path.join(adminDir, 'index.html'));
});

app.use(express.static(rootDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Launchpad website running on port ${port}`);
});
