const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const PORT = 8085;
const DATA_FILE = 'data.csv';

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const loadCSVData = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(DATA_FILE)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};

app.get('/api/data', async (req, res) => {
    try {
        const data = await loadCSVData();
        const { page = 1, pageSize = 10 } = req.query;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const paginatedData = data.slice(startIndex, endIndex);
        res.json({ data: paginatedData, total: data.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
