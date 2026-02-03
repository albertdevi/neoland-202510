const express = require('express')

const api = express()

const jsonBodyParser = express.json()

/*
api.get('/', (req, res) => {
    res.send('Hello!')
})

api.get('/', (req, res) => {
    res.json('Hello:"world!')
}) */

const people = [
    {id: 'person-0', name: 'Yago', age:34},
    {id: 'person-1', name: 'Aitor', age:32},
    {id: 'person-2', name: 'Laia', age:31},
]

api.get('/people', (req, res) =>{

    const personId = req.query.id

   const person = people.find(person => person.id === personId)

   res.json(person)
})

api.post('/people', jsonBodyParser, (req, res) =>{
 const person = req.body

 people.push(person)

 res.send()

})

api.listen(8080, () => console.log('API listening on port 8080'))