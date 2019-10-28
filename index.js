// implement your API here
const express = require('express');
const cors = require('cors');

//const db = require( './data/');

const app = express();

app.use(cors());
app.use(express.json());

app.get('*', handleDefaultRequest);

function handleDefaultRequest(req, res) { 
    res.json('hello monde')
}
app.listen(process.env.PORT || 3300, () => {
    console.log('listening on' + (process.env.PORT || 3300));
});