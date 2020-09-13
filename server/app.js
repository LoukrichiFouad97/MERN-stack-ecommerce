const express = require("express");
const app = express()

app.get('/' , (req, res) => {
  console.log('res');
})


app.listen(5000, () => console.log("server started"))
