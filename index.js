const express = require('express');
const cors = require('cors');
const { google } = require('googleapis')
const app = express();

app.use(cors());

const items = require("./api/items");
const users = require("./api/users");
const chars = require("./api/chars");
const addUser = require("./api/addUser");

const PORT = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/chars", chars);
app.use("/api/addUser", addUser);

app.listen(PORT, () => console.log(`Server is running in port ${PORT} or 
http://localhost:5050/api/items
http://localhost:5050/api/users
http://localhost:5050/api/chars`))