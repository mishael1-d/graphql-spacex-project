const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.use(cors)

app.listen(4000, ()=> {
    console.log('Started server on port 4000');
})