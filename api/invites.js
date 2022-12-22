const express = require('express');
const { google } = require('googleapis')
const router = express.Router();

router.get('/', (req, res) => res.send({status: 'ok'}) )

router.post("/", async (req, res) => {
  const { invite} = req.body;
  const auth = new google.auth.GoogleAuth({
    credentials: {
      "type": "service_account",
      "project_id": "acronos-database",
      "private_key_id": "6af381bcc148f4b5d5cd32b8c5b1c2cd4970c8c0",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDIP+LiZmaKApWv\n7gFIM27CvceFjnhjbBIF2FYkwINRKc/hW1nD+nvQ/4faJ7HxpUfR/wvtQktx2inc\nryQDDliaMU8WxLhFUJ/LKWhNlWj7kwmP0QaFe0ojqgG4/MAkAvgucmTeXAz4M0Ji\nNH5kvOrqUfHnVDhLYCcpp1MfxxBM5PpQZ0tLDrECmE/tYRB8H0RUX0Xv98ODlOJW\nj8ZWAG81ecRv13Zw0z5bi3ncCtv816qE9FvXnRHC2nFI1SaavEK9XFRwBdDNbNrO\n3BpV879pxnF75jovOOd02tVOTrTmKH37j6CcD2JMeyo5HPn/FU1/xQyD7TH39ubE\nDfOtENB3AgMBAAECggEAJzbrlW58MhajfZpcQelgjV5gzjTCOqYVOXPOGtBgZuqL\nPRSIlapdyOXhksUnQa0eTW9mxIWxBJC2lfLuWHLcwwVY+Zp4g4pwYHaxaFAUCQAY\nZUOHxWgJcsZ+I93LOsIiG+Zm/myEVa6kF1s0TUH5tv1pI+YISCqCQNP1oUl4VbZA\n6NM0zezW9WOvrQ1RV2Q6ZnrkAsv431ZPR0GbJkTYm0jsW+n30SLR0iVhJ5i3JGBu\niUx3jHm5hAu4i6gVvso99qE5y6WFn2Q3xfSrkL07+Aebv21E6G4mxMeroOxue8WS\nkNL7Om1JKd3uUnIm+V2WP2fKJrO77IBrxTtP4itBAQKBgQDjXXWcy81re2uOWiRA\neHOTA2hibA537nXl77PcMlbbRlOki7jscRGwFA19B2qXWyB6rJGsIX/jZKJtBAep\nLAYb1EI2wggbadbh/QMxQYNPItmit02QLfZ4sgD37h/EI/opPBmcZDADsTD+A5G/\nrgeLPh1ttRNH4AtEdqPZmCwvNwKBgQDheDAVUkL4Kz8BoVcYScXoPHkX0pUqUxzb\n+gKu+pyOETAa7XKuUgt12EiVXaolpvM/xLKd+sk+h5qproyYJN4wyXE8a6kwC4DD\n1kRGXSZryKEDcoOX5iZ7oNpBawiIymXljik4LA28DimnwOJeMONRvEnMZacoH7uY\nnXXO+LSIwQKBgHp3CLaf/9F49QIEA6rGNlplZ4A7+78VrmNfrV1Zr/cD9mGW8NBK\nRuC0rF8/82X7K49oDD7O/Hea6PIXTZkNoWyz88ZS1NMPOzMWePW69+NUPi2q1hhm\n6W8xUdw5YtrfFgvH13Opc0NJ2b24ZnT8ZAvYNTm2YuBACVGjJbY6hPIZAoGAUkd1\n5JH8dmvxtjqWefqSCknnNtZWMPfblDsMN6ak8wM6ttjn/M1b+UlQU5G2wb7HDgJN\n3HDkd7ksq7dS/0KVAuDAPfhb6XiJKO5MRBFCMBsrBwMHGquWZ48vlqfkmWajAL58\nNE9/Q503fkxZT14v1mgL1ldSRMYvw2XS1BDWcQECgYBBCxL/iuiVOp19okwgLeRI\nvYvBvjBBSaBjkEA8Ro/EHtNI/rY1zREY0crQMddN45O9J1cRFGwt6udnXDEDr/VC\nlHPy12fElQtJVR39TH7MJQEsYLLO+r3DYa4/irZPtxM61Ub7V+D8p30wbO0RsjfD\nz2SVEqmU+ZmUixRtcdriRg==\n-----END PRIVATE KEY-----\n",
      "client_email": "acronosdatabase@acronos-database.iam.gserviceaccount.com",
      "client_id": "104398321026375454365",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/acronosdatabase%40acronos-database.iam.gserviceaccount.com"
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  try {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = '1EUpzlHqk4IFaoC0bDMWtTw26wuf14YBQzXR6nyz0QtQ';
    // console.log(invite);
    const users = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'usuarios',
    })

    const json = users.data.values.map((item, index, original) => {
      if (index !== 0) {
        const obj = {};
        item.forEach(( status, i )=> obj[original[0][i]] = item[i])
        return obj;
      }
    })
    
    const jsonInvite = JSON.parse(invite);
    let id;
    let cur;
    json.forEach((user, index) => {
      if (user && user.nome === jsonInvite.destinatario) {
        id = index + 1;
        cur = user;
        return;
      }

    })
    googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `usuarios!A${id}:E${id}`,
      valueInputOption: "USER_ENTERED",
      resource: {
        range: `usuarios!A${id}:E${id}`,
        values: [
          [cur.nome, cur.login, cur.senha, cur.id, cur.email ? [cur.email ,JSON.stringify( jsonInvite)] :  JSON.stringify([jsonInvite])]
        ]
      }
      
      
    });
    res.send({ status: 'OK!'})
  } catch (error) {
    res.send(error);
  }
  

})

module.exports = router;
