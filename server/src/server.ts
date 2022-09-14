import express from 'express'

const app = express()

app.get('/', (request, response) => {
    response.send({
        "test": "test"
    })
})

app.listen(3333)