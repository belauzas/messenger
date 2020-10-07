const http = require("http");
const app = require("express")();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(9091, () => {
    console.log('Listening... on 9091');
})