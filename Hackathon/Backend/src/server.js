const path = require("path");
require('dotenv').config();
const express = require('express');
const app = express()
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

app.use(cors());

app.use(express.json())
app.use(express.static(
    path.join(__dirname, "../../Frontend")
));

connectDB();

app.use('/api/', userRoutes);

app.listen(process.env.PORT,()=>{
    console.log("The server is listening at port 3000");
})