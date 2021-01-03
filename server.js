const express = require('express')

const app = express()

app.use(express.static('src'))

const port = 9000


app.listen(port, () =>  {
    console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile('src/index.html')
})

app.get('/api', (req, res) => {
    
})