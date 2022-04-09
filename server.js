const express = require('express');
const connectDB=require('./config/db');

const app=express();

// connect database
connectDB();

// init middleware
app.use(express.json({extended:false})) 
// parsing the json body

app.get('/', (req, res) => res.send('API is running'));

app.use('/todos/user',require('./routes/api/user'));
app.use('/todos/auths',require('./routes/api/auths'));
app.use('/api/v1',require('./routes/api/todo'));



const port =process.env.PORT ||3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

