const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
const downsampleData = require('./downSampling');

const app = express();
app.use(cors());
const port = 3001;

const data = [];

    const filePath = 'Server/dataset.csv';
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data',(row) => {
            data.push({
                timestamp: new Date(row.Timestamp).getTime(),
                profit: parseFloat(row.Profit),
              });
        })
        .on('end',() => {
            //console.log(data);
            //res.json(data);
            console.log('CSV file successfully processed.');
        })
        .on('error',(error) => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        })

app.get('/',(req,res) => {
    const result = downsampleData(data,5000);
    res.json(result);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
