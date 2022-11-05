import express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(`${__dirname}/dist`))
app.use((_req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(PORT, () => {
  console.debug(`Server running at http://localhost:${PORT}`)
})
