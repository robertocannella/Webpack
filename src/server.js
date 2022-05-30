const express = require('express')
const app = express();

app.get('/', (req, res) => {

    res.send('Some dummy text')
})
const port = 3200
app.listen(port, () => {
    console.log(`application is running on http://localhost:${port}`)
});