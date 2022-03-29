const express = require('express');
const connectDB=require('./config/db');

const app=express();

// connect database
connectDB();

// init middleware
app.use(express.json({extended:false})) 
// parsing the json body

app.get('/', (req, res) => res.send('API is running'));

app.use('/todos/user',require('./routes/todos/user'));
app.use('/todos/auths',require('./routes/todos/auths'));
app.use('/todos/todo',require('./routes/todos/todo'));



const port =process.env.PORT ||3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

