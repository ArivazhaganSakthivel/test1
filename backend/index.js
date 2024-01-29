const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Arivazhagan:Arivu007@arivazhagan.hjobthp.mongodb.net/?retryWrites=true&w=majority');

app.get('/', (req, res)=>{
  res.send('Server is runing on!!!')
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
