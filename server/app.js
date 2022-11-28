const express = require("express");
const app = express();
var xlsx = require('node-xlsx');

app.listen(3000, () => {
    console.log('Listening on port 3000')
  })

app.get('/', (req, res) => {
    res.send("Hello from Express!")
})

app.get('/tehyrat_investimet', (req, res) => {
    var obj = xlsx.parse('../src/xls/TeHyratDheInvestimetISP.xlsx');
    console.log(obj[0].data[10], ' data data data data');
    res.send(obj);
})

