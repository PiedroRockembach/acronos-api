const express = require('express');
const { google } = require('googleapis')
const app = express();


app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  try {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = '1EUpzlHqk4IFaoC0bDMWtTw26wuf14YBQzXR6nyz0QtQ';
  
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "itens!A:F",
    })
    
    const json = getRows.data.values.map((item, index, original) => {
      if (index !== 0) {
        const obj = {};
        item.forEach(( status, i )=> obj[original[0][i]] = item[i])
        return obj;
      }
    })
  
    const result = json.filter((item) => item);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
  
 
})


const PORT = process.env.PORT || 5050;

app.use(express.json({ extended: false }));

// app.use("/");

app.listen(PORT, () => console.log(`Server is running in port ${PORT} or http://localhost:5050/api/items`))