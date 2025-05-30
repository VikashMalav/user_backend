const express = require('express');
const dotenv = require('dotenv');
const apiroutes = require('./routes/userRoute');
const cors = require('cors')
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;


app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`[${time}] ${req.method} ${req.url}`)
    next();
})

app.use('/api', apiroutes);

async function run() {
    try {

       mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

        app.listen(port, () => {
            console.log(`server runnning on ${port}....`)
        })
    }
    catch (err) {
        console.error("Connection error:", err);
    }
}
run();



