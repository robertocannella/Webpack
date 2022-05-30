const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs');

app.use('/static', express.static(path.resolve(__dirname, '../dist')));
app.get('/hello-world', (req, res) => {

    const filePath = path.resolve(__dirname, '../dist/hello-world.html');
    const content = fs.readFileSync(filePath, 'utf-8');

    res.status(200).send(content)
})

app.get('/kiwi', (req, res) => {

    const filePath = path.resolve(__dirname, '../dist/kiwi.html');
    const content = fs.readFileSync(filePath, 'utf-8');

    res.status(200).send(content)
})
const port = 3200
app.listen(port, () => {
    console.log(`application is running on http://localhost:${port}`)
});