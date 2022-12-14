const express = require('express');
const cors = require('cors');
const { google } = require('googleapis')
const app = express();
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors()); 
  next();
});

app.use(expressCspHeader({
  directives: {
      'default-src': [SELF],
      'report-to': 'my-report-group'
  },
  reportUri: 'https://cspreport.com/send',
  reportTo: [
      {
          group: 'my-report-group',
          max_age: 30 * 60,
          endpoints: [{ url: 'https://cspreport.com/send'}],
          include_subdomains: true
      }
  ]
}));

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