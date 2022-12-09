import express = require('express')
import { resolve as oldResolve } from 'path'

const resolve = oldResolve.bind(null, __dirname)

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.static(`${__dirname}/../frontend`))
app.use((_req, res) => {
  res.sendFile(resolve('../frontend/index.html'))
})

app.listen(PORT, () => {
  console.debug(`Server running at http://localhost:${PORT}`)
})
