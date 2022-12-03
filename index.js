const express = require('express');
const { google } = require('googleapis')
const app = express();
const items = require("./api/items");

const PORT = process.env.PORT || 5050;

app.use(express.json({ extended: false }));

app.use("/api/items", items);

app.listen(PORT, () => console.log(`Server is running in port ${PORT} or http://localhost:5050/api/items`))