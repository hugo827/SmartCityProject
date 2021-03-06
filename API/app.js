const Router = require('./route');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use(Router);

app.get('/', (req, res) => {
    res.send('Welcome !');
});

app.listen(port, () => {
    console.log(`Example app listening at http://192.168.0.18:${port}`);
});
